"use client";

import {
    PolarAngleAxis,
    PolarGrid,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import { chartColors } from "@/lib/chart-colors";

type SimpleRadarChartProps = {
    data: Record<string, string | number>[];
    dataKey: string;
    angleKey: string;
    height?: number;
    color?: string;
};

export function SimpleRadarChart({
    data,
    dataKey,
    angleKey,
    height = 300,
    color = chartColors.roseSoft,
}: SimpleRadarChartProps) {
    return (
        <div style={{ width: "100%", height }}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data}>
                    <PolarGrid stroke="var(--chart-grid)" />

                    <PolarAngleAxis
                        dataKey={angleKey}
                        tick={{
                            fill: "var(--muted-foreground)",
                            fontSize: 11,
                        }}
                    />

                    <Tooltip
                        contentStyle={{
                            background: "var(--popover)",
                            border: "1px solid var(--border)",
                            borderRadius: "6px",
                        }}
                    />

                    <Radar
                        dataKey={dataKey}
                        stroke={color}
                        fill={color}
                        fillOpacity={0.35}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}