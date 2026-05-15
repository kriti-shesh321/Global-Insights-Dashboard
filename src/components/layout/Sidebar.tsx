import {
    BarChart3,
    Database,
    Globe2,
    Home,
    Layers3,
    LineChart,
    Settings,
    Table2,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
    { label: "Overview", href: "#overview", icon: Home },
    { label: "Topics", href: "#topics", icon: BarChart3 },
    { label: "Regions", href: "#regions", icon: Globe2 },
    { label: "Sectors", href: "#sectors", icon: Layers3 },
    { label: "Timeline", href: "#timeline", icon: LineChart },
    { label: "Records", href: "#records", icon: Table2 },
    { label: "Data Quality", href: "#data-quality", icon: Database },
    { label: "Settings", href: "#", icon: Settings, disabled: true },
];

type SidebarProps = {
    className?: string;
};

export function Sidebar({ className }: SidebarProps) {
    return (
        <aside
            className={cn(
                "h-screen w-65 shrink-0 border-r bg-sidebar px-4 py-5",
                className
            )}
        >
            <div className="mb-8">
                <div className="flex items-center gap-2 p-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                        <BarChart3 className="h-5 w-5" />
                    </div>

                    <div>
                        <h1 className="text-base font-semibold leading-none">
                            InsightBoard
                        </h1>
                        <p className="mt-1 text-xs text-muted-foreground">
                            World Data dashboard
                        </p>
                    </div>
                </div>
            </div>

            <nav className="space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <a
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
                                item.disabled && "pointer-events-none opacity-50"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {item.label}
                        </a>
                    );
                })}
            </nav>
        </aside>
    );
}