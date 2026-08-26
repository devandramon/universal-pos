interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

function Pagination({
    currentPage,
    lastPage,
    onPageChange,
}: PaginationProps) {
    if (lastPage <= 1) {
        return null;
    }

    return (
        <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Previous
            </button>

            <div className="flex justify-center gap-1 overflow-x-auto">

                {Array.from(
                    { length: lastPage },
                    (_, index) => index + 1
                ).map((page) => (
                    <button
                        key={page}
                        type="button"
                        onClick={() =>
                            onPageChange(page)
                        }
                        className={`min-w-9 rounded-lg px-3 py-2 text-sm font-medium ${
                            currentPage === page
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                        {page}
                    </button>
                ))}

            </div>

            <button
                type="button"
                disabled={currentPage === lastPage}
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Next
            </button>

        </div>
    );
}

export default Pagination;