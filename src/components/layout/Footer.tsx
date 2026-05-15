export function Footer() {
    return (
        <footer className="border-t px-4 py-3 text-sm text-muted-foreground md:px-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <p>Data Source: Global Insights Dataset</p>
                <p>Built with Next.js, MongoDB, Tailwind, shadcn/ui and Recharts.</p>
            </div>
        </footer>
    );
}