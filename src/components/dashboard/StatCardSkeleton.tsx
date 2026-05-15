import { Skeleton } from "@/components/ui/skeleton";

export function StatCardSkeleton() {
    return (
        <div className="rounded-md border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-9 w-9 rounded-md" />
            </div>

            <Skeleton className="mt-6 h-8 w-24" />
            <Skeleton className="mt-2 h-3 w-36" />
        </div>
    );
}