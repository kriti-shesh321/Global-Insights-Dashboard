export type ChartItem = {
    name: string;
    count: number;
};

export type AverageIntensityItem = {
    name: string;
    avgIntensity: number;
};

export type AverageRelevanceItem = {
    name: string;
    avgRelevance: number;
};

export type AverageLikelihoodItem = {
    name: string;
    avgLikelihood: number;
};

export type FlexibleAverageTopicItem = {
    name: string;
    avgIntensity?: number;
    avgRelevance?: number;
    avgLikelihood?: number;
};

export type YearCountItem = {
    year: number;
    count: number;
};

export type YearAverageIntensityItem = {
    year: number;
    avgIntensity: number;
};

export type DashboardFilters = {
    end_year?: string;
    topic?: string;
    sector?: string;
    region?: string;
    pestle?: string;
    source?: string;
    country?: string;
};

export type DashboardFilterOptions = {
    endYears: string[];
    topics: string[];
    sectors: string[];
    regions: string[];
    pestles: string[];
    sources: string[];
    countries: string[];
};

export type OverviewData = {
    totalRecords: number;
    avgIntensity: number;
    avgRelevance: number;
    avgLikelihood: number;
    totalTopics: number;
    totalCountries: number;
    topTopics: ChartItem[];
    recordsByRegion: ChartItem[];
};

export type TopicsData = {
    mostDiscussedTopics: ChartItem[];
    avgIntensityByTopic: FlexibleAverageTopicItem[];
    avgRelevanceByTopic: AverageRelevanceItem[];
};

export type RegionsData = {
    insightsByRegion: ChartItem[];
    topCountries: ChartItem[];
    avgIntensityByRegion: AverageIntensityItem[];
};

export type SectorsData = {
    sectorDistribution: ChartItem[];
    pestleDistribution: ChartItem[];
    avgIntensityBySector: AverageIntensityItem[];
};

export type TimelineData = {
    recordsByYear: YearCountItem[];
    avgIntensityByYear: YearAverageIntensityItem[];
};

export type MissingValueItem = {
    field: string;
    missingCount: number;
    missingPercentage: number;
};

export type DataQualitySummary = {
    completeFields: number;
    sparseFields: number;
    mostMissingField: string;
};

export type DataQualityData = {
    totalRecords: number;
    missingValues: MissingValueItem[];
    summary: DataQualitySummary;
};

export type InsightRecord = {
    _id: string;
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
    __v?: number;
};

export type InsightsResponse = {
    data: InsightRecord[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
};