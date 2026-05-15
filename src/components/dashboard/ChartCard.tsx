import { ReactNode } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type ChartCardProps = {
    title: string;
    description?: string;
    children: ReactNode;
    className?: string;
    contentClassName?: string;
};

export function ChartCard({
    title,
    description,
    children,
    className,
    contentClassName,
}: ChartCardProps) {
    return (
        <Card
            className={[
                "border border-border/60 bg-card shadow-sm rounded-sm",
                className ?? "",
            ].join(" ")}
        >
            <CardHeader>
                <CardTitle className="text-base font-semibold">{title}</CardTitle>

                {description ? (
                    <CardDescription className="text-sm">{description}</CardDescription>
                ) : null}
            </CardHeader>

            <CardContent className={contentClassName}>{children}</CardContent>
        </Card>
    );
}