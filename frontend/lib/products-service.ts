import { medusaClient, getDefaultRegionId } from "@/lib/medusa-client";
import type { Product } from "@/types/product";

/**
 * Fetch all products from Medusa store
 * @param limit - Maximum number of products to fetch (default: 10)
 * @returns Array of products
 */
export async function getProducts(limit: number = 10): Promise<Product[]> {
  try {
    const regionId = await getDefaultRegionId();

    // Type assertion needed because SDK types don't include region_id and fields parameters
    const response = await medusaClient.store.product.list({
      limit,
      region_id: regionId,
      fields: "+variants.calculated_price,+variants.prices",
    } as Parameters<typeof medusaClient.store.product.list>[0]);

    if (response.products?.[0]?.variants?.[0]) {
    }

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
    const regionId = await getDefaultRegionId();

    // Note: Medusa API uses "handle" parameter, but it represents a URL slug
    // Type assertion needed because SDK types don't include region_id and fields parameters
    const response = await medusaClient.store.product.list({
      handle: slug,
      region_id: regionId,
      fields: "+variants.calculated_price,+variants.prices",
    } as Parameters<typeof medusaClient.store.product.list>[0]);
    const product = response.products?.[0];

    // Debug logging
    // ...removed log...
    if (product?.variants?.[0]) {
      // ...removed log...
    }

    return (product as Product) || null;
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
