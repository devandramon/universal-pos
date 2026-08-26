export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CategoryFormData {
  name: string
  slug: string
  description: string
  is_active: boolean
}

export interface PaginationMeta {
  current_page: number
  from: number | null
  last_page: number
  per_page: number
  to: number | null
  total: number
}

export interface CategoryListResponse {
  data: Category[]
  meta: PaginationMeta
  links: {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
  }
}