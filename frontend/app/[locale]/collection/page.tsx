import React from "react";
import Image from "next/image";
import { getProducts } from "@/lib/products-service";
import { getProductColors, getProductPrice } from "@/lib/utils/product-utils";
import type { Product } from "@/types/product";
import { ProductCardProps } from "@/src/components/shop/ProductCard";
import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { CollectionClient } from "@/components/collections/CollectionClient";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";

export default async function CollectionsPage() {
  const allProducts = await getProducts(50);

  // Filter products by collection "Scandinavian Simplicity"
  const collectionProducts = allProducts.filter(
    (product: Product) =>
      product.collection?.title === "Scandinavian Simplicity",
  );

  const productCards: ProductCardProps[] = collectionProducts.map(
    (product: Product) => ({
      id: product.id,
      title: product.title,
      collection: product.collection?.title || "",
      price: getProductPrice(product) / 100,
      currency: "€",
      image: product.images?.[0]?.url || product.thumbnail || "",
      imageAlt: product.title,
      slug: product.handle,
      colors: getProductColors(product),
    }),
  );

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
                <FadeInOnScroll variant="fade-right" duration={900}>
                  <div className="lg:w-[60%]">
                    <h1 className="text-h3 lg:text-h2 font-semibold text-black leading-tight">
                      Scandinavian Simplicity:
                      <br />
                      Effortless elegance, timeless comfort
                    </h1>
                  </div>
                </FadeInOnScroll>
                <FadeInOnScroll variant="fade-left" duration={900} delay={200}>
                  <div className="lg:w-[40%] space-y-6 pt-[72px]">
                      <p className="text-body text-gray-700 leading-relaxed">
                        Doživite suštinu skandinavske elegancije kroz kolekciju koja spaja jednostavnost, funkcionalnost i bezvremenski stil. Ova linija nameštaja osmišljena je za one koji cene miran ambijent, pročišćene linije i suptilnu sofisticiranost u svakom kutku svog doma.
                      </p>
                      <p className="text-body text-gray-700 leading-relaxed">
                        Uživajte u prostoru koji odiše nenametljivom lepotom i udobnošću koja traje. Skandinavski dizajn je poznat po svojoj sposobnosti da stvori atmosferu opuštenosti i topline, bez viška detalja, ali sa pažljivo biranim elementima koji podižu kvalitet svakodnevnog života.
                      </p>
                      <p className="text-body text-gray-700 leading-relaxed">
                        Kolekcija se odlikuje minimalističkim formama koje unose red i harmoniju u enterijer. Neutralne boje – od nežnih bež tonova, preko toplih sivih, do klasične bele – omogućavaju lako uklapanje sa različitim stilovima i dekoracijama. Svaki komad izrađen je od vrhunskih materijala, sa naglaskom na teksture koje pozivaju na dodir i pružaju osećaj luksuza.
                      </p>
                      <p className="text-body text-gray-700 leading-relaxed">
                        Idealna za one koji žele da njihov dom bude utočište mira, udobnosti i jednostavne lepote. Skandinavska filozofija dizajna stavlja akcenat na funkcionalnost, ali ne zanemaruje estetiku – svaki detalj je promišljen, svaki oblik ima svoju svrhu, a svaki materijal doprinosi ukupnom osećaju prijatnosti.
                      </p>
                      <p className="text-body text-gray-700 leading-relaxed">
                        Unesite duh severa u svoj dnevni boravak. Ova kolekcija transformiše prostor u oazu svetlosti, prostranosti i topline, inspirišući vas da uživate u svakom trenutku kod kuće. Bilo da se opuštate sami, provodite vreme sa porodicom ili primate goste, Scandinavian Simplicity kolekcija stvara savršenu pozadinu za život ispunjen stilom i udobnošću.
                      </p>
                  </div>
                </FadeInOnScroll>
              </div>
            </div>
          </div>
        </section>

        <FadeInOnScroll variant="fade-up" duration={800}>
          <CollectionClient
            products={productCards}
            collectionTitle="Scandinavian Simplicity"
          />
        </FadeInOnScroll>
      </div>
      <ResponsiveFooter />
    </>
  );
}
