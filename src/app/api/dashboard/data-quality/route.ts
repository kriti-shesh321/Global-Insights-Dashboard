import Insight from "@/models/Insight";
import { connectDB } from "@/lib/mongodb";
import { errorResponse, successResponse } from "@/lib/api/response";

const FIELDS_TO_CHECK = [
    "end_year",
    "intensity",
    "sector",
    "topic",
    "insight",
    "url",
    "region",
    "start_year",
    "impact",
    "added",
    "published",
    "country",
    "relevance",
    "pestle",
    "source",
    "title",
    "likelihood",
];

export async function GET() {
    try {
        await connectDB();

        const totalRecords = await Insight.countDocuments();

        const missingValues = await Promise.all(
            FIELDS_TO_CHECK.map(async (field) => {
                const missingCount = await Insight.countDocuments({
                    $or: [
                        { [field]: "" },
                        { [field]: null },
                        { [field]: { $exists: false } },
                    ],
                });

                const missingPercentage =
                    totalRecords === 0
                        ? 0
                        : Number(((missingCount / totalRecords) * 100).toFixed(2));

                return {
                    field,
                    missingCount,
                    missingPercentage,
                };
            })
        );

        const completeFields = missingValues.filter(
            (item) => item.missingCount === 0
        ).length;

        const sparseFields = missingValues.filter(
            (item) => item.missingPercentage >= 50
        ).length;

        const mostMissingField = [...missingValues].sort(
            (a, b) => b.missingPercentage - a.missingPercentage
        )[0];

        return successResponse({
            totalRecords,
            missingValues: missingValues.sort(
                (a, b) => b.missingPercentage - a.missingPercentage
            ),
            summary: {
                completeFields,
                sparseFields,
                mostMissingField: mostMissingField?.field ?? null,
            },
        });
    } catch (error) {
        console.error("DATA_QUALITY_API_ERROR", error);
        return errorResponse("Failed to fetch data quality analytics");
    }
}