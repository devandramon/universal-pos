interface LoadingProps {
    text?: string;
}

function Loading({
    text = "Loading...",
}: LoadingProps) {
    return (
        <div className="flex min-h-40 items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-slate-500">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />

                <span>{text}</span>
            </div>
        </div>
    );
}

export default Loading;