"use client";

import { useEffect, useState } from "react";
import {
    Activity,
    BarChart3,
    Database,
    Globe2,
    Target,
} from "lucide-react";

import { chartColors, chartSectionColors } from "@/lib/chart-colors";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ChartCardSkeleton } from "@/components/dashboard/ChartCardSkeleton";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatCardSkeleton } from "@/components/dashboard/StatCardSkeleton";
import { SimpleAreaChart } from "@/components/charts/SimpleAreaChart";
import { SimpleDonutChart } from "@/components/charts/SimpleDonutChart";
import { fetchOverview } from "@/lib/api/dashboard";
import { DashboardFilters, OverviewData } from "@/types/dashboard";

type OverviewSectionProps = {
    filters: DashboardFilters;
};

export function OverviewSection({ filters }: OverviewSectionProps) {
    const [data, setData] = useState<OverviewData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadOverview() {
            try {
                setIsLoading(true);
                setError("");

                const overviewData = await fetchOverview(filters);
                setData(overviewData);
            } catch (error) {
                console.error("Failed to load overview data", error);
                setError("Unable to load overview data.");
            } finally {
                setIsLoading(false);
            }
        }

        loadOverview();
    }, [filters]);

    return (
        <section
            id="overview"
            className="scroll-mt-24 min-h-[calc(100vh-6rem)] flex items-center"
        >
            {error ? (
                <EmptyState
                    title="Overview data unavailable"
                    description={error}
                />
            ) : null}

            {isLoading ? (
                <OverviewSkeleton />
            ) : data ? (
                <>
                    <div className="w-full grid gap-5 xl:grid-cols-[1.35fr_0.95fr]">
                        <div className="space-y-6">
                            <div className="grid gap-5 md:grid-cols-2">
                                <StatCard
                                    title="Total Records"
                                    value={data.totalRecords}
                                    icon={Database}
                                    iconColor={chartColors.purple}
                                />

                                <StatCard
                                    title="Total Countries"
                                    value={data.totalCountries}
                                    icon={Globe2}
                                    iconColor={chartColors.cyan}
                                />
                            </div>

                            <div className="grid gap-5 md:grid-cols-3">
                                <StatCard
                                    title="Avg Intensity"
                                    value={data.avgIntensity}
                                    icon={Activity}
                                    iconColor={chartColors.orange}
                                />

                                <StatCard
                                    title="Avg Relevance"
                                    value={data.avgRelevance}
                                    icon={Target}
                                    iconColor={chartColors.green}
                                />

                                <StatCard
                                    title="Avg Likelihood"
                                    value={data.avgLikelihood}
                                    icon={BarChart3}
                                    iconColor={chartColors.pink}
                                />
                            </div>

                            <ChartCard
                                title="Top Topics"
                                description="Most frequently occurring topics in the dataset."
                            >
                                {data.topTopics.length > 0 ? (
                                    <SimpleAreaChart
                                        data={data.topTopics
                                            .slice()
                                            .reverse()
                                            .map((topic) => ({
                                                topic: topic.name,
                                                count: topic.count,
                                            }))}
                                        xKey="topic"
                                        yKey="count"
                                        height={170}
                                        color="#28C76F"
                                    />
                                ) : (
                                    <EmptyState />
                                )}
                            </ChartCard>
                        </div>

                        <ChartCard
                            title="Records by Region"
                            description="Regional distribution of insight records."
                        >
                            {data.recordsByRegion.length > 0 ? (
                                <SimpleDonutChart
                                    data={data.recordsByRegion.slice(0, 6)}
                                    nameKey="name"
                                    valueKey="count"
                                    height={280}
                                />
                            ) : (
                                <EmptyState />
                            )}
                        </ChartCard>
                    </div>
                </>
            ) : (
                <EmptyState />
            )}
        </section>
    );
}

function OverviewSkeleton() {
    return (
        <>
            <div className="w-full grid gap-5 xl:grid-cols-[1.35fr_0.95fr]">
                <div className="grid gap-5 md:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <StatCardSkeleton key={index} />
                    ))}
                </div>


                <div className="grid gap-5 xl:grid-cols-1">
                    <ChartCardSkeleton />
                </div>
            </div>
        </>
    );
}