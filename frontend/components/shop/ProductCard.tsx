import { getHref } from "@/lib/getHref";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
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

export const ProductCard = React.memo(
  React.forwardRef<HTMLAnchorElement, ProductCardProps>(
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
      ref,
    ) => {
      const locale = getCurrentLocale();
      const href = getHref(`/shop/${slug}`, locale);
      return (
        <Link
          href={href}
          ref={ref}
          className={cn(
            "group block bg-white overflow-hidden transition-all",
            className,
          )}
        >
          <div className="relative w-full aspect-square bg-gray-100 overflow-hidden mb-2 md:mb-4">
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex items-start justify-between gap-2 md:gap-4">
            <div className="flex-1">
              <h3 className="text-sm md:text-body font-medium text-black group-hover:text-gray-700 transition-colors mb-1">
                {title}
              </h3>

              {collection && (
                <p className="text-xs md:text-sm text-gray-500">{collection}</p>
              )}
            </div>

            <p className="text-sm md:text-body font-semibold text-black whitespace-nowrap">
              {currency}
              {price}
            </p>
          </div>
        </Link>
      );
    },
  ),
);

ProductCard.displayName = "ProductCard";
