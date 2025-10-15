"use client";

import { getProductBySlug, getProducts } from "@/lib/products-service";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ColorPicker } from "@/components/ui/ColorPicker";
import { MaterialsSelect } from "@/components/ui/MaterialsSelect";
import { AddToCartSection } from "@/components/ui/AddToCartSection";
import { useCart } from "@/lib/cart-context";
import { useState, useEffect } from "react";
import type { Product } from "@/types/product";
import { getProductColors, getProductSizes, getProductMaterials, getProductPrice, formatPrice } from "@/lib/utils/product-utils";
import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { ImageCarousel } from "@/components/product/ImageCarousel";
import { CollectionInspiredInterior } from "@/components/product/CollectionInspiredInterior";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ProductCardProps } from "@/components/shop/ProductCard";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductCardProps[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

  useEffect(() => {
    params.then(async (p) => {
      const prod = await getProductBySlug(p.slug);
      if (!prod) {
        notFound();
      }
      setProduct(prod);

      const allProducts = await getProducts(20);
      const related = allProducts
        .filter((p: Product) => p.id !== prod.id && p.collection?.id === prod.collection?.id)
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
    });
  }, [params]);

  if (!product) {
    return <div className="p-8">Loading...</div>;
  }

  const colors = getProductColors(product);
  const sizes = getProductSizes(product);
  const materials = getProductMaterials(product);

  const handleAddToCart = () => {
    let variantText = '';
    
    // Find the matching variant based on selected options
    const matchingVariant = product.variants?.find(variant => {
      const variantOptions = variant.options || [];
      const colorMatch = !selectedColor || variantOptions.some(opt => 
        opt.option.title === "Color" && opt.value === selectedColor
      );
      const sizeMatch = !selectedSize || variantOptions.some(opt => 
        opt.option.title === "Size" && opt.value === selectedSize
      );
      const materialMatch = !selectedMaterial || variantOptions.some(opt => 
        opt.option.title === "Material" && opt.value === selectedMaterial
      );
      return colorMatch && sizeMatch && materialMatch;
    });

    if (matchingVariant?.options) {
      const parts = matchingVariant.options.map(opt => opt.value);
      variantText = parts.join(' / ');
    } else if (product.variants?.[0]?.options) {
      const options = product.variants[0].options;
      const parts = options.map(opt => opt.value);
      variantText = parts.join(' / ');
    }

    addToCart({
      id: product.id,
      title: product.title,
      variant: variantText || undefined,
      price: getProductPrice(product) / 100,
      image: product.thumbnail || "https://placehold.co/80x80/e7e7e7/666?text=Product",
      imageAlt: product.title,
    }, quantity);
  };

  const images = product.images?.map((img) => ({
    url: img.url,
    alt: product.title,
  })) || [];

  return (
    <>
      <ResponsiveHeader />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20">
            <div>
              <ImageCarousel images={images} />
            </div>

            <div>
              <p className="text-xs md:text-sm text-gray-500 mb-2">{product.collection?.title || "Product"}</p>
              <h1 className="text-h3 md:text-h2 font-semibold mb-4">{product.title}</h1>
              <p className="text-big md:text-h4 font-semibold text-black mb-6">
                €{Math.round(getProductPrice(product) / 100)}
              </p>

              <p className="text-sm md:text-body text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>

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

              {sizes.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-800 mb-4">Sizes</h3>
                  <div className="flex gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        className={`px-4 py-2 border rounded transition-all ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-black'
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <AddToCartSection
                quantity={quantity}
                onQuantityDecrease={() => setQuantity(Math.max(1, quantity - 1))}
                onQuantityIncrease={() => setQuantity(quantity + 1)}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </div>

        <CollectionInspiredInterior 
          title={`The ${product.title} sofa is a masterpiece of minimalism and luxury.`}
          subtitle={`See more out of ${product.collection?.title || "Modern Luxe"} collection`}
          collectionName={product.collection?.handle || "modern-luxe"}
        />

        <RelatedProducts products={relatedProducts} />
      </main>
      <ResponsiveFooter />
    </>
  );
}
