"use client";

import { useEffect, useState } from "react";

import { SimpleAreaChart } from "@/components/charts/SimpleAreaChart";
import { SimpleLineChart } from "@/components/charts/SimpleLineChart";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ChartCardSkeleton } from "@/components/dashboard/ChartCardSkeleton";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { fetchTimeline } from "@/lib/api/dashboard";
import { chartColors, chartSectionColors } from "@/lib/chart-colors";
import { DashboardFilters, TimelineData } from "@/types/dashboard";

type TimelineSectionProps = {
    filters: DashboardFilters;
};

export function TimelineSection({ filters }: TimelineSectionProps) {
    const [data, setData] = useState<TimelineData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadTimeline() {
            try {
                setIsLoading(true);
                setError("");

                const timelineData = await fetchTimeline(filters);
                setData(timelineData);
            } catch (error) {
                console.error("Failed to load timeline data", error);
                setError("Unable to load timeline data.");
            } finally {
                setIsLoading(false);
            }
        }

        loadTimeline();
    }, [filters]);

    return (
        <section id="timeline" className="scroll-mt-24">
            <div className="rounded-sm border border-border/60 bg-card/80 p-5">
                <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>

                        <h2 className="mt-1 text-lg uppercase font-bold text-foreground">
                            Time Trend Analysis
                        </h2>

                        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                            Track yearly record volume and average intensity using available end-year data.
                        </p>
                    </div>

                    <div className="rounded-sm border border-border/60 bg-muted/30 px-3 py-2">
                        <p className="text-xs text-muted-foreground">
                            Based on available{" "}
                            <span className="font-medium text-foreground">
                                end_year
                            </span>{" "}
                            values only.
                        </p>
                    </div>
                </div>

                {error ? (
                    <EmptyState title="Timeline data unavailable" description={error} />
                ) : null}

                {isLoading ? (
                    <TimelineSectionSkeleton />
                ) : data ? (
                    <div className="grid gap-5 xl:grid-cols-2">
                        <ChartCard
                            title="Records by Year"
                            description="Number of insight records grouped by end year."
                        >
                            {data.recordsByYear.length > 0 ? (
                                <SimpleLineChart
                                    data={data.recordsByYear}
                                    xKey="year"
                                    yKey="count"
                                    height={260}
                                    color={chartSectionColors.timeline.secondary}
                                />
                            ) : (
                                <EmptyState
                                    title="No year data found"
                                    description="Many records may have missing end year values."
                                />
                            )}
                        </ChartCard>

                        <ChartCard
                            title="Average Intensity by Year"
                        >
                            {data.avgIntensityByYear.length > 0 ? (
                                <SimpleAreaChart
                                    data={data.avgIntensityByYear}
                                    xKey="year"
                                    yKey="avgIntensity"
                                    height={260}
                                    color={chartColors.orange}
                                />
                            ) : (
                                <EmptyState
                                    title="No intensity trend found"
                                    description="Try resetting filters or selecting another year."
                                />
                            )}
                        </ChartCard>
                    </div>
                ) : (
                    <EmptyState />
                )}
            </div>
        </section>
    );
}

function TimelineSectionSkeleton() {
    return (
        <div className="grid gap-5 xl:grid-cols-2">
            <ChartCardSkeleton />
            <ChartCardSkeleton />
        </div>
    );
}