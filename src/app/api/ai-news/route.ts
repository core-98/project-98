import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import { AINewsCache } from "@/lib/supabase";

// Create a Supabase client with server-only credentials
const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// Initialize the OpenAI client
// Note: This requires OPENAI_API_KEY to be set in your environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Since we have a cron job refreshing the cache daily at 7 AM,
// we'll always use the cached data if it exists

export async function GET() {
    try {
        // Check if we have a valid cache in Supabase
        const { data: cacheData, error: cacheError } = await supabase
            .from("ai_news_cache")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(1);

        // If we have cached data, return it (our cron job refreshes it daily)
        if (cacheData && cacheData.length > 0 && !cacheError) {
            const latestCache = cacheData[0] as AINewsCache;

            console.log("Using cached AI news data");
            return NextResponse.json({
                report: latestCache.report,
                searchResults: latestCache.search_results,
                cached: true,
                lastUpdated: latestCache.last_updated,
            });
        }

        // If no valid cache exists, generate a new report
        console.log("Generating new AI news data");

        // Step 1: Use GPT-4o to search for the latest AI news
        const searchResponse = await openai.responses.create({
            model: "gpt-4o",
            tools: [{ type: "web_search_preview" }],
            input: "Search for all the latest news on Artificial Intelligence from the previous day.",
        });

        // Extract search results from the response
        const searchResults = JSON.stringify(searchResponse);

        // Step 2: Use o3-mini to generate a report based on the search results
        const reportResponse = await openai.chat.completions.create({
            model: "o3-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a professional AI news reporter. Create a well-structured detailed markdown report about the latest AI news.",
                },
                {
                    role: "user",
                    content: `Based on the following search results, create a thorough markdown report about the latest AI news. Include sections for different categories of news, and format it professionally with headings, bullet points, and links where appropriate.\n\nSearch results: ${searchResults}`,
                },
            ],
        });

        // Extract the report content
        const report = reportResponse.choices[0].message.content || "";

        // Store the new data in Supabase cache
        const now = new Date().toISOString();
        const { error: insertError } = await supabase
            .from("ai_news_cache")
            .insert({
                report: report,
                search_results: searchResults,
                last_updated: now,
            });

        if (insertError) {
            console.error("Error caching AI news data:", insertError);
        }

        // Return the report as JSON
        return NextResponse.json({
            report,
            searchResults,
            cached: false,
            lastUpdated: now,
        });
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";
        console.error("Error generating AI news report:", error);

        return NextResponse.json(
            { error: errorMessage || "Failed to generate AI news report" },
            { status: 500 }
        );
    }
}
