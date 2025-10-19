import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export interface ProductCardProps {
  title: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  imageAlt?: string;
  variant?: "desktop" | "mobile";
  className?: string;
  onClick?: () => void;
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      title,
      subtitle,
      price,
      originalPrice,
      imageUrl,
      imageAlt = "",
      variant = "desktop",
      className,
      onClick,
    },
    ref,
  ) => {
    const isOnSale = originalPrice && originalPrice > price;

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          "flex flex-col cursor-pointer",
          variant === "desktop" && "w-96 gap-6",
          variant === "mobile" && "w-[163px] gap-4",
          className,
        )}
      >
        <div
          className={cn(
            "relative bg-gray-100 overflow-hidden",
            variant === "desktop" && "h-[257px]",
            variant === "mobile" && "h-[139px]",
          )}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes={variant === "desktop" ? "384px" : "163px"}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-base font-medium text-black leading-none">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[12px] text-gray-500 leading-none mt-1">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-base font-medium leading-none",
                isOnSale ? "text-[var(--error)]" : "text-black",
              )}
            >
              €{price.toFixed(2)}
            </span>
            {isOnSale && originalPrice && (
              <span className="text-[12px] text-gray-400 line-through leading-none">
                €{originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";
