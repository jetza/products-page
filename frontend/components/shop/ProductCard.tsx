"use client";
import { getHref } from "@/lib/getHref";
import { useLocale } from "@/lib/hooks/useLocale";
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
  priority?: boolean;
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
        priority = false,
      },
      ref
    ) => {
      const { locale } = useLocale();
      const href = getHref(`/shop/${slug}`, locale);
      return (
        <Link
          href={href}
          ref={ref}
          className={cn(
            "group block bg-white overflow-hidden transition-all",
            className
          )}
        >
          <div className="relative w-full aspect-square bg-gray-100 overflow-hidden mb-2 md:mb-4">
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              sizes="(max-width: 768px) 70vw, (max-width: 1024px) 280px, 25vw"
              className="object-cover md:group-hover:scale-105 md:transition-transform md:duration-300"
              priority={priority}
              loading={priority ? "eager" : "lazy"}
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
    }
  )
);

ProductCard.displayName = "ProductCard";
