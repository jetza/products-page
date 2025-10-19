"use client";

import { getProductBySlug, getProducts } from "@/lib/products-service";
import { notFound } from "next/navigation";
import { ColorPicker } from "@/components/ui/ColorPicker";
import { MaterialsSelect } from "@/components/ui/MaterialsSelect";
import { AddToCartSection } from "@/components/ui/AddToCartSection";
import { Notification } from "@/components/ui/Notification";
import { useCart } from "@/lib/cart-context";
import { useState, useEffect } from "react";
import type { Product } from "@/types/product";
import {
  getProductColors,
  getProductMaterials,
  getProductPrice,
} from "@/lib/utils/product-utils";
import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { ProductImageCarousel } from "@/components/product/ProductImageCarousel";
import { CollectionInspiredInterior } from "@/components/product/CollectionInspiredInterior";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ProductCardProps } from "@/components/shop/ProductCard";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";

import React from "react";
export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductCardProps[]>(
    [],
  );
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();
  const [notificationOpen, setNotificationOpen] = useState(false);

  const unwrappedParams = React.use(params);
  useEffect(() => {
    (async () => {
      const prod = await getProductBySlug(unwrappedParams.slug);
      if (!prod) {
        notFound();
      }
      setProduct(prod);

      const allProducts = await getProducts(20);
      const related = allProducts
        .filter(
          (p: Product) =>
            p.id !== prod.id && p.collection?.id === prod.collection?.id,
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
      setRelatedProducts(related);
    })();
  }, [unwrappedParams]);

  const colors = product ? getProductColors(product) : [];
  const materials = product ? getProductMaterials(product) : [];

  const handleAddToCart = () => {
    if (!product) return;
    let variantText = "";
    const matchingVariant = product.variants?.find((variant) => {
      const variantOptions = variant.options || [];
      const colorMatch =
        !selectedColor ||
        variantOptions.some(
          (opt) => opt.option.title === "Color" && opt.value === selectedColor,
        );
      const materialMatch =
        !selectedMaterial ||
        variantOptions.some(
          (opt) =>
            opt.option.title === "Material" && opt.value === selectedMaterial,
        );
      return colorMatch && materialMatch;
    });
    if (matchingVariant?.options) {
      const parts = matchingVariant.options.map((opt) => opt.value);
      variantText = parts.join(" / ");
    } else if (product.variants?.[0]?.options) {
      const options = product.variants[0].options;
      const parts = options.map((opt) => opt.value);
      variantText = parts.join(" / ");
    }
    addToCart(
      {
        id: product.id,
        title: product.title,
        variant: variantText || undefined,
        price: getProductPrice(product) / 100,
        image:
          product.thumbnail ||
          "https://placehold.co/80x80/e7e7e7/666?text=Product",
        imageAlt: product.title,
      },
      quantity,
    );
    setNotificationOpen(true);
  };

  return (
    <>
      <Notification
        message="Added to cart successfully!"
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        duration={2000}
      />
      <div className="fixed top-0 left-0 right-0 z-50">
        <ResponsiveHeader />
      </div>
      <main className="min-h-screen bg-white pt-[72px] lg:pt-[88px]">
        {!product ? (
          <LoadingOverlay />
        ) : (
          <>
            {(() => {
              let carouselImages = [];
              if (product.images && product.images.length > 0) {
                if (product.images.length === 1) {
                  carouselImages = [
                    {
                      url: product.images[0].url,
                      alt: `${product.title} - Image 1`,
                    },
                    {
                      url: product.images[0].url,
                      alt: `${product.title} - Image 2`,
                    },
                  ];
                } else {
                  carouselImages = product.images.map((img, index) => ({
                    url: img.url || `/Products/sofa${index + 1}.png`,
                    alt: `${product.title} - Image ${index + 1}`,
                  }));
                }
              } else {
                carouselImages = Array.from({ length: 4 }, (_, index) => ({
                  url: `/Products/sofa${index + 1}.png`,
                  alt: `${product.title} - Image ${index + 1}`,
                }));
              }
              return (
                <>
                  <div className="lg:px-5">
                    <div className="lg:px-24 lg:py-6 md:lg:py-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 mb-12 md:mb-20">
                        <div className="w-full">
                          {carouselImages.length === 0 ? (
                            <div className="bg-red-100 p-4 text-red-800">
                              No images found! CarouselImages array is empty.
                            </div>
                          ) : (
                            <ProductImageCarousel images={carouselImages} />
                          )}
                        </div>
                        <div className="px-8 md:px-5 lg:px-0 py-6 md:py-8 lg:py-0 flex flex-col h-full lg:justify-between">
                          <div>
                            <p className="text-xs md:text-sm text-gray-500 mb-2">
                              {product.collection?.title || "Product"}
                            </p>
                            <h1 className="text-h3 md:text-h2 font-semibold mb-4">
                              {product.title}
                            </h1>
                            <p className="text-big md:text-h4 font-semibold text-black mb-6">
                              €{Math.round(getProductPrice(product) / 100)}
                            </p>
                            <p className="text-sm md:text-body text-gray-600 mb-8 leading-relaxed">
                              {product.description}
                            </p>
                          </div>
                          <div className="space-y-8">
                            {materials.length > 0 && (
                              <MaterialsSelect
                                materials={materials}
                                selectedMaterial={selectedMaterial}
                                onMaterialSelect={setSelectedMaterial}
                              />
                            )}
                            {colors.length > 0 && (
                              <ColorPicker
                                colors={colors}
                                selectedColor={selectedColor}
                                onColorSelect={setSelectedColor}
                              />
                            )}
                            <AddToCartSection
                              quantity={quantity}
                              onQuantityDecrease={() =>
                                setQuantity(Math.max(1, quantity - 1))
                              }
                              onQuantityIncrease={() =>
                                setQuantity(quantity + 1)
                              }
                              onAddToCart={handleAddToCart}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CollectionInspiredInterior
                    title={`The ${product.title} sofa is a masterpiece of minimalism and luxury.`}
                    collectionName={product.collection?.handle || "modern-luxe"}
                    collectionTitle={product.collection?.title}
                  />
                  <RelatedProducts products={relatedProducts} />
                </>
              );
            })()}
          </>
        )}
      </main>
      <ResponsiveFooter />
    </>
  );
}
