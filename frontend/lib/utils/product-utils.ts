import type { Product } from "@/types/product";

/**
 * Helper function to get product slug (alias for handle)
 * This provides a clearer semantic meaning when working with URLs
 */
export function getProductSlug(product: Product): string {
  return product.handle;
}

/**
 * Extract unique color values from product variants
 */
export function getProductColors(product: Product): string[] {
  if (!product.variants) return [];

  const colors = product.variants
    .flatMap((variant) => variant.options || [])
    .filter((option) => option.option.title === "Color")
    .map((option) => option.value);

  return Array.from(new Set(colors));
}

/**
 * Extract unique size values from product variants
 */
export function getProductSizes(product: Product): string[] {
  if (!product.variants) return [];

  const sizes = product.variants
    .flatMap((variant) => variant.options || [])
    .filter((option) => option.option.title === "Size")
    .map((option) => option.value);

  return Array.from(new Set(sizes));
}

/**
 * Extract unique material values from product variants
 */
export function getProductMaterials(product: Product): string[] {
  if (!product.variants) return [];

  const materials = product.variants
    .flatMap((variant) => variant.options || [])
    .filter((option) => option.option.title === "Material")
    .map((option) => option.value);

  return Array.from(new Set(materials));
}

/**
 * Get product price from first variant
 * Handles both Medusa v1 (prices array) and v2 (calculated_price)
 * @returns Price in cents (e.g., 120000 = 1200.00 EUR)
 */
export function getProductPrice(product: Product): number {
  const firstVariant = product.variants?.[0];
  if (!firstVariant) return 0;

  // Try calculated_price first (Medusa v2)
  if (firstVariant.calculated_price?.calculated_amount) {
    return firstVariant.calculated_price.calculated_amount;
  }

  // Fall back to prices array (Medusa v1 or if prices are set)
  if (firstVariant.prices?.[0]?.amount) {
    return firstVariant.prices[0].amount;
  }

  return 0;
}

/**
 * Format price for display
 * @param priceInCents - Price in cents
 * @param currency - Currency symbol (default: €)
 * @returns Formatted price string (e.g., "€1,200.00")
 */
export function formatPrice(
  priceInCents: number,
  currency: string = "€",
): string {
  const priceInUnits = priceInCents / 100;
  return `${currency}${priceInUnits.toFixed(2)}`;
}
