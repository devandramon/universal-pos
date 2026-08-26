import api from './api'
import type {
  Category,
  CategoryFormData,
  CategoryListResponse,
} from '../types/category'

interface CategoryResponse {
  data: Category
}

export const categoryService = {
  async getAll(page = 1): Promise<CategoryListResponse> {
    const response = await api.get<CategoryListResponse>(
      `/categories?page=${page}`
    )

    return response.data
  },

  async getById(id: number): Promise<Category> {
    const response = await api.get<CategoryResponse>(
      `/categories/${id}`
    )

    return response.data.data
  },

  async create(data: CategoryFormData): Promise<Category> {
    const response = await api.post<CategoryResponse>(
      '/categories',
      data
    )

    return response.data.data
  },

  async update(
    id: number,
    data: CategoryFormData
  ): Promise<Category> {
    const response = await api.put<CategoryResponse>(
      `/categories/${id}`,
      data
    )

    return response.data.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/categories/${id}`)
  },
}