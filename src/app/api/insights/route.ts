import Insight from "@/models/Insight";
import { connectDB } from "@/lib/mongodb";
import {
    buildMongoFilters,
    buildSearchFilter,
} from "@/lib/api/buildMongoFilters";
import { errorResponse, successResponse } from "@/lib/api/response";

const ALLOWED_SORT_FIELDS = [
    "intensity",
    "likelihood",
    "relevance",
    "end_year",
    "topic",
    "sector",
    "region",
    "country",
    "pestle",
    "source",
];

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);

        const page = Math.max(Number(searchParams.get("page")) || 1, 1);
        const limit = Math.min(
            Math.max(Number(searchParams.get("limit")) || 10, 1),
            100
        );

        const search = searchParams.get("search");
        const sortBy = searchParams.get("sortBy") || "intensity";
        const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

        const filters = buildMongoFilters(searchParams);
        const searchFilter = buildSearchFilter(search);

        const finalFilters = {
            ...filters,
            ...searchFilter,
        };

        const safeSortBy = ALLOWED_SORT_FIELDS.includes(sortBy)
            ? sortBy
            : "intensity";

        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            Insight.find(finalFilters)
                .select("-__v")
                .sort({
                    [safeSortBy]: sortOrder === "asc" ? 1 : -1,
                })
                .skip(skip)
                .limit(limit)
                .lean(),
            Insight.countDocuments(finalFilters),
        ]);

        return successResponse({
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("INSIGHTS_API_ERROR", error);
        return errorResponse("Failed to fetch insights");
    }
}