import {
    useEffect,
    useState,
} from "react";

import {
    categoryService,
} from "../../services/category";

import type {
    Category,
    CategoryFormData,
} from "../../types/category";

import CategoryForm from "../../components/categories/CategoryForm";
import CategoryTable from "../../components/categories/CategoryTable";
import Pagination from "../../components/ui/Pagination";

const emptyForm: CategoryFormData = {
    name: "",
    slug: "",
    description: "",
    is_active: true,
};

function Categories() {
    const [
        categories,
        setCategories,
    ] = useState<Category[]>([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        submitting,
        setSubmitting,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");

    const [
        form,
        setForm,
    ] = useState<CategoryFormData>(
        emptyForm
    );

    const [
        editingId,
        setEditingId,
    ] = useState<number | null>(null);

    const [
    currentPage,
    setCurrentPage,
] = useState(1);

const [
    lastPage,
    setLastPage,
] = useState(1);

const [
    total,
    setTotal,
] = useState(0);

    const loadCategories = async (
    page = 1
) => {
    try {
        setLoading(true);
        setError("");

        const response =
            await categoryService.getAll(page);

        setCategories(response.data);

        setCurrentPage(
            response.meta.current_page
        );

        setLastPage(
            response.meta.last_page
        );

        setTotal(
            response.meta.total
        );
    } catch (error) {
        console.error(error);

        setError(
            "Failed to load categories."
        );
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        loadCategories();
    }, []);

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
        >
    ) => {
        const {
            name,
            value,
            type,
        } = event.target;

        setForm((previous) => ({
            ...previous,

            [name]:
                type === "checkbox"
                    ? (
                        event.target as
                            HTMLInputElement
                    ).checked
                    : value,
        }));
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setSubmitting(true);
            setError("");

            if (editingId) {
                await categoryService.update(
                    editingId,
                    form
                );
            } else {
                await categoryService.create(
                    form
                );
            }

            setForm(emptyForm);
            setEditingId(null);

            await loadCategories(currentPage);
        } catch (error) {
            console.error(error);

            setError(
                "Failed to save category."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (
        category: Category
    ) => {
        setEditingId(category.id);

        setForm({
            name: category.name,
            slug: category.slug,
            description:
                category.description ?? "",
            is_active:
                category.is_active,
        });
    };

    const handleDelete = async (
        id: number
    ) => {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this category?"
            );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await categoryService.delete(
                id
            );

            await loadCategories(currentPage);
        } catch (error) {
            console.error(error);

            setError(
                "Failed to delete category."
            );
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setForm(emptyForm);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Categories
                </h1>

                <p className="text-sm text-slate-500">
                    Manage product categories.
                </p>
            </div>

            {error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            <CategoryForm
                form={form}
                editingId={editingId}
                submitting={submitting}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />

            <CategoryTable
                categories={categories}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="px-6 py-4 text-sm text-slate-500">
        Total categories: {total}
    </div>

    <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={loadCategories}
    />
</div>


        </div>
    );
}

export default Categories;