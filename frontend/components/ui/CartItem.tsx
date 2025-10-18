import React from "react";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import { QuantitySelector } from "./QuantitySelector";
import { DeleteButton } from "./Buttons/DeleteButton";
import { CONTENT } from "@/lib/constants/content";

export interface CartItemProps {
  id: string;
  image: string;
  imageAlt?: string;
  title: string;
  variant?: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  currency?: string;
  onQuantityChange?: (id: string, newQuantity: number) => void;
  onRemove?: (id: string) => void;
  className?: string;
}

export const CartItem = React.forwardRef<HTMLDivElement, CartItemProps>(
  (
    {
      id,
      image,
      imageAlt = "",
      title,
      variant,
      quantity,
      price,
      originalPrice,
      currency = "€",
      onQuantityChange,
      onRemove,
      className,
    },
    ref
  ) => {
    const handleDecrease = () => {
      if (quantity > 1 && onQuantityChange) {
        onQuantityChange(id, quantity - 1);
      }
    };

    const handleIncrease = () => {
      if (onQuantityChange) {
        onQuantityChange(id, quantity + 1);
      }
    };

    const handleRemove = () => {
      if (onRemove) {
        onRemove(id);
      }
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-start gap-4 md:gap-8 w-full md:w-auto", className)}
      >
        <div className="flex-shrink-0 w-[120px] h-[158px] bg-gray-100 overflow-hidden relative">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            sizes="120px"
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col h-[158px]">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="flex-1">
              <h3 className="text-base md:text-body font-medium mb-1 md:mb-2">{title}</h3>
              {variant ? (
                <p className="text-sm md:text-base text-gray-500 leading-[140%] mb-1 md:mb-2">{variant}</p>
              ) : (
                <p className="text-sm md:text-base text-gray-500 leading-[140%] mb-1 md:mb-2">{CONTENT.common.noVariant}</p>
              )}
              
              <div>
                <div className={cn(
                  "text-body md:text-button-big font-bold",
                  originalPrice ? "text-error" : "text-black"
                )}>
                  {currency}{price}
                </div>
                {originalPrice && (
                  <div className="text-xs md:text-sm text-gray-400 line-through">
                    {currency}{originalPrice}
                  </div>
                )}
              </div>
            </div>

            <DeleteButton
              variant="ghost"
              onDelete={handleRemove}
              aria-label="Remove item"
            />
          </div>

          <div className="mt-auto">
            <QuantitySelector
              quantity={quantity}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
              className="w-[85px] md:w-[120px] h-8 md:h-10 gap-2 md:gap-3 px-4 md:px-3 mx-0"
            />
          </div>
        </div>
      </div>
    );
  }
);

CartItem.displayName = "CartItem";
