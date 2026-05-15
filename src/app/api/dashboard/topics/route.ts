import { connectDB } from "@/lib/mongodb";
import { buildMongoFilters } from "@/lib/api/buildMongoFilters";
import {
    getAverageByField,
    getCountByField,
} from "@/lib/api/aggregationHelpers";
import { errorResponse, successResponse } from "@/lib/api/response";

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const filters = buildMongoFilters(searchParams);

        const [
            mostDiscussedTopics,
            avgIntensityByTopic,
            avgRelevanceByTopic,
        ] = await Promise.all([
            getCountByField("topic", filters, 10),
            getAverageByField("topic", "intensity", "avgIntensity", filters, 10),
            getAverageByField("topic", "relevance", "avgRelevance", filters, 10),
        ]);

        return successResponse({
            mostDiscussedTopics,
            avgIntensityByTopic,
            avgRelevanceByTopic,
        });
    } catch (error) {
        console.error("TOPICS_API_ERROR", error);
        return errorResponse("Failed to fetch topic analytics");
    }
}