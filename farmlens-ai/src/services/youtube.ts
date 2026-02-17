
import { DiagnosisResult } from "@/components/screens/ResultsCard";

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Utility function to add delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const searchYouTubeVideo = async (
    query: string,
    retryCount: number = 0
): Promise<string | null> => {
    if (!YOUTUBE_API_KEY) {
        console.warn("YouTube API Key is missing. Please add VITE_YOUTUBE_API_KEY to your .env file.");
        return null;
    }

    if (!query || query.trim() === '') {
        console.warn("Empty search query provided to YouTube search");
        return null;
    }

    try {
        // Clean and encode the query
        const cleanedQuery = query.trim();
        const encodedQuery = encodeURIComponent(cleanedQuery);

        console.log(`[YouTube Search] Searching for: "${cleanedQuery}" (Attempt ${retryCount + 1}/${MAX_RETRIES})`);

        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedQuery}&key=${YOUTUBE_API_KEY}&type=video&maxResults=5&videoEmbeddable=true&videoSyndicated=true&order=relevance`,
            {
                signal: AbortSignal.timeout(10000) // 10 second timeout
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[YouTube API Error] Status: ${response.status} - ${response.statusText}`);
            console.error(`[YouTube API Error] Response: ${errorText}`);

            // Handle quota exceeded error
            if (response.status === 403) {
                console.error("[YouTube API] Quota exceeded or API key invalid");
                return null;
            }

            // Retry on server errors
            if (response.status >= 500 && retryCount < MAX_RETRIES) {
                console.log(`[YouTube Search] Retrying after ${RETRY_DELAY}ms...`);
                await delay(RETRY_DELAY);
                return searchYouTubeVideo(query, retryCount + 1);
            }

            return null;
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            console.warn(`[YouTube Search] No results found for: "${cleanedQuery}"`);
            return null;
        }

        // Find the first valid video from results
        for (const item of data.items) {
            if (item.id && item.id.videoId) {
                const videoId = item.id.videoId;
                const videoUrl = `https://www.youtube.com/embed/${videoId}`;

                console.log(`[YouTube Search] Found video: ${item.snippet.title}`);
                console.log(`[YouTube Search] Video ID: ${videoId}`);

                return videoUrl;
            }
        }

        console.warn("[YouTube Search] No valid video IDs found in results");
        return null;

    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                console.error("[YouTube Search] Request timed out");
            } else {
                console.error("[YouTube Search] Error:", error.message);
            }
        } else {
            console.error("[YouTube Search] Unknown error:", error);
        }

        // Retry on network errors
        if (retryCount < MAX_RETRIES) {
            console.log(`[YouTube Search] Retrying after ${RETRY_DELAY}ms...`);
            await delay(RETRY_DELAY);
            return searchYouTubeVideo(query, retryCount + 1);
        }

        return null;
    }
};

// Alternative search with multiple query variations
export const searchYouTubeVideoWithFallback = async (
    primaryQuery: string,
    fallbackQueries: string[] = []
): Promise<string | null> => {
    // Try primary query first
    const primaryResult = await searchYouTubeVideo(primaryQuery);
    if (primaryResult) {
        return primaryResult;
    }

    // Try fallback queries
    for (const fallbackQuery of fallbackQueries) {
        console.log(`[YouTube Search] Trying fallback query: "${fallbackQuery}"`);
        const result = await searchYouTubeVideo(fallbackQuery);
        if (result) {
            return result;
        }
    }

    console.warn("[YouTube Search] All search attempts failed");
    return null;
};
