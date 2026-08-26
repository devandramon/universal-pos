import type {
    Category,
} from "../../types/category";

interface CategoryTableProps {
    categories: Category[];
    loading: boolean;
    onEdit: (category: Category) => void;
    onDelete: (id: number) => void;
}

function CategoryTable({
    categories,
    loading,
    onEdit,
    onDelete,
}: CategoryTableProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="font-semibold text-slate-900">
                    Category List
                </h2>
            </div>

            {loading ? (
                <div className="p-6 text-sm text-slate-500">
                    Loading categories...
                </div>
            ) : categories.length === 0 ? (
                <div className="p-6 text-sm text-slate-500">
                    No categories found.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 font-semibold">
                                    Name
                                </th>

                                <th className="px-6 py-3 font-semibold">
                                    Slug
                                </th>

                                <th className="px-6 py-3 font-semibold">
                                    Status
                                </th>

                                <th className="px-6 py-3 text-right font-semibold">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.map((category) => (
                                <tr
                                    key={category.id}
                                    className="border-t border-slate-200"
                                >
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        {category.name}
                                    </td>

                                    <td className="px-6 py-4 text-slate-500">
                                        {category.slug}
                                    </td>

                                    <td className="px-6 py-4">
                                        {category.is_active ? (
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                                Inactive
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onEdit(category)
                                                }
                                                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onDelete(
                                                        category.id
                                                    )
                                                }
                                                className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default CategoryTable;