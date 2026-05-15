import {
    ApiResponse,
    DashboardFilterOptions,
    DashboardFilters,
    DataQualityData,
    InsightsResponse,
    OverviewData,
    RegionsData,
    SectorsData,
    TimelineData,
    TopicsData,
} from "@/types/dashboard";

import { buildQueryString } from "@/lib/utils/query-string";

async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    const result: ApiResponse<T> = await response.json();

    if (!result.success) {
        throw new Error(result.message || "Something went wrong");
    }

    return result.data;
}

export async function fetchDashboardFilters() {
    return fetchJson<DashboardFilterOptions>("/api/dashboard/filters");
}

export async function fetchOverview(filters: DashboardFilters = {}) {
    const queryString = buildQueryString(filters);

    return fetchJson<OverviewData>(`/api/dashboard/overview${queryString}`);
}

export async function fetchTopics(filters: DashboardFilters = {}) {
    const queryString = buildQueryString(filters);

    return fetchJson<TopicsData>(`/api/dashboard/topics${queryString}`);
}

export async function fetchRegions(filters: DashboardFilters = {}) {
    const queryString = buildQueryString(filters);

    return fetchJson<RegionsData>(`/api/dashboard/regions${queryString}`);
}

export async function fetchSectors(filters: DashboardFilters = {}) {
    const queryString = buildQueryString(filters);

    return fetchJson<SectorsData>(`/api/dashboard/sectors${queryString}`);
}

export async function fetchTimeline(filters: DashboardFilters = {}) {
    const queryString = buildQueryString(filters);

    return fetchJson<TimelineData>(`/api/dashboard/timeline${queryString}`);
}

export async function fetchDataQuality(filters: DashboardFilters = {}) {
    const queryString = buildQueryString(filters);

    return fetchJson<DataQualityData>(
        `/api/dashboard/data-quality${queryString}`
    );
}

type FetchInsightsParams = {
    filters?: DashboardFilters;
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};

export async function fetchInsights({
    filters = {},
    page = 1,
    limit = 10,
    search = "",
    sortBy = "published",
    sortOrder = "desc",
}: FetchInsightsParams = {}) {
    const queryString = buildQueryString(filters, {
        page,
        limit,
        search,
        sortBy,
        sortOrder,
    });

    return fetchJson<InsightsResponse>(`/api/insights${queryString}`);
}