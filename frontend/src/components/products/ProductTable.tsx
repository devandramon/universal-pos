import type { Product } from '../../types/product'

interface ProductTableProps {
  products: Product[]
  loading: boolean
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
}

function formatCurrency(value: string | number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value))
}

function ProductTable({
  products,
  loading,
  onEdit,
  onDelete,
}: ProductTableProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Loading products...
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <p className="font-medium text-slate-700">
          No products found
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Try adding a new product.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-slate-900">
                  {product.name}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  SKU: {product.sku}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                  product.is_active
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {product.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-slate-400">
                  Category
                </p>

                <p className="mt-1 font-medium text-slate-700">
                  {product.category?.name ?? '-'}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Stock
                </p>

                <p
                  className={`mt-1 font-medium ${
                    Number(product.stock) <=
                    Number(product.minimum_stock)
                      ? 'text-red-600'
                      : 'text-slate-700'
                  }`}
                >
                  {product.stock} {product.unit}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Selling Price
                </p>

                <p className="mt-1 font-medium text-slate-700">
                  {formatCurrency(product.selling_price)}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Cost Price
                </p>

                <p className="mt-1 font-medium text-slate-700">
                  {formatCurrency(product.cost_price)}
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => onEdit(product)}
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(product.id)}
                className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-3 font-medium text-slate-500">
                  Product
                </th>

                <th className="px-5 py-3 font-medium text-slate-500">
                  SKU
                </th>

                <th className="px-5 py-3 font-medium text-slate-500">
                  Category
                </th>

                <th className="px-5 py-3 font-medium text-slate-500">
                  Selling Price
                </th>

                <th className="px-5 py-3 font-medium text-slate-500">
                  Stock
                </th>

                <th className="px-5 py-3 font-medium text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-right font-medium text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-900">
                      {product.name}
                    </p>

                    {product.barcode && (
                      <p className="mt-1 text-xs text-slate-400">
                        {product.barcode}
                      </p>
                    )}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {product.sku}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {product.category?.name ?? '-'}
                  </td>

                  <td className="px-5 py-4 font-medium text-slate-700">
                    {formatCurrency(product.selling_price)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={
                        Number(product.stock) <=
                        Number(product.minimum_stock)
                          ? 'font-medium text-red-600'
                          : 'text-slate-600'
                      }
                    >
                      {product.stock} {product.unit}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        product.is_active
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {product.is_active
                        ? 'Active'
                        : 'Inactive'}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(product)}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(product.id)}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
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
      </div>
    </>
  )
}

export default ProductTable