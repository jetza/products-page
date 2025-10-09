import { medusaClient } from "@/lib/medusa-client";
import type { Product } from "@/types/product";

/**
 * Fetch all products from Medusa store
 * @param limit - Maximum number of products to fetch (default: 10)
 * @returns Array of products
 */
export async function getProducts(limit: number = 10): Promise<Product[]> {
  try {
    const response = await medusaClient.store.product.list({ limit });
    return (response.products || []) as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Fetch a single product by its URL slug
 * @param slug - Product URL slug (e.g., "t-shirt", "sweatpants") - the SEO-friendly identifier
 * @returns Product or null if not found
 * @note Internally uses Medusa's "handle" field, which represents the same concept
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    // Note: Medusa API uses "handle" parameter, but it represents a URL slug
    const response = await medusaClient.store.product.list({ handle: slug });
    return (response.products?.[0] as Product) || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

/**
 * @deprecated Use getProductBySlug instead
 * Legacy alias for backward compatibility
 */
export const getProductByHandle = getProductBySlug;

/**
 * Fetch a single product by its ID
 * @param id - Product ID
 * @returns Product or null if not found
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await medusaClient.store.product.retrieve(id);
    return response.product as Product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
}
