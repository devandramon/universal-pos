import {
  useEffect,
  useState,
} from 'react'

import type {
  ChangeEvent,
  FormEvent,
} from 'react'

import {
  productService,
} from '../../services/product'

import {
  categoryService,
} from '../../services/category'

import type {
  Product,
  ProductFormData,
} from '../../types/product'

import type {
  Category,
} from '../../types/category'

import ProductTable from '../../components/products/ProductTable'
import ProductForm from '../../components/products/ProductForm'

const emptyForm: ProductFormData = {
  category_id: '',
  sku: '',
  barcode: '',
  name: '',
  description: '',
  cost_price: 0,
  selling_price: 0,
  stock: 0,
  minimum_stock: 0,
  unit: 'pcs',
  image: '',
  is_active: true,
}

function Products() {
  const [products, setProducts] =
    useState<Product[]>([])

  const [categories, setCategories] =
    useState<Category[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const [search, setSearch] =
    useState('')

  const [categoryId, setCategoryId] =
    useState<number | ''>('')

  const [page, setPage] =
    useState(1)

  const [lastPage, setLastPage] =
    useState(1)

  const [total, setTotal] =
    useState(0)

  const [form, setForm] =
    useState<ProductFormData>(emptyForm)

  const [editingId, setEditingId] =
    useState<number | null>(null)

  const [submitting, setSubmitting] =
    useState(false)
  
  const [showForm, setShowForm] =
  useState(false)

  const loadCategories = async () => {
    try {
      const response =
        await categoryService.getAll()

      setCategories(response.data)
    } catch (error) {
      console.error(error)

      setError(
        'Failed to load categories.'
      )
    }
  }

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError('')

      const response =
        await productService.getAll({
          page,
          per_page: 10,
          search: search || undefined,
          category_id:
            categoryId === ''
              ? undefined
              : categoryId,
        })

      setProducts(response.data)
      setLastPage(response.last_page)
      setTotal(response.total)
    } catch (error) {
      console.error(error)

      setError(
        'Failed to load products.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    loadProducts()
  }, [page, categoryId])

const handleSearch = (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault()

  if (page !== 1) {
    setPage(1)
    return
  }

  loadProducts()
}

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
      type,
    } = event.target

    if (name === 'category_id') {
      setForm((previous) => ({
        ...previous,
        category_id: value
          ? Number(value)
          : '',
      }))

      return
    }

    if (
      type === 'checkbox'
    ) {
      setForm((previous) => ({
        ...previous,
        [name]: (
          event.target as HTMLInputElement
        ).checked,
      }))

      return
    }

    if (
      [
        'cost_price',
        'selling_price',
        'stock',
        'minimum_stock',
      ].includes(name)
    ) {
      setForm((previous) => ({
        ...previous,
        [name]: Number(value),
      }))

      return
    }

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    try {
      setSubmitting(true)
      setError('')

      if (editingId) {
        await productService.update(
          editingId,
          form
        )
      } else {
        await productService.create(
          form
        )
      }

      setForm(emptyForm)
      setEditingId(null)
      setShowForm(false)

      await loadProducts()
    } catch (error) {
      console.error(error)

      setError(
        'Failed to save product.'
      )
    } finally {
      setSubmitting(false)
    }
  }

const handleEdit = (
  product: Product
) => {
  setEditingId(product.id)

  setForm({
    category_id:
      product.category_id,

    sku: product.sku,

    barcode:
      product.barcode ?? '',

    name: product.name,

    description:
      product.description ?? '',

    cost_price:
      Number(product.cost_price),

    selling_price:
      Number(product.selling_price),

    stock:
      Number(product.stock),

    minimum_stock:
      Number(product.minimum_stock),

    unit: product.unit,

    image:
      product.image ?? '',

    is_active:
      product.is_active,
  })

  setShowForm(true)
}

  const handleDelete = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        'Are you sure you want to delete this product?'
      )

    if (!confirmed) {
      return
    }

    try {
      setError('')

      await productService.delete(id)

      await loadProducts()
    } catch (error) {
      console.error(error)

      setError(
        'Failed to delete product.'
      )
    }
  }

const handleCancel = () => {
  setEditingId(null)
  setForm(emptyForm)
  setShowForm(false)
}

const handleAdd = () => {
  setEditingId(null)
  setForm(emptyForm)
  setError('')
  setShowForm(true)
}

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <h1 className="text-2xl font-bold text-slate-900">
      Products
    </h1>

    <p className="mt-1 text-sm text-slate-500">
      Manage your products and inventory information.
    </p>
  </div>

  <button
    type="button"
    onClick={handleAdd}
    className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 sm:w-auto"
  >
    + Add Product
  </button>
</div>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Search & Filter */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 md:flex-row"
        >

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search product, SKU, barcode..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />

          <select
            value={categoryId}
            onChange={(event) => {
              const value =
                event.target.value

              setCategoryId(
                value
                  ? Number(value)
                  : ''
              )

              setPage(1)
            }}
            className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          >
            <option value="">
              All Categories
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
          </select>

          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Search
          </button>

        </form>

      </div>


      {/* Product Form */}
{showForm && (
  <ProductForm
    form={form}
    categories={categories}
    editingId={editingId}
    submitting={submitting}
    onChange={handleChange}
    onSubmit={handleSubmit}
    onCancel={handleCancel}
  />
)}

      {/* Product Table */}
      <ProductTable
        products={products}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      {lastPage > 1 && (
        <div className="flex items-center justify-between">

          <p className="text-sm text-slate-500">
            {total} products
          </p>

          <div className="flex gap-2">

            <button
              type="button"
              disabled={page <= 1}
              onClick={() =>
                setPage(
                  (previous) =>
                    previous - 1
                )
              }
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="flex items-center px-2 text-sm text-slate-600">
              {page} / {lastPage}
            </span>

            <button
              type="button"
              disabled={page >= lastPage}
              onClick={() =>
                setPage(
                  (previous) =>
                    previous + 1
                )
              }
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>

          </div>

        </div>
      )}

    </div>
  )
}

export default Products