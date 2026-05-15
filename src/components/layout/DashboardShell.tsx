import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import {
    DashboardFilterOptions,
    DashboardFilters,
} from "@/types/dashboard";

type DashboardShellProps = {
    children: React.ReactNode;
    filters: DashboardFilters;
    filterOptions: DashboardFilterOptions | null;
    isFilterLoading?: boolean;
    onFilterChange: (key: keyof DashboardFilters, value: string) => void;
    onResetFilters: () => void;
};

export function DashboardShell({
    children,
    filters,
    filterOptions,
    isFilterLoading = false,
    onFilterChange,
    onResetFilters,
}: DashboardShellProps) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="flex">
                <Sidebar className="sticky top-0 hidden lg:block" />

                <div className="flex min-h-screen min-w-0 flex-1 flex-col">
                    <Topbar
                        filters={filters}
                        filterOptions={filterOptions}
                        isFilterLoading={isFilterLoading}
                        onFilterChange={onFilterChange}
                        onResetFilters={onResetFilters}
                    />

                    <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">
                        {children}
                    </main>

                    <Footer />
                </div>
            </div>
        </div>
    );
}