import React from "react";
import { ShopClient } from "@/src/components/shop/ShopClient";
import { getShopProducts } from "@/src/lib/shop/get-shop-products";
import { CollectionsGrid } from "@/components/shop/CollectionsGrid";
import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { PageContainer } from "@/components/layout/PageContainer";
import { CONTENT } from "@/lib/constants/content";

export default async function ShopPage() {
  const shopItems = await getShopProducts();

  return (
    <>
      <ResponsiveHeader />
      <main className="flex-1 min-h-screen bg-white">
        <CollectionsGrid />

        <PageContainer className="py-12">
          <h1 className="text-h1 font-medium mb-12">{CONTENT.nav.shop}</h1>

          {shopItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-button-big text-gray-500">
                {CONTENT.common.noResults}
              </p>
            </div>
          ) : (
            <ShopClient products={shopItems} />
          )}
        </PageContainer>
      </main>
      <ResponsiveFooter />
    </>
  );
}
