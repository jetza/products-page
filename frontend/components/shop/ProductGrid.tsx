import React, { useRef, useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils/cn";
import { ProductCard, ProductCardProps } from "./ProductCard";
import { CONTENT } from "@/lib/constants/content";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";

export interface ProductGridProps {
  products: ProductCardProps[];
  className?: string;
  useVirtualScroll?: boolean;
}

export const ProductGrid = React.memo(
  React.forwardRef<HTMLDivElement, ProductGridProps>(
    ({ products, className, useVirtualScroll = false }, ref) => {
      const [visibleRange, setVisibleRange] = useState({ start: 0, end: 50 });
      const containerRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        if (!useVirtualScroll || products.length < 100) return;

        const handleScroll = () => {
          if (!containerRef.current) return;

          const scrollTop = window.scrollY;
          const itemHeight = 400;
          const viewportHeight = window.innerHeight;
          const buffer = 10;

          const start = Math.max(
            0,
            Math.floor(scrollTop / itemHeight) - buffer,
          );
          const end = Math.min(
            products.length,
            Math.ceil((scrollTop + viewportHeight) / itemHeight) + buffer,
          );

          setVisibleRange({ start, end });
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);

        return () => {
          window.removeEventListener("scroll", handleScroll);
          window.removeEventListener("resize", handleScroll);
        };
      }, [useVirtualScroll, products.length]);

      const visibleProducts = useMemo(() => {
        if (useVirtualScroll && products.length >= 100) {
          return products.slice(visibleRange.start, visibleRange.end);
        }
        return products;
      }, [products, useVirtualScroll, visibleRange]);

      const paddingTop =
        useVirtualScroll && products.length >= 100
          ? visibleRange.start * 200
          : 0;

      const paddingBottom =
        useVirtualScroll && products.length >= 100
          ? Math.max(0, (products.length - visibleRange.end) * 200)
          : 0;

      if (products.length === 0) {
        return (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500 text-body">
              {CONTENT.common.noProductsFound}
            </p>
          </div>
        );
      }

      return (
        <div ref={containerRef}>
          {paddingTop > 0 && <div style={{ height: paddingTop }} />}
          <div
            ref={ref}
            className={cn(
              "grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8",
              className,
            )}
          >
            {visibleProducts.map((product, index) => (
              <FadeInOnScroll
                key={product.id}
                variant="fade-up"
                duration={600}
                delay={(index % 6) * 100}
              >
                <ProductCard {...product} />
              </FadeInOnScroll>
            ))}
          </div>
          {paddingBottom > 0 && <div style={{ height: paddingBottom }} />}
        </div>
      );
    },
  ),
);

ProductGrid.displayName = "ProductGrid";
