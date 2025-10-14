import React from "react";
import { cn } from "@/lib/utils/cn";
import { ProductCard, ProductCardProps } from "./ProductCard";

export interface ProductGridProps {
  products: ProductCardProps[];
  className?: string;
}

export const ProductGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
  (
    {
      products,
      className,
    },
    ref
  ) => {
    if (products.length === 0) {
      return (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500 text-body">No products found</p>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
          className
        )}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
          />
        ))}
      </div>
    );
  }
);

ProductGrid.displayName = "ProductGrid";
