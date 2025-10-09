import { getProducts } from "@/lib/products-service";
import { getColorHex } from "@/lib/color-mapping";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Products</h1>
        
        {products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: Product) => {

              const colors = product.variants
                ?.map((v) => v.options?.Color)
                .filter((c, index, self) => 
                  c && self.indexOf(c) === index
                );

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`} // handle = URL slug (e.g., "t-shirt")
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
                >
                  {product.thumbnail && (
                    <div className="w-full h-64 mb-4 bg-gray-100 rounded-lg overflow-hidden relative">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <h2 className="text-xl font-semibold mb-2">{product.title}</h2>

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
                            style={{ backgroundColor: getColorHex(colorName) }}
                            title={colorName}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {product.variants?.[0]?.prices?.[0] && (
                    <p className="text-lg font-bold text-blue-600">
                      €{(product.variants[0].prices[0].amount / 100).toFixed(2)}
                    </p>
                  )}

                  <p className="text-xs text-gray-500 mt-2">
                    {product.variants?.length || 0} variants available
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
