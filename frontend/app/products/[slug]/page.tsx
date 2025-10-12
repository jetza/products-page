import { getProductBySlug } from "@/lib/products-service";
import { getColorHex } from "@/lib/color-mapping";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const colors = Array.from(
    new Set(
      product.variants?.map((v) => v.options?.Color).filter(Boolean) || []
    )
  );
  
  const sizes = Array.from(
    new Set(
      product.variants?.map((v) => v.options?.Size).filter(Boolean) || []
    )
  );

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
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>

              {product.variants?.[0]?.prices?.[0] && (
                <p className="text-2xl font-bold text-black mb-6">
                  €{(product.variants[0].prices[0].amount / 100).toFixed(2)}
                </p>
              )}

              {colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-3">Available Colors:</h3>
                  <div className="flex gap-3">
                    {colors.map((colorName) => (
                      <div key={colorName as string} className="text-center">
                        <div
                          className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-black cursor-pointer transition"
                          style={{ backgroundColor: getColorHex(colorName as string) }}
                          title={colorName as string}
                        />
                        <p className="text-xs mt-1 text-gray-600">{colorName as string}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-3">Available Sizes:</h3>
                  <div className="flex gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size as string}
                        className="px-4 py-2 border-2 border-gray-300 rounded-md hover:border-black transition"
                      >
                        {size as string}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button variant="primary" size="lg" className="w-full">
                Add to Cart
              </Button>

              <div className="mt-6 text-sm text-gray-500">
                <p>{product.variants?.length || 0} variants available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
