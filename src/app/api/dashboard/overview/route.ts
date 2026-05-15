import Insight from "@/models/Insight";
import { connectDB } from "@/lib/mongodb";
import { buildMongoFilters } from "@/lib/api/buildMongoFilters";
import {
    getAverageMetric,
    getCountByField,
    getDistinctCount,
} from "@/lib/api/aggregationHelpers";
import { errorResponse, successResponse } from "@/lib/api/response";

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const filters = buildMongoFilters(searchParams);

        const [
            totalRecords,
            avgIntensity,
            avgRelevance,
            avgLikelihood,
            totalTopics,
            totalCountries,
            topTopics,
            recordsByRegion,
        ] = await Promise.all([
            Insight.countDocuments(filters),
            getAverageMetric("intensity", filters),
            getAverageMetric("relevance", filters),
            getAverageMetric("likelihood", filters),
            getDistinctCount("topic", filters),
            getDistinctCount("country", filters),
            getCountByField("topic", filters, 5),
            getCountByField("region", filters, 5),
        ]);

        return successResponse({
            totalRecords,
            avgIntensity,
            avgRelevance,
            avgLikelihood,
            totalTopics,
            totalCountries,
            topTopics,
            recordsByRegion,
        });
    } catch (error) {
        console.error("OVERVIEW_API_ERROR", error);
        return errorResponse("Failed to fetch overview data");
    }
}