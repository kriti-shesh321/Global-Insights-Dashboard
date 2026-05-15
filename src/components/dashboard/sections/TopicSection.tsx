"use client";

import { useEffect, useState } from "react";

import { SimpleBarChart } from "@/components/charts/SimpleBarChart";
import { SimpleLineChart } from "@/components/charts/SimpleLineChart";
import { SimpleCompositeChart } from "@/components/charts/SimpleCompositeChart";

import { ChartCard } from "@/components/dashboard/ChartCard";
import { ChartCardSkeleton } from "@/components/dashboard/ChartCardSkeleton";
import { EmptyState } from "@/components/dashboard/EmptyState";

import { fetchTopics } from "@/lib/api/dashboard";
import { chartColors } from "@/lib/chart-colors";

import {
    DashboardFilters,
    TopicsData,
} from "@/types/dashboard";

type TopicSectionProps = {
    filters: DashboardFilters;
};

export function TopicSection({
    filters,
}: TopicSectionProps) {
    const [data, setData] =
        useState<TopicsData | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        async function loadTopics() {
            try {
                setIsLoading(true);
                setError("");

                const topicsData =
                    await fetchTopics(filters);

                setData(topicsData);
            } catch (error) {
                console.error(
                    "Failed to load topic data",
                    error
                );

                setError(
                    "Unable to load topic intelligence data."
                );
            } finally {
                setIsLoading(false);
            }
        }

        loadTopics();
    }, [filters]);

    return (
        <section
            id="topics"
            className="scroll-mt-24 space-y-5"
        >
            {error ? (
                <EmptyState
                    title="Topic data unavailable"
                    description={error}
                />
            ) : null}

            {isLoading ? (
                <TopicSectionSkeleton />
            ) : data ? (
                <div className="space-y-5">
                    <ChartCard
                        title="Topic Relevance vs Intensity"
                        description="Comparative relationship between relevance and intensity across major topics."
                    >
                        {data.avgRelevanceByTopic.length > 0 ? (() => {

                            const relevanceData =
                                data.avgRelevanceByTopic.slice(0, 6);

                            const intensityData =
                                data.avgIntensityByTopic.slice(0, 6);

                            const maxIntensity = Math.max(
                                0,
                                ...intensityData.map(
                                    (item) => item.avgIntensity ?? 0
                                )
                            );

                            const maxRelevance = Math.max(
                                0,
                                ...relevanceData.map(
                                    (item) => item.avgRelevance ?? 0
                                )
                            );

                            const normalizedData = relevanceData.map(
                                (item, index) => {
                                    const originalIntensity =
                                        intensityData[index]?.avgIntensity ?? 0;

                                    const normalizedIntensity =
                                        (originalIntensity / maxIntensity) *
                                        maxRelevance;

                                    return {
                                        name: item.name,

                                        avgRelevance:
                                            item.avgRelevance,

                                        avgIntensity:
                                            Number(
                                                normalizedIntensity.toFixed(2)
                                            ),
                                    };
                                }
                            );

                            return (
                                <SimpleCompositeChart
                                    data={normalizedData}
                                    xKey="name"
                                    barKey="avgRelevance"
                                    lineKey="avgIntensity"
                                    height={200}
                                    barColor={chartColors.orange}
                                    lineColor={chartColors.purple}
                                />
                            );

                        })() : (
                            <EmptyState />
                        )}
                    </ChartCard>
                    <div className="grid gap-5 xl:grid-cols-[1.25fr_0.9fr]">
                        <ChartCard
                            title="Topic Intensity"
                            description="Average intensity scores across major topics."
                        >
                            {data.avgIntensityByTopic.length > 0 ? (
                                <SimpleBarChart
                                    data={data.avgIntensityByTopic
                                        .slice(0, 7)}
                                    xKey="name"
                                    yKey="avgIntensity"
                                    layout="horizontal"
                                    height={200}
                                    color={chartColors.green}
                                />
                            ) : (
                                <EmptyState />
                            )}
                        </ChartCard>

                        <ChartCard
                            title="Topic Distribution"
                            description="Distribution of most discussed topics."
                        >
                            {data.mostDiscussedTopics.length > 0 ? (
                                < SimpleLineChart
                                    data={data.mostDiscussedTopics
                                        .slice()
                                        .reverse()
                                        .map((topic) => ({
                                            topic: topic.name,
                                            count: topic.count,
                                        }))}
                                    xKey="topic"
                                    yKey="count"
                                    height={250}
                                    color={chartColors.blueSoft}
                                />

                            ) : (
                                <EmptyState />
                            )}
                        </ChartCard>
                    </div>


                </div>
            ) : (
                <EmptyState />
            )}
        </section>
    );
}

function TopicSectionSkeleton() {
    return (
        <div className="space-y-7">
            <div className="grid gap-5 xl:grid-cols-[1.25fr_0.9fr]">
                <ChartCardSkeleton className="min-h-80" />

                <ChartCardSkeleton className="min-h-70" />
            </div>

            <ChartCardSkeleton className="min-h-90" />
        </div>
    );
}