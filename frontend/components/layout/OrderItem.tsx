import React from "react";
import { cn } from "@/lib/utils/cn";

export interface OrderItemProps {
  image: string;
  imageAlt?: string;
  title: string;
  variant?: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  currency?: string;
  className?: string;
}

export const OrderItem = React.forwardRef<HTMLDivElement, OrderItemProps>(
  (
    {
      image,
      imageAlt = "",
      title,
      variant,
      quantity,
      price,
      originalPrice,
      currency = "€",
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex", className)}
        style={{ gap: "16px", marginBottom: "24px" }}
      >
        {/* Product Image */}
        <div
          className="flex-shrink-0 bg-gray-100 rounded overflow-hidden"
          style={{ width: "80px", height: "80px" }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-normal text-black mb-1">{title}</h3>
            {variant && (
              <p className="text-sm font-normal text-gray-400">{variant}</p>
            )}
            <p className="text-sm font-normal text-gray-400">
              Quantity: {quantity}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col items-end">
          <span className="text-base font-normal text-black">
            {currency}{price}
          </span>
          {originalPrice && (
            <span className="text-sm font-normal text-gray-400 line-through">
              {currency}{originalPrice}
            </span>
          )}
        </div>
      </div>
    );
  }
);

OrderItem.displayName = "OrderItem";
