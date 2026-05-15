"use client";

import { useEffect, useState } from "react";
import {
    AlertTriangle,
    CheckCircle2,
    Database,
    FileWarning,
} from "lucide-react";

import { SimpleBarChart } from "@/components/charts/SimpleBarChart";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ChartCardSkeleton } from "@/components/dashboard/ChartCardSkeleton";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatCardSkeleton } from "@/components/dashboard/StatCardSkeleton";
import { Button } from "@/components/ui/button";
import { fetchDataQuality } from "@/lib/api/dashboard";
import { chartColors } from "@/lib/chart-colors";
import { DashboardFilters, DataQualityData } from "@/types/dashboard";

type DataQualitySectionProps = {
    filters: DashboardFilters;
};

export function DataQualitySection({ filters }: DataQualitySectionProps) {
    const [data, setData] = useState<DataQualityData | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDataQuality() {
            try {
                setIsLoading(true);
                setError("");

                const qualityData = await fetchDataQuality(filters);
                setData(qualityData);
            } catch (error) {
                console.error("Failed to load data quality", error);
                setError("Unable to load dataset quality data.");
            } finally {
                setIsLoading(false);
            }
        }

        loadDataQuality();
    }, [filters]);

    return (
        <section id="data-quality" className="scroll-mt-24">
            <div className="rounded-sm border border-border/60 bg-card/80 p-5">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Dataset Quality Analysis
                        </p>

                        <h2 className="mt-1 text-lg font-semibold text-foreground">
                            Completeness and missing value overview
                        </h2>

                        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                            Review how complete the dataset is across important fields before interpreting dashboard insights.
                        </p>
                    </div>

                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setIsOpen((currentValue) => !currentValue)}
                        className="rounded-sm text-md font-medium border transition-colors text-(--success-dark) border-(--success-border) bg-(--success-bg) hover:bg-(--success-bg)"
                    >
                        {isOpen ? "Hide Details" : "Show Details"}
                    </Button>
                </div>

                {error ? (
                    <EmptyState title="Data quality unavailable" description={error} />
                ) : isLoading ? (
                    <DataQualitySkeleton />
                ) : data ? (
                    <>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            <StatCard
                                title="Total Records"
                                value={data.totalRecords}
                                icon={Database}
                                iconColor={chartColors.green}
                                className="border-b-4 hover:border-b-green-600"
                            />

                            <StatCard
                                title="Complete Fields"
                                value={data.summary.completeFields}
                                icon={CheckCircle2}
                                iconColor={chartColors.yellowSoft}
                                className="border-b-4 hover:border-b-yellow-300"
                            />

                            <StatCard
                                title="Sparse Fields"
                                value={data.summary.sparseFields}
                                icon={AlertTriangle}
                                iconColor={chartColors.orange}
                                className="border-b-4 hover:border-b-orange-400"
                            />

                            <StatCard
                                title="Most Missing Field"
                                value={data.summary.mostMissingField || "N/A"}
                                icon={FileWarning}
                                iconColor={chartColors.roseSoft}
                                className="border-b-4 hover:border-b-red-500"
                            />
                        </div>

                        {isOpen ? (
                            <div className="mt-5">
                                <ChartCard
                                    title="Missing Value Analysis"
                                    description="Missing value percentage across important dataset fields."
                                >
                                    {data.missingValues.length > 0 ? (
                                        <SimpleBarChart
                                            data={data.missingValues}
                                            xKey="missingPercentage"
                                            yKey="field"
                                            layout="vertical"
                                            height={500}
                                            color={chartColors.roseSoft}
                                            barSize={15}
                                        />
                                    ) : (
                                        <EmptyState
                                            title="No missing values found"
                                            description="The selected dataset slice appears complete."
                                        />
                                    )}
                                </ChartCard>
                            </div>
                        ) : null}
                    </>
                ) : (
                    <EmptyState />
                )}
            </div>
        </section>
    );
}

function DataQualitySkeleton() {
    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <StatCardSkeleton key={index} />
                ))}
            </div>

            <ChartCardSkeleton className="mt-5 min-h-90" />
        </>
    );
}