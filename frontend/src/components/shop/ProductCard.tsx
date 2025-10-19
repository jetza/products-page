import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getColorValue } from "@/lib/constants/colors.config";

export interface ProductCardProps {
  id: string;
  title: string;
  collection: string;
  price: number;
  currency: string;
  image: string;
  imageAlt?: string;
  slug: string;
  colors?: string[];
}

export function ProductCard({
  title,
  collection,
  price,
  currency,
  image,
  imageAlt = "",
  slug,
  colors = [],
}: ProductCardProps) {
  return (
    <Link href={`/shop/${slug}`} className="group block">
      <div className="relative aspect-[4/3] mb-4 overflow-hidden bg-gray-100">
        {image && (
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-800 truncate group-hover:text-gray-700 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-500 truncate">{collection}</p>

          {colors.length > 0 && (
            <div className="flex gap-1.5 mt-2">
              {colors.map((color) => (
                <span
                  key={color}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: getColorValue(color) }}
                  title={color}
                />
              ))}
            </div>
          )}
        </div>

        <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
          {currency}
          {price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
