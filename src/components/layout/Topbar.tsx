import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/Sidebar";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { DashboardFilterOptions, DashboardFilters } from "@/types/dashboard";

type TopbarProps = {
    filters: DashboardFilters;
    filterOptions: DashboardFilterOptions | null;
    isFilterLoading?: boolean;
    onFilterChange: (key: keyof DashboardFilters, value: string) => void;
    onResetFilters: () => void;
};

export function Topbar({
    filters,
    filterOptions,
    isFilterLoading = false,
    onFilterChange,
    onResetFilters,
}: TopbarProps) {
    return (
        <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur-xl">
            <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 md:px-6">
                <div className="flex justify-start">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden font-bold"
                            >
                                <Menu className="h-6 w-5" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="left" className="w-72 p-0">
                            <SheetTitle className="sr-only">
                                Dashboard navigation
                            </SheetTitle>
                            <Sidebar className="border-r-0" />
                        </SheetContent>
                    </Sheet>
                    <div>

                        <div className="flex items-center gap-3">


                            <h2 className="text-lg font-semibold tracking-tight md:text-xl">
                                Analytics Dashboard
                            </h2>

                            <Badge variant="secondary" className="hidden md:inline-flex">
                                MongoDB Connected
                            </Badge>
                        </div>

                        <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
                            Explore trends across topics, regions, sectors, and PESTLE factors.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <FilterBar
                        filters={filters}
                        options={filterOptions}
                        isLoading={isFilterLoading}
                        onFilterChange={onFilterChange}
                        onReset={onResetFilters}
                    />

                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}