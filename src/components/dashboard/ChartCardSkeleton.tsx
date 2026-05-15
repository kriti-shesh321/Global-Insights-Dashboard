import { Skeleton } from "@/components/ui/skeleton";

type ChartCardSkeletonProps = {
    className?: string;
};

export function ChartCardSkeleton({ className }: ChartCardSkeletonProps) {
    return (
        <div
            className={[
                "rounded-md border bg-card p-6 shadow-sm",
                className ?? "min-h-80",
            ].join(" ")}
        >
            <Skeleton className="h-5 w-40" />
            <Skeleton className="mt-2 h-4 w-64 max-w-full" />

            <div className="mt-8 space-y-4">
                <Skeleton className="h-5 w-11/12" />
                <Skeleton className="h-5 w-9/12" />
                <Skeleton className="h-5 w-10/12" />
                <Skeleton className="h-5 w-7/12" />
                <Skeleton className="h-5 w-8/12" />
            </div>
        </div>
    );
}