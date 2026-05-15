import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type StatCardProps = {
    title: string;
    value: string | number;
    icon: LucideIcon;
    className?: string;
    iconColor?: string;
};

export function StatCard({
    title,
    value,
    icon: Icon,
    className,
    iconColor = "var(--primary)",
}: StatCardProps) {
    return (
        <div
            className={cn(
                "border border-border/60 bg-card px-4 py-4 shadow-sm rounded-sm",
                className
            )}
        >
            <div className="grid grid-cols-[0.5fr_1fr] items-end justify-self-start gap-x-3">
                <div className="grid grid-cols-2 items-center justify-between">
                    <div
                        className="flex h-15 w-15 items-center justify-center rounded-sm bg-primary/10 text-primary"
                        style={{
                            backgroundColor: `${iconColor}18`,
                            color: iconColor,
                        }}
                    >
                        <Icon className="size-7" />
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                        {value}
                    </h3>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {title}
                    </p>
                </div>


            </div>
        </div>
    );
}