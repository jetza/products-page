import React from "react";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import Image from "next/image";

export interface ProductCardProps {
  id: string;
  title: string;
  collection?: string;
  price: number;
  currency?: string;
  image: string;
  imageAlt?: string;
  slug: string;
  className?: string;
}

export const ProductCard = React.forwardRef<HTMLAnchorElement, ProductCardProps>(
  (
    {
      title,
      collection,
      price,
      currency = "€",
      image,
      imageAlt,
      slug,
      className,
    },
    ref
  ) => {
    return (
      <Link
        href={`/shop/${slug}`}
        ref={ref}
        className={cn(
          "group block bg-white overflow-hidden transition-all",
          className
        )}
      >
        <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden mb-4">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-black group-hover:text-gray-700 transition-colors mb-1">
              {title}
            </h3>
            
            {collection && (
              <p className="text-sm text-gray-500">
                {collection}
              </p>
            )}
          </div>
          
          <p className="text-lg font-semibold text-black whitespace-nowrap">
            {currency}{price}
          </p>
        </div>
      </Link>
    );
  }
);

ProductCard.displayName = "ProductCard";
