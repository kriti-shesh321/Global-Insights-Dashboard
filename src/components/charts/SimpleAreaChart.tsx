"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { chartColors } from "@/lib/chart-colors";

type SimpleAreaChartProps = {
    data: Record<string, string | number>[];
    xKey: string;
    yKey: string;
    height?: number;
    color?: string;
};

export function SimpleAreaChart({
    data,
    xKey,
    yKey,
    height = 240,
    color = chartColors.green,
}: SimpleAreaChartProps) {
    return (
        <div style={{ width: "100%", height }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: -20,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient
                            id={`gradient-${color.replace("#", "")}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor={color}
                                stopOpacity={0.35}
                            />

                            <stop
                                offset="100%"
                                stopColor={color}
                                stopOpacity={0.02}
                            />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--chart-grid)"
                        vertical={false}
                    />

                    <XAxis
                        dataKey={xKey}
                        tick={{
                            fill: "var(--muted-foreground)",
                            fontSize: 11,
                        }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        tick={{
                            fill: "var(--muted-foreground)",
                            fontSize: 11,
                        }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip
                        contentStyle={{
                            background: "var(--popover)",
                            border: "1px solid var(--border)",
                            borderRadius: "6px",
                            color: "var(--popover-foreground)",
                        }}
                    />

                    <Area
                        type="monotone"
                        dataKey={yKey}
                        stroke={color}
                        strokeWidth={2.5}
                        fill={`url(#gradient-${color.replace("#", "")})`}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}