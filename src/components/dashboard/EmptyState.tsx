import { Inbox } from "lucide-react";

type EmptyStateProps = {
    title?: string;
    description?: string;
};

export function EmptyState({
    title = "No data found",
    description = "Try changing or resetting the selected filters.",
}: EmptyStateProps) {
    return (
        <div className="flex min-h-55 flex-col items-center justify-center rounded-md border border-dashed bg-muted/30 p-6 text-center">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Inbox className="h-5 w-5" />
            </div>

            <h3 className="text-sm font-semibold">{title}</h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    );
}