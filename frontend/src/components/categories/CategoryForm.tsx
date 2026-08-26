import type {
    CategoryFormData,
} from "../../types/category";

interface CategoryFormProps {
    form: CategoryFormData;
    editingId: number | null;
    submitting: boolean;
    onChange: (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => void;
    onSubmit: (
        event: React.FormEvent<HTMLFormElement>
    ) => void;
    onCancel: () => void;
}

function CategoryForm({
    form,
    editingId,
    submitting,
    onChange,
    onSubmit,
    onCancel,
}: CategoryFormProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    {editingId
                        ? "Edit Category"
                        : "Add Category"}
                </h2>

                <p className="text-sm text-slate-500">
                    {editingId
                        ? "Update category information."
                        : "Create a new product category."}
                </p>
            </div>

            <form
                onSubmit={onSubmit}
                className="grid gap-4 md:grid-cols-2"
            >
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        required
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                        placeholder="Food"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Slug
                    </label>

                    <input
                        type="text"
                        name="slug"
                        value={form.slug}
                        onChange={onChange}
                        required
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                        placeholder="food"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={onChange}
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                        placeholder="Category description..."
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="is_active"
                        checked={form.is_active}
                        onChange={onChange}
                    />

                    <label className="text-sm text-slate-700">
                        Active
                    </label>
                </div>

                <div className="flex justify-end gap-2 md:col-span-2">
                    {editingId && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={submitting}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {submitting
                            ? "Saving..."
                            : editingId
                            ? "Update Category"
                            : "Create Category"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CategoryForm;