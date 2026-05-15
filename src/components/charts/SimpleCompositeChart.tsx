"use client";

import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type SimpleCompositeChartProps = {
    data: Record<string, string | number>[];

    xKey: string;

    barKey: string;
    lineKey: string;

    barColor?: string;
    lineColor?: string;

    height?: number;
};

export function SimpleCompositeChart({
    data,
    xKey,
    barKey,
    lineKey,
    barColor = "#635BFF",
    lineColor = "#28C76F",
    height = 300,
}: SimpleCompositeChartProps) {
    return (
        <div style={{ width: "100%", height }}>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: -15,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid
                        vertical={false}
                        strokeDasharray="4 4"
                        stroke="var(--chart-grid)"
                    />

                    <XAxis
                        dataKey={xKey}
                        tick={{
                            fill: "var(--chart-axis)",
                            fontSize: 11,
                        }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        tick={{
                            fill: "var(--chart-axis)",
                            fontSize: 11,
                        }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip
                        contentStyle={{
                            background: "var(--chart-tooltip-bg)",
                            border: "1px solid var(--border)",
                            borderRadius: "6px",
                        }}
                    />

                    <Bar
                        dataKey={barKey}
                        fill={barColor}
                        radius={[4, 4, 0, 0]}
                        barSize={28}
                    />

                    <Line
                        type="monotone"
                        dataKey={lineKey}
                        stroke={lineColor}
                        strokeWidth={2.5}
                        dot={false}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}