import React from "react";
import { cn } from "@/lib/utils/cn";
import { TrashIcon } from "@/components/icons";
import Image from "next/image";
import { QuantitySelector } from "./QuantitySelector";

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
        className={cn("flex gap-8", className)}
        style={{ width: '461px', minHeight: '136px' }}
      >
        <div className="flex-shrink-0 w-[136px] h-[136px] bg-gray-100 rounded overflow-hidden relative">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2">{title}</h3>
              {variant ? (
                <p className="text-base text-gray-500 leading-[140%]">{variant}</p>
              ) : (
                <p className="text-base text-gray-500 leading-[140%]">No variant</p>
              )}
            </div>
            
            <div className="text-right ml-4">
              <div className={cn(
                "text-xl font-bold",
                originalPrice ? "text-[#DF4718]" : "text-black"
              )}>
                {currency}{price}
              </div>
              {originalPrice && (
                <div className="text-sm text-gray-400 line-through">
                  {currency}{originalPrice}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <QuantitySelector
              quantity={quantity}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
            />
            
            <button
              onClick={handleRemove}
              className="w-11 h-11 p-[10px] flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
              aria-label="Remove item"
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

CartItem.displayName = "CartItem";
