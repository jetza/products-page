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
          "inline-flex items-center gap-2 h-8 px-4 py-2 border border-[#D1D1D1] rounded",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        style={{ width: '85px' }}
      >

        <button
          onClick={onDecrease}
          disabled={disabled || quantity <= 1}
          className="flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
          type="button"
        >
          <span className="text-base leading-none">-</span>
        </button>

        <span className="flex-1 text-center font-medium text-base leading-none">
          {quantity}
        </span>

        <button
          onClick={onIncrease}
          disabled={disabled}
          className="flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
          type="button"
        >
          <span className="text-base leading-none">+</span>
        </button>
      </div>
    );
  }
);

QuantitySelector.displayName = "QuantitySelector";
