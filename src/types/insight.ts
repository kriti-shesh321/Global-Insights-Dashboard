export type Insight = {
    end_year: string | number;
    intensity: number;
    sector: string;
    topic: string;
    insight: string;
    url: string;
    region: string;
    start_year: string | number;
    impact: string | number;
    added: string;
    published: string;
    country: string;
    relevance: number;
    pestle: string;
    source: string;
    title: string;
    likelihood: number;
};

export type DashboardFilters = {
    topic?: string;
    sector?: string;
    region?: string;
    pestle?: string;
    source?: string;
    country?: string;
    end_year?: string;
};

export type SortOrder = "asc" | "desc";