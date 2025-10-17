import React from "react";
import Image from "next/image";
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
        className={cn("flex gap-4 mb-6", className)}
      >

        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded overflow-hidden relative">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

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
