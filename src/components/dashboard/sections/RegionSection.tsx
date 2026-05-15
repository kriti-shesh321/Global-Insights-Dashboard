"use client";

import { useEffect, useState } from "react";

import { SimpleBarChart } from "@/components/charts/SimpleBarChart";
import { SimpleDonutChart } from "@/components/charts/SimpleDonutChart";
import { chartColors, chartSectionColors } from "@/lib/chart-colors";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ChartCardSkeleton } from "@/components/dashboard/ChartCardSkeleton";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { fetchRegions } from "@/lib/api/dashboard";
import { DashboardFilters, RegionsData } from "@/types/dashboard";

type RegionSectionProps = {
    filters: DashboardFilters;
};

export function RegionSection({ filters }: RegionSectionProps) {
    const [data, setData] = useState<RegionsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadRegions() {
            try {
                setIsLoading(true);
                setError("");

                const regionsData = await fetchRegions(filters);
                setData(regionsData);
            } catch (error) {
                console.error("Failed to load regional data", error);
                setError("Unable to load regional intelligence data.");
            } finally {
                setIsLoading(false);
            }
        }

        loadRegions();
    }, [filters]);

    return (
        <section id="regions" className="scroll-mt-24 space-y-5">

            {error ? (
                <EmptyState title="Regional data unavailable" description={error} />
            ) : null}

            {isLoading ? (
                <RegionSectionSkeleton />
            ) : data ? (
                <div className="grid gap-5 xl:grid-cols-2">
                    <ChartCard
                        title="Insights by Region"
                        description="Share of insight records across top regions."
                    >
                        {data.insightsByRegion.length > 0 ? (
                            <SimpleDonutChart
                                data={data.insightsByRegion.slice(0, 6)}
                                nameKey="name"
                                valueKey="count"
                                height={300}
                                colors={[
                                    chartSectionColors.regions.primary,
                                    chartColors.teal,
                                    chartColors.greenSoft,
                                    chartColors.blueSoft,
                                    chartColors.cyan,
                                    chartColors.violet,
                                ]}
                            />
                        ) : (
                            <EmptyState />
                        )}
                    </ChartCard>

                    <ChartCard
                        title="Top Countries"
                        description="Countries with the highest number of insight records."
                    >
                        {data.topCountries.length > 0 ? (
                            <SimpleBarChart
                                data={data.topCountries}
                                xKey="count"
                                yKey="name"
                                layout="vertical"
                                height={360}
                                color={chartSectionColors.regions.primary}
                            />
                        ) : (
                            <EmptyState />
                        )}
                    </ChartCard>

                    <ChartCard
                        title="Average Intensity by Region"
                        description="Regions ranked by average intensity score."
                        className="xl:col-span-2"
                    >
                        {data.avgIntensityByRegion.length > 0 ? (
                            <SimpleBarChart
                                data={data.avgIntensityByRegion.slice(0, 10)}
                                xKey="name"
                                yKey="avgIntensity"
                                layout="horizontal"
                                height={300}
                                color={chartSectionColors.regions.secondary}
                                barSize={65}
                            />
                        ) : (
                            <EmptyState />
                        )}
                    </ChartCard>
                </div>
            ) : (
                <EmptyState />
            )}
        </section>
    );
}

function RegionSectionSkeleton() {
    return (
        <div className="grid gap-5 xl:grid-cols-2">
            <ChartCardSkeleton />
            <ChartCardSkeleton />
            <ChartCardSkeleton className="min-h-80 xl:col-span-2" />
        </div>
    );
}