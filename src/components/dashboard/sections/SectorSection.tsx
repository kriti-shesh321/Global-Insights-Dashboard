"use client";

import { useEffect, useState } from "react";

import { SimpleBarChart } from "@/components/charts/SimpleBarChart";
import { SimpleDonutChart } from "@/components/charts/SimpleDonutChart";
import { SimpleRadarChart } from "@/components/charts/SimpleRadarChart";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ChartCardSkeleton } from "@/components/dashboard/ChartCardSkeleton";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { fetchSectors } from "@/lib/api/dashboard";
import { DashboardFilters, SectorsData } from "@/types/dashboard";
import { chartColors, chartSectionColors } from "@/lib/chart-colors";

type SectorSectionProps = {
    filters: DashboardFilters;
};

export function SectorSection({ filters }: SectorSectionProps) {
    const [data, setData] = useState<SectorsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadSectors() {
            try {
                setIsLoading(true);
                setError("");

                const sectorsData = await fetchSectors(filters);
                setData(sectorsData);
            } catch (error) {
                console.error("Failed to load sector data", error);
                setError("Unable to load sector and PESTLE data.");
            } finally {
                setIsLoading(false);
            }
        }

        loadSectors();
    }, [filters]);

    return (
        <section id="sectors" className="scroll-mt-24 space-y-5">
            {error ? (
                <EmptyState title="Sector data unavailable" description={error} />
            ) : null}

            {isLoading ? (
                <SectorSectionSkeleton />
            ) : data ? (
                <div className="grid gap-5">

                    {/* top row */}
                    <div className="grid gap-5 xl:grid-cols-[1fr_2fr]">

                        {/* insight panel */}
                        <ChartCard
                            title="Sector Insights"
                            description="Key business and sector intelligence highlights."
                            className="flex flex-col justify-between"
                        >
                            <div className="space-y-5">

                                <div className="grid gap-2">

                                    <InsightItem
                                        label="Top Sector"
                                        value={
                                            data.sectorDistribution[0]?.name ??
                                            "N/A"
                                        }
                                        metric={String(
                                            data.sectorDistribution[0]?.count ?? 0
                                        )}
                                        metricLabel="records"
                                        color={chartColors.violet}
                                    />

                                    <InsightItem
                                        label="Dominant PESTLE"
                                        value={
                                            data.pestleDistribution[0]?.name ??
                                            "N/A"
                                        }
                                        metric={String(
                                            data.pestleDistribution[0]?.count ?? 0
                                        )}
                                        metricLabel="records"
                                        color={chartColors.orange}
                                    />

                                    <InsightItem
                                        label="Highest Intensity"
                                        value={
                                            data.avgIntensityBySector[0]?.name ??
                                            "N/A"
                                        }
                                        metric={String(
                                            data.avgIntensityBySector[0]
                                                ?.avgIntensity ?? 0
                                        )}
                                        metricLabel="score"
                                        color={chartColors.pink}
                                    />

                                    <InsightItem
                                        label="Sector Count"
                                        value="Tracked Sectors"
                                        metric={String(
                                            data.sectorDistribution.length
                                        )}
                                        metricLabel="total"
                                        color={chartColors.cyan}
                                    />
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2">

                                    {data.sectorDistribution
                                        .slice(0, 5)
                                        .map((sector) => (
                                            <div
                                                key={sector.name}
                                                className="rounded-sm border border-border/60 bg-muted/40 px-3 py-1 text-xs text-muted-foreground"
                                            >
                                                {sector.name}
                                            </div>
                                        ))}
                                </div>

                            </div>
                        </ChartCard>

                        {/* radar chart */}
                        <ChartCard
                            title="Sector Performance Radar"
                            description="Intensity comparison across major sectors."
                        >
                            {data.pestleDistribution.length > 0 ? (
                                <SimpleRadarChart
                                    data={data.avgIntensityBySector.slice(0, 6)}
                                    angleKey="name"
                                    dataKey="avgIntensity"
                                    height={320}
                                    color={
                                        chartSectionColors.sectors.accent
                                    }
                                />
                            ) : (
                                <EmptyState />
                            )}
                        </ChartCard>
                    </div>

                    {/* bottom row */}
                    <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">

                        {/* bar chart */}
                        <ChartCard
                            title="PESTLE Distribution"
                            description="Breakdown of insights by PESTLE category."
                        >
                            {data.pestleDistribution.length > 0 ? (
                                <SimpleBarChart
                                    data={data.pestleDistribution.slice(0, 8)}
                                    xKey="count"
                                    yKey="name"
                                    layout="vertical"
                                    height={360}
                                    color={chartColors.orange}
                                    barSize={10}
                                />
                            ) : (
                                <EmptyState />
                            )}
                        </ChartCard>

                        {/* donut chart */}
                        <ChartCard
                            title="Sector Distribution"
                            description="Share of insight records grouped by sector."
                        >
                            {data.sectorDistribution.length > 0 ? (
                                <SimpleDonutChart
                                    data={data.sectorDistribution.slice(0, 6)}
                                    nameKey="name"
                                    valueKey="count"
                                    height={190}
                                    colors={[
                                        chartColors.violet,
                                        chartColors.pink,
                                        chartColors.orange,
                                        chartColors.cyan,
                                        chartColors.green,
                                        chartColors.roseSoft,
                                    ]}
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

type InsightItemProps = {
    label: string;
    value: string;
    metric: string;
    metricLabel: string;
    color: string;
};

function InsightItem({
    label,
    value,
    metric,
    metricLabel,
    color,
}: InsightItemProps) {
    return (
        <div
            className="
                grid
                grid-cols-[36px_1fr_auto]
                items-center
                gap-4
                rounded-sm
                border
                border-border/60
                bg-muted/20
                px-4
                py-3
            "
        >

            {/* icon */}
            <div
                className="flex h-9 w-9 items-center justify-center rounded-sm"
                style={{
                    backgroundColor: `${color}20`,
                }}
            >
                <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                        backgroundColor: color,
                    }}
                />
            </div>

            {/* content */}
            <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                    {value}
                </p>

                <p className="text-xs text-muted-foreground">
                    {label}
                </p>
            </div>

            {/* metric value */}
            <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                    {metric}
                </p>

                <p className="text-[11px] text-muted-foreground">
                    {metricLabel}
                </p>
            </div>
        </div>
    );
}

function SectorSectionSkeleton() {
    return (
        <>
            <div className="grid gap-5 xl:grid-cols-2">
                <ChartCardSkeleton className="min-h-65" />
                <ChartCardSkeleton className="min-h-65" />
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
                <ChartCardSkeleton className="min-h-90" />
                <ChartCardSkeleton className="min-h-90" />
            </div>
        </>
    );
}