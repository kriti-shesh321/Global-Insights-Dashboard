"use client";

import { useEffect, useState } from "react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { fetchDashboardFilters } from "@/lib/api/dashboard";
import {
    DashboardFilterOptions,
    DashboardFilters,
} from "@/types/dashboard";

import { OverviewSection } from "@/components/dashboard/sections/OverviewSection";
import { TopicSection } from "@/components/dashboard/sections/TopicSection";
import { RegionSection } from "@/components/dashboard/sections/RegionSection";
import { SectorSection } from "@/components/dashboard/sections/SectorSection";
import { TimelineSection } from "@/components/dashboard/sections/TimelineSection";
import { DataQualitySection } from "@/components/dashboard/sections/DataQualitySection";
import { RecordsSection } from "@/components/dashboard/sections/RecordsSection";


export default function DashboardPage() {
    const [filters, setFilters] = useState<DashboardFilters>({});
    const [filterOptions, setFilterOptions] =
        useState<DashboardFilterOptions | null>(null);
    const [isFilterLoading, setIsFilterLoading] = useState(true);

    useEffect(() => {
        async function loadFilterOptions() {
            try {
                setIsFilterLoading(true);
                const data = await fetchDashboardFilters();
                setFilterOptions(data);
            } catch (error) {
                console.error("Failed to load filter options", error);
            } finally {
                setIsFilterLoading(false);
            }
        }

        loadFilterOptions();
    }, []);

    function handleFilterChange(key: keyof DashboardFilters, value: string) {
        setFilters((currentFilters) => {
            const nextFilters = { ...currentFilters };

            if (value === "all") {
                delete nextFilters[key];
            } else {
                nextFilters[key] = value;
            }

            return nextFilters;
        });
    }

    function handleResetFilters() {
        setFilters({});
    }

    return (
        <DashboardShell
            filters={filters}
            filterOptions={filterOptions}
            isFilterLoading={isFilterLoading}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
        >
            <div className="mx-auto flex w-full lg:max-w-7xl flex-col gap-5">
                <OverviewSection filters={filters} />
                <TopicSection filters={filters} />
                <RegionSection filters={filters} />
                <SectorSection filters={filters} />
                <TimelineSection filters={filters} />
                <RecordsSection filters={filters} />
                <DataQualitySection filters={filters} />
            </div>
        </DashboardShell>
    );
}