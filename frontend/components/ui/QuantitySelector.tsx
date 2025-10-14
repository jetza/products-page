import React from "react";
import { cn } from "@/lib/utils/cn";

export interface QuantitySelectorProps {
  quantity: number;
  onDecrease?: () => void;
  onIncrease?: () => void;
  className?: string;
  disabled?: boolean;
}

export const QuantitySelector = React.forwardRef<HTMLDivElement, QuantitySelectorProps>(
  (
    {
      quantity,
      onDecrease,
      onIncrease,
      className,
      disabled = false,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-between w-[136px] h-12 gap-4 px-6 py-2 border border-gray-200 rounded",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >

        <button
          onClick={onDecrease}
          disabled={disabled || quantity <= 1}
          className="flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
          type="button"
        >
          <span className="text-base leading-none font-normal">−</span>
        </button>

        <span className="text-center font-normal text-base leading-none">
          {quantity}
        </span>

        <button
          onClick={onIncrease}
          disabled={disabled}
          className="flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
          type="button"
        >
          <span className="text-base leading-none font-normal">+</span>
        </button>
      </div>
    );
  }
);

QuantitySelector.displayName = "QuantitySelector";
