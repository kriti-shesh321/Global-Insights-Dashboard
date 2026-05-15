import { DashboardFilters } from "@/types/dashboard";

type QueryValue = string | number | undefined | null;

export function buildQueryString(
    filters: DashboardFilters = {},
    extraParams: Record<string, QueryValue> = {}
) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && String(value).trim() !== "") {
            params.set(key, String(value));
        }
    });

    Object.entries(extraParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && String(value).trim() !== "") {
            params.set(key, String(value));
        }
    });

    const queryString = params.toString();

    return queryString ? `?${queryString}` : "";
}