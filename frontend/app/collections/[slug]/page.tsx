import React from "react";
import Image from "next/image";
import { getProducts } from "@/lib/products-service";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { getProductColors, getProductPrice } from "@/lib/utils/product-utils";
import type { Product } from "@/types/product";
import { ProductCardProps } from "@/src/components/shop/ProductCard";
import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { COLLECTION_DETAILS } from "@/lib/constants/collection-details";

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = params;
  const collection = COLLECTION_DETAILS[slug as keyof typeof COLLECTION_DETAILS];

  if (!collection) {
    return <div>Collection not found</div>;
  }

  const allProducts = await getProducts(50);
  const collectionProducts = allProducts.filter(
    (product: Product) => product.collection?.handle === slug
  );

  const productCards: ProductCardProps[] = collectionProducts.map((product: Product) => ({
    id: product.id,
    title: product.title,
    collection: product.collection?.title || "",
    price: getProductPrice(product) / 100,
    currency: "€",
    image: product.images?.[0]?.url || product.thumbnail || "",
    imageAlt: product.title,
    slug: product.handle,
    colors: getProductColors(product),
  }));

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <ResponsiveHeader theme="transparent" />
      </div>

      <section className="relative">
        <div className="relative h-[500px] md:h-[600px]">
          <Image
            src={collection.heroImage}
            alt={collection.title}
            fill
            priority
            className="object-cover"
            quality={100}
          />
        </div>
        
        <div className="bg-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <h1 className="text-h2 md:text-h1 font-medium text-black mb-0">
                  {collection.title}:<br />
                  {collection.subtitle}
                </h1>
              </div>
              <div className="space-y-6">
                <p className="text-body md:text-big text-black">
                  {collection.description}
                </p>
                <p className="text-base md:text-body text-gray-700">
                  {collection.longDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-12">
            <h2 className="text-h3 md:text-h2 font-medium text-black mb-4 md:mb-0">
              {collection.title}
            </h2>
            
            <div className="hidden md:flex items-center gap-4">
              <span className="text-base text-gray-500">Category</span>
              <select className="px-4 py-2 border border-gray-300 rounded text-base">
                <option>All</option>
                <option>Sofas</option>
                <option>Chairs</option>
              </select>
              
              <span className="text-base text-gray-500">Type</span>
              <select className="px-4 py-2 border border-gray-300 rounded text-base">
                <option>All</option>
              </select>
              
              <span className="text-base text-gray-500">Sort by</span>
              <select className="px-4 py-2 border border-gray-300 rounded text-base">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            <div className="md:hidden flex items-center justify-between gap-3">
              <select className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm">
                <option>All Categories</option>
                <option>Sofas</option>
                <option>Chairs</option>
              </select>
              <select className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm">
                <option>Sort by</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {productCards.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-button-big text-gray-500">
                No products in this collection yet.
              </p>
            </div>
          ) : (
            <ProductGrid products={productCards} />
          )}
        </div>
      </section>
      <ResponsiveFooter />
    </div>
  );
}
