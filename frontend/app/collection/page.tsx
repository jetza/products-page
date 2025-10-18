import React from "react";
import Image from "next/image";
import { getProducts } from "@/lib/products-service";
import { getProductColors, getProductPrice } from "@/lib/utils/product-utils";
import type { Product } from "@/types/product";
import { ProductCardProps } from "@/src/components/shop/ProductCard";
import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { CollectionClient } from "@/components/collections/CollectionClient";

export default async function CollectionsPage() {
  const allProducts = await getProducts(50);
  
  const displayProducts = allProducts.slice(0, 4);

  const productCards: ProductCardProps[] = displayProducts.map((product: Product) => ({
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
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <ResponsiveHeader theme="transparent" />
      </div>
      
      <div className="min-h-screen bg-white">
        <section className="relative h-[300px] md:h-[500px] lg:h-[600px]">
          <Image
            src="/Hero/Hero-collection.png"
            alt="Collections"
            fill
            priority
            className="object-cover"
            quality={100}
          />
        </section>
        
        <section className="bg-white">
          <div className="px-5">
            <div className="mx-auto px-4 lg:px-24 py-12 lg:py-16">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                <div className="lg:w-[60%]">
                  <h1 className="text-h3 lg:text-h2 font-semibold text-black leading-tight">
                    Scandinavian Simplicity:<br />
                    Effortless elegance, timeless comfort
                  </h1>
                </div>
                <div className="lg:w-[40%] space-y-6 pt-[72px]">
                  <p className="text-body text-gray-700 leading-relaxed">
                    Minimalistic designs, neutral colors, and high-quality textures. Perfect for those who seek comfort with a clean and understated aesthetic.
                  </p>
                  <p className="text-body text-gray-700 leading-relaxed">
                    This collection brings the essence of Scandinavian elegance to your living room.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CollectionClient products={productCards} collectionTitle="Scandinavian Simplicity" />
      </div>
      <ResponsiveFooter />
    </>
  );
}
