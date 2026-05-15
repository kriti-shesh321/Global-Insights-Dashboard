import Insight from "@/models/Insight";
import { connectDB } from "@/lib/mongodb";
import { buildMongoFilters } from "@/lib/api/buildMongoFilters";
import { errorResponse, successResponse } from "@/lib/api/response";

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const filters = buildMongoFilters(searchParams);

        const recordsByYear = await Insight.aggregate([
            {
                $match: {
                    ...filters,
                    end_year: { $nin: ["", null] },
                },
            },
            {
                $addFields: {
                    yearNumber: { $toInt: "$end_year" },
                },
            },
            {
                $group: {
                    _id: "$yearNumber",
                    count: { $sum: 1 },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id",
                    count: 1,
                },
            },
        ]);

        const avgIntensityByYear = await Insight.aggregate([
            {
                $match: {
                    ...filters,
                    end_year: { $nin: ["", null] },
                    intensity: { $type: "number" },
                },
            },
            {
                $addFields: {
                    yearNumber: { $toInt: "$end_year" },
                },
            },
            {
                $group: {
                    _id: "$yearNumber",
                    avgIntensity: { $avg: "$intensity" },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id",
                    avgIntensity: { $round: ["$avgIntensity", 2] },
                },
            },
        ]);

        return successResponse({
            recordsByYear,
            avgIntensityByYear,
        });
    } catch (error) {
        console.error("TIMELINE_API_ERROR", error);
        return errorResponse("Failed to fetch timeline analytics");
    }
}