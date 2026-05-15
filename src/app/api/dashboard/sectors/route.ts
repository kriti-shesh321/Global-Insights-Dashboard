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
            sectorDistribution,
            pestleDistribution,
            avgIntensityBySector,
        ] = await Promise.all([
            getCountByField("sector", filters, 10),
            getCountByField("pestle", filters, 10),
            getAverageByField("sector", "intensity", "avgIntensity", filters, 10),
        ]);

        return successResponse({
            sectorDistribution,
            pestleDistribution,
            avgIntensityBySector,
        });
    } catch (error) {
        console.error("SECTORS_API_ERROR", error);
        return errorResponse("Failed to fetch sector analytics");
    }
}