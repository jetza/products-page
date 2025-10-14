import React from "react";
import { ShopClient } from "@/src/components/shop/ShopClient";
import { getShopProducts } from "@/src/lib/shop/get-shop-products";
import { CollectionsCarousel } from "@/components/shop/CollectionsCarousel";
import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";

export default async function ShopPage() {
  const shopItems = await getShopProducts();

  return (
    <>
      <ResponsiveHeader />
      <main className="flex-1 min-h-screen bg-white">
        <CollectionsCarousel />

        <div className="max-w-7xl mx-auto px-8 py-12">
          <h1 className="text-h1 font-medium mb-12">Shop</h1>

          {shopItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-button-big text-gray-500">
                No products available.
              </p>
            </div>
          ) : (
            <ShopClient products={shopItems} />
          )}
        </div>
      </main>
      <ResponsiveFooter />
    </>
  );
}
