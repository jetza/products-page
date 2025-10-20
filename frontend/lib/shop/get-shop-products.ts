import { getProducts } from "@/lib/products-service";
import { ProductCardProps } from "@/components/shop/ProductCard";
import type { Product } from "@/types/product";
import { getProductColors, getProductPrice } from "@/lib/utils/product-utils";

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
      const priceInCents = getProductPrice(product);
      const colors = getProductColors(product);

      return {
        id: product.id,
        title: product.title,
        collection: product.collection?.title || "Furniture",
        price: priceInCents / 100,
        currency: "€",
        image,
        imageAlt: product.title,
        slug: product.handle,
        colors,
      };
    });
}
