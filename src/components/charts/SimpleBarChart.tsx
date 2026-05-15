"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { chartColors } from "@/lib/chart-colors";

type SimpleBarChartProps = {
    data: Record<string, string | number>[];
    xKey: string;
    yKey: string;
    layout?: "vertical" | "horizontal";
    height?: number;
    color?: string;
    barSize?: number;
};

export function SimpleBarChart({
    data,
    xKey,
    yKey,
    layout = "horizontal",
    height = 260,
    color = chartColors.teal,
    barSize = 22,
}: SimpleBarChartProps) {
    const isVertical = layout === "vertical";

    return (
        <div style={{ width: "100%", height }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    layout={isVertical ? "vertical" : "horizontal"}
                    margin={{
                        top: 10,
                        right: 20,
                        left: isVertical ? 10 : 0,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        horizontal={false}
                    />

                    {isVertical ? (
                        <>
                            <XAxis
                                type="number"
                                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                dataKey={yKey}
                                type="category"
                                width={80}
                                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: "var(--muted)" }}
                                contentStyle={{
                                    background: "var(--popover)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "12px",
                                    color: "var(--popover-foreground)",
                                }}
                            />
                            <Bar dataKey={xKey} fill={color} radius={[0, 8, 8, 0]} barSize={barSize}/>
                        </>
                    ) : (
                        <>
                            <XAxis
                                dataKey={xKey}
                                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: "var(--muted)" }}
                                contentStyle={{
                                    background: "var(--popover)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "12px",
                                    color: "var(--popover-foreground)",
                                }}
                            />
                            <Bar dataKey={yKey} fill={color} radius={[8, 8, 0, 0]} barSize={barSize}/>
                        </>
                    )}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}