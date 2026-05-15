import { connectDB } from "@/lib/mongodb";
import { getDistinctValues } from "@/lib/api/aggregationHelpers";
import { errorResponse, successResponse } from "@/lib/api/response";

export async function GET() {
    try {
        await connectDB();

        const [
            topics,
            sectors,
            regions,
            pestles,
            sources,
            countries,
            endYears,
        ] = await Promise.all([
            getDistinctValues("topic"),
            getDistinctValues("sector"),
            getDistinctValues("region"),
            getDistinctValues("pestle"),
            getDistinctValues("source"),
            getDistinctValues("country"),
            getDistinctValues("end_year"),
        ]);

        return successResponse({
            topics,
            sectors,
            regions,
            pestles,
            sources,
            countries,
            endYears,
        });
    } catch (error) {
        console.error("FILTERS_API_ERROR", error);
        return errorResponse("Failed to fetch dashboard filters");
    }
}