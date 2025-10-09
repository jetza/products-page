export interface ProductVariantOption {
  Size?: string;
  Color?: string;
  Material?: string;
}

export interface ProductPrice {
  amount: number;
  currency_code: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  sku?: string;
  options?: ProductVariantOption;
  prices?: ProductPrice[];
  inventory_quantity?: number;
}

export interface ProductImage {
  id: string;
  url: string;
}

export interface Product {
  id: string;
  title: string;
  handle: string; // URL slug (e.g., "t-shirt", "sweatpants") - SEO-friendly identifier from Medusa
  description?: string;
  thumbnail?: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
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
 * Helper function to get product slug (alias for handle)
 * This provides a clearer semantic meaning when working with URLs
 */
export function getProductSlug(product: Product): string {
  return product.handle;
}

/**
 * Type alias for better code readability
 */
export type ProductSlug = string;
