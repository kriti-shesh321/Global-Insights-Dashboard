import { DashboardFilters } from "@/types/insight";

const FILTER_KEYS = [
    "topic",
    "sector",
    "region",
    "pestle",
    "source",
    "country",
    "end_year",
] as const;

type FilterKey = keyof DashboardFilters;

export type MongoFilter = Record<string, unknown>;

export function isValidValue(value: unknown) {
    return value !== undefined && value !== null && String(value).trim() !== "";
}

export function buildMongoFilters(searchParams: URLSearchParams): MongoFilter {
    const filters: MongoFilter = {};

    FILTER_KEYS.forEach((key: FilterKey) => {
        const value = searchParams.get(key);

        if (isValidValue(value)) {
            filters[key] = value;
        }
    });

    return filters;
}

export function buildSearchFilter(search: string | null): MongoFilter {
    if (!isValidValue(search)) {
        return {};
    }

    return {
        $or: [
            { title: { $regex: search, $options: "i" } },
            { insight: { $regex: search, $options: "i" } },
            { topic: { $regex: search, $options: "i" } },
            { sector: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } },
            { region: { $regex: search, $options: "i" } },
            { source: { $regex: search, $options: "i" } },
        ],
    };
}

export function withNonEmptyField(field: string): MongoFilter {
    return {
        [field]: {
            $nin: ["", null],
        },
    };
}