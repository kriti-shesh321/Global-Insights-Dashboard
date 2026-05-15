"use client";

import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import { chartPalette } from "@/lib/chart-colors";

type SimpleDonutChartProps = {
    data: Record<string, string | number>[];
    nameKey: string;
    valueKey: string;
    height?: number;
    colors?: string[];
};

export function SimpleDonutChart({
    data,
    nameKey,
    valueKey,
    height = 240,
    colors = chartPalette,
}: SimpleDonutChartProps) {
    return (
        <div className="flex h-full flex-col justify-between gap-5">
            <div
                className="
          mx-auto
          w-full
          max-w-65
          sm:max-w-75
        "
                style={{ height }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Tooltip
                            contentStyle={{
                                background: "var(--popover)",
                                border: "1px solid var(--border)",
                                borderRadius: "6px",
                            }}
                        />

                        <Pie
                            data={data}
                            dataKey={valueKey}
                            nameKey={nameKey}
                            innerRadius={55}
                            outerRadius={90}
                            paddingAngle={2}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={colors[index % colors.length]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div
                className="
          grid
          gap-2
          sm:grid-cols-2
        "
            >
                {data.map((item, index) => {
                    const name = String(item[nameKey]);
                    const value = item[valueKey];

                    return (
                        <div
                            key={name}
                            className="
                            flex
                            items-center
                            justify-between
                            gap-3
                            rounded-sm
                            bg-muted/30
                            px-3
                            py-2
                            "
                        >
                            <div className="flex min-w-0 items-center gap-2">
                                <span
                                    className="h-2 w-2 shrink-0 rounded-full"
                                    style={{
                                        backgroundColor:
                                            colors[index % colors.length],
                                    }}
                                />

                                <span className="truncate text-xs text-muted-foreground">
                                    {name}
                                </span>
                            </div>

                            <span className="text-xs font-medium">
                                {value}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}