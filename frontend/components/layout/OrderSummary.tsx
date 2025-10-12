import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { ChevronDownIcon } from "@/components/icons";

export interface OrderSummaryProps {
  total: number;
  currency?: string;
  children?: React.ReactNode;
  className?: string;
}

export const OrderSummary = React.forwardRef<HTMLDivElement, OrderSummaryProps>(
  ({ total, currency = "€", children, className }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div ref={ref} className={cn("w-full", className)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full h-[72px]",
            "flex items-center justify-between",
            "bg-gray-50",
            "transition-colors",
            "order-summary-padding"
          )}
        >
          <span className="text-base font-normal text-black">Order summary</span>
          <div className="flex items-center gap-2">
            <span className="text-base font-normal text-black">
              {currency}{Math.round(total)}
            </span>
            <ChevronDownIcon
              className={cn(
                "w-6 h-6 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </div>
        </button>

        {isOpen && children && (
          <div className="order-summary-padding bg-gray-50 border-t border-gray-200">
            {children}
          </div>
        )}
      </div>
    );
  }
);

OrderSummary.displayName = "OrderSummary";
