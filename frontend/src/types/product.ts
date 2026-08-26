export interface ProductCategory {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    category_id: number;

    sku: string;
    barcode: string | null;

    name: string;
    description: string | null;

    cost_price: string;
    selling_price: string;

    stock: string;
    minimum_stock: string;

    unit: string;

    image: string | null;

    is_active: boolean;

    category: ProductCategory;

    created_at: string;
    updated_at: string;
}

export interface ProductFormData {
    category_id: number | "";
    sku: string;
    barcode: string;
    name: string;
    description: string;
    cost_price: number;
    selling_price: number;
    stock: number;
    minimum_stock: number;
    unit: string;
    image: string;
    is_active: boolean;
}

export interface ProductListResponse {
    current_page: number;
    data: Product[];

    first_page_url: string;
    from: number | null;

    last_page: number;
    last_page_url: string;

    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];

    next_page_url: string | null;

    path: string;

    per_page: number;

    prev_page_url: string | null;

    to: number | null;

    total: number;
}