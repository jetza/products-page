export interface ProductOption {
  id: string;
  title: string;
  metadata?: Record<string, unknown> | null;
  product_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface ProductOptionValue {
  id: string;
  value: string;
  metadata?: Record<string, unknown> | null;
  option_id: string;
  option: ProductOption;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface ProductPrice {
  amount: number;
  currency_code: string;
}

export interface CalculatedPrice {
  calculated_amount: number;
  calculated_price: {
    price_list_id?: string | null;
    price_list_type?: string | null;
    min_quantity?: number | null;
    max_quantity?: number | null;
  };
}

export interface ProductVariant {
  id: string;
  title: string;
  sku?: string;
  options?: ProductOptionValue[];
  prices?: ProductPrice[];
  calculated_price?: CalculatedPrice;
  inventory_quantity?: number;
}

export interface ProductImage {
  id: string;
  url: string;
}

export interface ProductCollection {
  id: string;
  title: string;
  handle: string;
}

export interface Product {
  id: string;
  title: string;
  handle: string; // URL slug
  description?: string;
  thumbnail?: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
  collection?: ProductCollection;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductListResponse {
  products: Product[];
  count: number;
  offset: number;
  limit: number;
}

/**
 * Type alias for better code readability
 */
export type ProductSlug = string;
