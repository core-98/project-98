// Server component - no client-side imports needed
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { createClient } from "@supabase/supabase-js";
import { AINewsCache } from "@/lib/supabase";
import { MarkdownRenderer } from "@/components/markdown-renderer";

// Create a Supabase client with server-only credentials
const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// Add React Server Component directive
export const dynamic = "force-dynamic";

// Server-side data fetching function
async function getAINews() {
    try {
        // Get the latest cached news from Supabase
        const { data: cacheData, error: cacheError } = await supabase
            .from("ai_news_cache")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(1);

        if (cacheError) {
            throw new Error(`Supabase error: ${cacheError.message}`);
        }

        if (cacheData && cacheData.length > 0) {
            const latestCache = cacheData[0] as AINewsCache;
            return {
                report: latestCache.report,
                isCached: true,
                error: null,
            };
        } else {
            return {
                report: "",
                isCached: false,
                error: "No cached news found",
            };
        }
    } catch (err: unknown) {
        console.error("Failed to fetch AI news:", err);
        const errorMessage =
            err instanceof Error ? err.message : "Unknown error occurred";
        return {
            report: "",
            isCached: false,
            error: errorMessage,
        };
    }
}

export default async function AINewsPage() {
    // Fetch data on the server
    const { report, isCached, error } = await getAINews();

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start py-8 px-4">
            <div className="w-full max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-2">
                    AI News Report
                </h1>
                <p className="text-center text-gray-400 mb-8">
                    {format(new Date(), "MMMM d, yyyy")}
                </p>

                {error ? (
                    <div className="text-red-500 p-4 rounded bg-red-950 bg-opacity-30 text-center">
                        <p>Error: {error}</p>
                        <p className="mt-2 text-sm text-gray-400">
                            Note: This feature requires an OpenAI API key to be
                            set in your environment variables.
                        </p>
                    </div>
                ) : report ? (
                    <div className="space-y-6 w-full">
                        {isCached && (
                            <div className="flex justify-end mb-4">
                                <Badge
                                    variant="outline"
                                    className="bg-gray-900 text-gray-400 border-gray-800 hover:bg-gray-800 text-xs opacity-70"
                                >
                                    Cached
                                </Badge>
                            </div>
                        )}
                        <div className="prose prose-invert max-w-none">
                            <MarkdownRenderer content={report} />
                        </div>
                        <div className="text-center mt-8">
                            <p className="text-xs text-gray-500">
                                Powered by OpenAI
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-400">
                        Loading AI news report...
                    </p>
                )}
            </div>
        </div>
    );
}

// Helper functions have been removed as we're now using react-markdown
