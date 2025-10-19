import { ProductCard } from "@/components/shop/ProductCard";
import { ProductCardProps } from "@/components/shop/ProductCard";
import { CONTENT } from "@/lib/constants/content";

interface RelatedProductsProps {
  products: ProductCardProps[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-white px-8 md:px-5">
      <div className="mx-auto md:px-24">
        <h2 className="text-h4 md:text-h2 font-semibold mb-8 md:mb-12">
          {CONTENT.product.relatedProducts}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
