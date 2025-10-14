import { getProducts } from "@/lib/products-service";
import { getColorValue } from "@/lib/color-mapping";
import { getProductColors, formatPrice, getProductPrice } from "@/lib/utils/product-utils";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-h2 font-medium mb-8">Products</h1>
        
        {products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: Product) => {

              const colors = getProductColors(product);

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
                >
                  {product.thumbnail && (
                    <div className="w-full h-64 mb-4 bg-gray-100 rounded-lg overflow-hidden relative">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <h2 className="text-button-big font-semibold mb-2">{product.title}</h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
  
                  {colors && colors.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-gray-500">Colors:</span>
                      <div className="flex gap-2">
                        {colors.map((colorName) => colorName && (
                          <div
                            key={colorName}
                            className="w-6 h-6 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: getColorValue(colorName) }}
                            title={colorName}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <p className="text-body font-bold text-black">
                    {formatPrice(getProductPrice(product))}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
