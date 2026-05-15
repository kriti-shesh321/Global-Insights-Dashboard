"use client";

import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { chartColors } from "@/lib/chart-colors";

type SimpleLineChartProps = {
    data: Record<string, string | number>[];
    xKey: string;
    yKey: string;
    height?: number;
    color?: string;
};

export function SimpleLineChart({
    data,
    xKey,
    yKey,
    height = 260,
    color = chartColors.purple,
}: SimpleLineChartProps) {
    return (
        <div style={{ width: "100%", height }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                        opacity={0.5}
                    />

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
                        contentStyle={{
                            background: "var(--popover)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            color: "var(--popover-foreground)",
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey={yKey}
                        stroke={color}
                        strokeWidth={3}
                        dot={{
                            r: 4,
                            fill: color,
                            strokeWidth: 0,
                        }}
                        activeDot={{
                            r: 6,
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}