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
            insightsByRegion,
            topCountries,
            avgIntensityByRegion,
        ] = await Promise.all([
            getCountByField("region", filters, 10),
            getCountByField("country", filters, 10),
            getAverageByField("region", "intensity", "avgIntensity", filters, 10),
        ]);

        return successResponse({
            insightsByRegion,
            topCountries,
            avgIntensityByRegion,
        });
    } catch (error) {
        console.error("REGIONS_API_ERROR", error);
        return errorResponse("Failed to fetch regional analytics");
    }
}