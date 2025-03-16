import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

// Create a Supabase client with server-only credentials
const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// Initialize the OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Define the cron schedule (7 AM daily)
export const config = {
    runtime: "edge",
    regions: ["iad1"], // Choose the region closest to you
    cron: "0 7 * * *", // Run at 7 AM daily
};

export async function GET() {
    try {
        console.log(
            "Running daily AI news cron job at:",
            new Date().toISOString()
        );

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
            return NextResponse.json(
                { success: false, error: insertError.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Daily AI news report generated and cached successfully",
            timestamp: now,
        });
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";
        console.error("Error in daily AI news cron job:", error);

        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}
