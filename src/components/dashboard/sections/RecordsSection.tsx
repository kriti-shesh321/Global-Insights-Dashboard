"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Search } from "lucide-react";

import { ChartCard } from "@/components/dashboard/ChartCard";
import { ChartCardSkeleton } from "@/components/dashboard/ChartCardSkeleton";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { fetchInsights } from "@/lib/api/dashboard";
import {
    DashboardFilters,
    InsightRecord,
    InsightsResponse,
} from "@/types/dashboard";

import formatText from "@/lib/utils/format-text";

type RecordsSectionProps = {
    filters: DashboardFilters;
};

export function RecordsSection({ filters }: RecordsSectionProps) {
    const [data, setData] = useState<InsightsResponse | null>(null);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);
    const [prevFilters, setPrevFilters] = useState(filters);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const limit = 10;

    if (filters !== prevFilters) {
        setPrevFilters(filters);
        setPage(1);
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 400);

        return () => clearTimeout(timeoutId);
    }, [search]);

    useEffect(() => {
        async function loadRecords() {
            try {
                setIsLoading(true);
                setError("");

                const recordsData = await fetchInsights({
                    filters,
                    page,
                    limit,
                    search: debouncedSearch,
                });

                setData(recordsData);
            } catch (error) {
                console.error("Failed to load records", error);
                setError("Unable to load detailed records.");
            } finally {
                setIsLoading(false);
            }
        }

        loadRecords();
    }, [filters, page, debouncedSearch]);

    const records = data?.data ?? [];
    const pagination = data?.pagination;

    const visiblePages = useMemo(() => {
        if (!pagination) return [];

        const totalPages = pagination.totalPages || 1;
        const pages: number[] = [];

        const start = Math.max(1, page - 2);
        const end = Math.min(totalPages, page + 2);

        for (let current = start; current <= end; current++) {
            pages.push(current);
        }

        return pages;
    }, [pagination, page]);

    return (
        <section id="records" className="scroll-mt-24">
            <ChartCard
                title="All Records"
            >
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Detailed Dataset
                        </p>

                        <h2 className="mt-1 text-lg font-semibold text-foreground">
                            Complete record-level view
                        </h2>
                    </div>

                    <div className="relative w-full md:max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search title, topic, sector..."
                            className="pl-9"
                        />
                    </div>
                </div>

                {error ? (
                    <EmptyState title="Records unavailable" description={error} />
                ) : isLoading ? (
                    <ChartCardSkeleton className="min-h-105" />
                ) : records.length > 0 ? (
                    <>
                        <div className="overflow-x-auto rounded-sm border border-border/60">
                            <Table className="min-w-245 border">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Topic</TableHead>
                                        <TableHead>Sector</TableHead>
                                        <TableHead>Region</TableHead>
                                        <TableHead>Country</TableHead>
                                        <TableHead>Intensity</TableHead>
                                        <TableHead>Relevance</TableHead>
                                        <TableHead>Likelihood</TableHead>
                                        <TableHead>Source</TableHead>
                                        <TableHead className="text-right">Link</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {records.map((record) => (
                                        <RecordRow key={record._id} record={record} />
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing page{" "}
                                <span className="font-medium text-foreground">
                                    {pagination?.page ?? 1}
                                </span>{" "}
                                of{" "}
                                <span className="font-medium text-foreground">
                                    {pagination?.totalPages || 1}
                                </span>{" "}
                                • Total records:{" "}
                                <span className="font-medium text-foreground">
                                    {pagination?.total ?? 0}
                                </span>
                            </p>

                            <div className="flex flex-wrap items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!pagination || page <= 1}
                                    onClick={() => setPage(1)}
                                >
                                    First
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!pagination || page <= 1}
                                    onClick={() => setPage((currentPage) => currentPage - 1)}
                                >
                                    Previous
                                </Button>

                                {visiblePages.map((pageNumber) => (
                                    <Button
                                        key={pageNumber}
                                        variant={pageNumber === page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </Button>
                                ))}

                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={
                                        !pagination || page >= (pagination.totalPages || 1)
                                    }
                                    onClick={() => setPage((currentPage) => currentPage + 1)}
                                >
                                    Next
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={
                                        !pagination || page >= (pagination.totalPages || 1)
                                    }
                                    onClick={() => setPage(pagination?.totalPages || 1)}
                                >
                                    Last
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <EmptyState
                        title="No records found"
                        description="Try changing filters or clearing the search query."
                    />
                )}
            </ChartCard>
        </section>
    );
}

function RecordRow({ record }: { record: InsightRecord; }) {
    return (
        <TableRow>
            <TableCell className="max-w-40 truncate font-medium">
                {formatText(record.topic)}
            </TableCell>

            <TableCell className="max-w-40 truncate">
                {formatText(record.sector)}
            </TableCell>

            <TableCell className="max-w-40 truncate">
                {formatText(record.region)}
            </TableCell>

            <TableCell className="max-w-45 truncate">
                {formatText(record.country)}
            </TableCell>

            <TableCell>{record.intensity || 0}</TableCell>
            <TableCell>{record.relevance || 0}</TableCell>
            <TableCell>{record.likelihood || 0}</TableCell>

            <TableCell className="max-w-45 truncate">
                {formatText(record.source)}
            </TableCell>

            <TableCell className="text-right">
                {record.url ? (
                    <a
                        href={record.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-end text-primary hover:underline"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </a>
                ) : (
                    "N/A"
                )}
            </TableCell>
        </TableRow>
    );
}