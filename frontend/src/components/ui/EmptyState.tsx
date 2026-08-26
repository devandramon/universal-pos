interface EmptyStateProps {
    title?: string;
    description?: string;
}

function EmptyState({
    title = "No data found",
    description = "There is no data to display.",
}: EmptyStateProps) {
    return (
        <div className="flex min-h-40 flex-col items-center justify-center px-6 text-center">

            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                —
            </div>

            <h3 className="text-sm font-semibold text-slate-900">
                {title}
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
                {description}
            </p>

        </div>
    );
}

export default EmptyState;