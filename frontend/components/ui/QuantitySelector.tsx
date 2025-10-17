import React from "react";
import { cn } from "@/lib/utils/cn";
import { PlusIcon, MinusIcon } from "@/components/icons";

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
          "inline-flex items-center justify-between w-[85px] h-[32px] gap-2 px-3 py-1 border border-gray-200 rounded",
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
          <MinusIcon className="w-4 h-4" />
        </button>

        <span className="text-center font-normal text-sm leading-none">
          {quantity}
        </span>

        <button
          onClick={onIncrease}
          disabled={disabled}
          className="flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
          type="button"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
    );
  }
);

QuantitySelector.displayName = "QuantitySelector";
