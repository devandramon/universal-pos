import type {
    ChangeEvent,
    FormEvent,
} from "react";

import type {
    ProductFormData,
} from "../../types/product";

import type {
    Category,
} from "../../types/category";

import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

interface ProductFormProps {
    form: ProductFormData;

    categories: Category[];

    editingId: number | null;

    submitting: boolean;

    onChange: (
        event: ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => void;

    onSubmit: (
        event: FormEvent<HTMLFormElement>
    ) => void;

    onCancel: () => void;
}

function ProductForm({
    form,
    categories,
    editingId,
    submitting,
    onChange,
    onSubmit,
    onCancel,
}: ProductFormProps) {

    return (
        <form
            onSubmit={onSubmit}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >

            <div className="mb-5">

                <h2 className="font-semibold text-slate-900">
                    {editingId
                        ? "Edit Product"
                        : "Add Product"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    {editingId
                        ? "Update product information."
                        : "Create a new product."}
                </p>

            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                <Input
                    id="name"
                    name="name"
                    label="Product Name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Enter product name"
                    required
                />

                <Input
                    id="sku"
                    name="sku"
                    label="SKU"
                    value={form.sku}
                    onChange={onChange}
                    placeholder="PRD-001"
                    required
                />

                <Input
                    id="barcode"
                    name="barcode"
                    label="Barcode"
                    value={form.barcode}
                    onChange={onChange}
                    placeholder="Optional"
                />

                <Select
                    id="category_id"
                    name="category_id"
                    label="Category"
                    value={form.category_id}
                    onChange={onChange}
                    required
                >
                    <option value="">
                        Select category
                    </option>

                    {categories.map(
                        (category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        )
                    )}

                </Select>

                <Input
                    id="cost_price"
                    name="cost_price"
                    type="number"
                    label="Cost Price"
                    value={form.cost_price}
                    onChange={onChange}
                    min="0"
                    required
                />

                <Input
                    id="selling_price"
                    name="selling_price"
                    type="number"
                    label="Selling Price"
                    value={form.selling_price}
                    onChange={onChange}
                    min="0"
                    required
                />

                <Input
                    id="stock"
                    name="stock"
                    type="number"
                    label="Stock"
                    value={form.stock}
                    onChange={onChange}
                    min="0"
                    step="0.01"
                />

                <Input
                    id="minimum_stock"
                    name="minimum_stock"
                    type="number"
                    label="Minimum Stock"
                    value={form.minimum_stock}
                    onChange={onChange}
                    min="0"
                    step="0.01"
                />

                <Select
                    id="unit"
                    name="unit"
                    label="Unit"
                    value={form.unit}
                    onChange={onChange}
                >
                    <option value="pcs">
                        Pieces (pcs)
                    </option>

                    <option value="box">
                        Box
                    </option>

                    <option value="kg">
                        Kilogram (kg)
                    </option>

                    <option value="gram">
                        Gram
                    </option>

                    <option value="liter">
                        Liter
                    </option>

                    <option value="meter">
                        Meter
                    </option>

                </Select>

                <div className="flex items-center gap-3 pt-7">

                    <input
                        id="is_active"
                        name="is_active"
                        type="checkbox"
                        checked={form.is_active}
                        onChange={onChange}
                        className="h-4 w-4 rounded border-slate-300"
                    />

                    <label
                        htmlFor="is_active"
                        className="text-sm font-medium text-slate-700"
                    >
                        Active Product
                    </label>

                </div>

                <div className="md:col-span-2">

                    <label
                        htmlFor="description"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={onChange}
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                        placeholder="Product description"
                    />

                </div>

            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                {editingId && (
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                )}

                <Button
                    type="submit"
                    loading={submitting}
                >
                    {editingId
                        ? "Update Product"
                        : "Create Product"}
                </Button>

            </div>

        </form>
    );
}

export default ProductForm;