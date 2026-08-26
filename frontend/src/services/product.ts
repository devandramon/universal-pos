import api from './api'

import type {
  Product,
  ProductFormData,
  ProductListResponse,
} from '../types/product'

interface ProductResponse {
  data: Product
}

interface ProductParams {
  page?: number
  per_page?: number
  search?: string
  category_id?: number
  is_active?: boolean
}

export const productService = {
  async getAll(
    params: ProductParams = {}
  ): Promise<ProductListResponse> {
    const response = await api.get<ProductListResponse>(
      '/products',
      {
        params,
      }
    )

    return response.data
  },

  async getById(id: number): Promise<Product> {
    const response = await api.get<ProductResponse>(
      `/products/${id}`
    )

    return response.data.data
  },

  async create(
    data: ProductFormData
  ): Promise<Product> {
    const response = await api.post<ProductResponse>(
      '/products',
      data
    )

    return response.data.data
  },

  async update(
    id: number,
    data: ProductFormData
  ): Promise<Product> {
    const response = await api.put<ProductResponse>(
      `/products/${id}`,
      data
    )

    return response.data.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/products/${id}`)
  },
}