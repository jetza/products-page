"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface DiscountCodeInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onApply?: () => void;
  className?: string;
}

export const DiscountCodeInput: React.FC<DiscountCodeInputProps> = ({
  value,
  onChange,
  onApply,
  className,
}) => {
  return (
    <div className={cn("flex gap-3 w-full", className)}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Discount code"
        className={cn(
          "flex-1 h-12 px-4 text-base font-normal",
          "border border-gray-300 rounded",
          "transition-all duration-200",
          "focus:outline-none focus:border-black",
          "placeholder:text-gray-400",
          "bg-white text-gray-800"
        )}
      />
      <button
        onClick={onApply}
        className={cn(
          "px-6 h-12 text-base font-medium",
          "rounded",
          "bg-gray-200 text-white hover:bg-gray-300",
          "transition-colors duration-200",
          "whitespace-nowrap"
        )}
      >
        Apply
      </button>
    </div>
  );
};
