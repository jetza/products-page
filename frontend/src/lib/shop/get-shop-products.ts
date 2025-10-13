import { getProducts } from "@/lib/products-service";
import { ProductCardProps } from "@/src/components/shop/ProductCard";
import type { Product } from "@/types/product";

export async function getShopProducts(): Promise<ProductCardProps[]> {
  let medusaProducts: Product[];
  try {
    medusaProducts = await getProducts(50);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }

  return medusaProducts
    .filter((product) => {
      return product.id && product.title && product.handle;
    })
    .map((product) => {
      const image = product.images?.[0]?.url || product.thumbnail || "";
      const price = product.variants?.[0]?.prices?.[0]?.amount || 0;
      const currencyCode = product.variants?.[0]?.prices?.[0]?.currency_code || "eur";
      const currencySymbol = currencyCode.toLowerCase() === "eur" ? "€" : "$";

      return {
        id: product.id,
        title: product.title,
        collection: product.variants?.[0]?.title || "",
        price: price / 100,
        currency: currencySymbol,
        image,
        imageAlt: product.title,
        slug: product.handle,
      };
    });
}
