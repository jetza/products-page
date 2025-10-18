import Medusa from "@medusajs/js-sdk"

export const medusaClient = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
})

// Cache for region ID
let cachedRegionId: string | null = null;

/**
 * Get the default region ID for pricing
 * This is required for Medusa v2 to calculate prices
 */
export async function getDefaultRegionId(): Promise<string> {
  if (cachedRegionId) {
    return cachedRegionId;
  }

  try {
    const response = await medusaClient.store.region.list();
    const regions = response.regions || [];
    
    if (regions.length === 0) {
      console.warn("No regions found in Medusa store");
      return "";
    }

    // Find EUR region or use first available
    const eurRegion = regions.find(r => r.currency_code === "eur");
    cachedRegionId = eurRegion?.id || regions[0].id;
    
    return cachedRegionId;
  } catch (error) {
    console.error("Error fetching regions:", error);
    return "";
  }
}
