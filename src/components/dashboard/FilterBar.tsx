"use client";

import { Filter, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DashboardFilterOptions,
    DashboardFilters,
} from "@/types/dashboard";

type FilterBarProps = {
    filters: DashboardFilters;
    options: DashboardFilterOptions | null;
    isLoading?: boolean;
    onFilterChange: (key: keyof DashboardFilters, value: string) => void;
    onReset: () => void;
};

const filterConfig: {
    key: keyof DashboardFilters;
    label: string;
    optionKey: keyof DashboardFilterOptions;
}[] = [
        {
            key: "end_year",
            label: "End Year",
            optionKey: "endYears",
        },
        {
            key: "topic",
            label: "Topic",
            optionKey: "topics",
        },
        {
            key: "sector",
            label: "Sector",
            optionKey: "sectors",
        },
        {
            key: "region",
            label: "Region",
            optionKey: "regions",
        },
        {
            key: "pestle",
            label: "PESTLE",
            optionKey: "pestles",
        },
        {
            key: "source",
            label: "Source",
            optionKey: "sources",
        },
        {
            key: "country",
            label: "Country",
            optionKey: "countries",
        },
    ];

function getActiveFilterCount(filters: DashboardFilters) {
    return Object.values(filters).filter(
        (value) => value !== undefined && value !== null && String(value).trim() !== ""
    ).length;
}

export function FilterBar({
    filters,
    options,
    isLoading = false,
    onFilterChange,
    onReset,
}: FilterBarProps) {
    const activeFilterCount = getActiveFilterCount(filters);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters

                    {activeFilterCount > 0 ? (
                        <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                            {activeFilterCount}
                        </span>
                    ) : null}
                </Button>
            </PopoverTrigger>

            <PopoverContent
                align="end"
                className="w-[min(92vw,580px)] rounded-2xl p-4 shadow-xl"
            >
                <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-semibold">Global Filters</h3>
                        </div>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Filters will update all dashboard sections.
                        </p>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onReset}
                        disabled={activeFilterCount === 0}
                    >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset
                    </Button>
                </div>

                {isLoading ? (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {filterConfig.map((filter) => (
                            <div key={filter.key} className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground">
                                    {filter.label}
                                </label>

                                <div className="h-10 animate-pulse rounded-xl bg-muted" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {filterConfig.map((filter) => {
                            const values = options?.[filter.optionKey] ?? [];

                            return (
                                <div key={filter.key} className="space-y-1.5">
                                    <label className="text-xs font-medium text-muted-foreground">
                                        {filter.label}
                                    </label>

                                    <Select
                                        value={filters[filter.key] ?? "all"}
                                        onValueChange={(value) =>
                                            onFilterChange(filter.key, value)
                                        }
                                        
                                    >
                                        <SelectTrigger className="rounded-md min-w-full">
                                            <SelectValue placeholder={`Select ${filter.label}`} />
                                        </SelectTrigger>

                                        <SelectContent className="min-w-full rounded-md">
                                            <SelectItem value="all">All</SelectItem>

                                            {values.map((value) => (
                                                <SelectItem key={value} value={value}>
                                                    {value}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            );
                        })}
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}