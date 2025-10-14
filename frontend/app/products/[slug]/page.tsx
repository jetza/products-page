"use client";

import { getProductBySlug } from "@/lib/products-service";
import { getColorHex } from "@/lib/color-mapping";
import { getProductColors, getProductSizes, getProductMaterials, getProductPrice, formatPrice } from "@/lib/utils/product-utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ColorPicker } from "@/components/ui/ColorPicker";
import { MaterialsSelect } from "@/components/ui/MaterialsSelect";
import { AddToCartSection } from "@/components/ui/AddToCartSection";
import { useCart } from "@/lib/cart-context";
import { useState, useEffect } from "react";
import type { Product } from "@/types/product";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { addToCart } = useCart();

  useEffect(() => {
    params.then((p) => {
      getProductBySlug(p.slug).then((prod) => {
        if (!prod) {
          notFound();
        }
        setProduct(prod);
      });
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
    
    if (selectedColor || selectedSize) {
      variantText = `${selectedColor || ''} ${selectedSize || ''}`.trim();
    } else {
      // Use extracted values if no selection made
      const parts = [];
      if (materials.length > 0) parts.push(materials[0]);
      if (colors.length > 0) parts.push(colors[0]);
      if (sizes.length > 0) parts.push(sizes[0]);
      variantText = parts.join(' / ');
    }

    addToCart({
      id: product.id,
      title: product.title,
      variant: variantText || undefined,
      price: getProductPrice(product) / 100,
      image: product.thumbnail || "https://placehold.co/80x80/e7e7e7/666?text=Product",
      imageAlt: product.title,
    });
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        <Link href="/products" className="text-black hover:text-gray-600 mb-4 inline-block">
          ← Back to products
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div>
              {product.thumbnail && (
                <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden relative">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>

              <p className="text-2xl font-bold text-black mb-6">
                {formatPrice(getProductPrice(product))}
              </p>

              <MaterialsSelect
                materials={materials}
                selectedMaterial={selectedMaterial}
                onMaterialSelect={setSelectedMaterial}
              />

              <ColorPicker
                colors={colors}
                selectedColor={selectedColor}
                onColorSelect={setSelectedColor}
                getColorHex={getColorHex}
              />

              {sizes.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Sizes</h3>
                  <div className="flex gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size as string}
                        className={`px-4 py-2 border rounded transition-all ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-black'
                        }`}
                        onClick={() => setSelectedSize(size as string)}
                      >
                        {size as string}
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
      </div>
    </div>
  );
}
