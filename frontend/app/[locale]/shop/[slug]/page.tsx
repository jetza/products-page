import { getProductBySlug, getProducts } from "@/lib/products-service";
import { notFound } from "next/navigation";
import type { Product } from "@/types/product";
import { getProductColors, getProductPrice } from "@/lib/utils/product-utils";
import { ProductCardProps } from "@/components/shop/ProductCard";
import { ProductPageClient } from "@/components/product/ProductPageClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch product data on server side
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  // Fetch related products on server side
  const allProducts = await getProducts(20);
  const relatedProducts: ProductCardProps[] = allProducts
    .filter(
      (p: Product) =>
        p.id !== product.id && p.collection?.id === product.collection?.id,
    )
    .slice(0, 3)
    .map((p: Product) => ({
      id: p.id,
      title: p.title,
      collection: p.collection?.title || "",
      price: getProductPrice(p) / 100,
      currency: "€",
      image: p.images?.[0]?.url || p.thumbnail || "",
      imageAlt: p.title,
      slug: p.handle,
      colors: getProductColors(p),
    }));

  return <ProductPageClient product={product} relatedProducts={relatedProducts} />;
}
