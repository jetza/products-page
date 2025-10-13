import React from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "./Button";

export interface CartSummaryProps {
  total: number;
  currency?: string;
  onCheckout?: () => void;
  className?: string;
}

export const CartSummary = React.forwardRef<HTMLDivElement, CartSummaryProps>(
  (
    {
      total,
      currency = "€",
      onCheckout,
      className,
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("w-[461px] flex flex-col gap-8", className)}>

        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold">Total:</span>
          <span className="font-bold">
            {currency}{total.toFixed(2)}
          </span>
        </div>

        <Button 
          variant="primary" 
          size="lg" 
          className="w-full"
          onClick={onCheckout}
        >
          Proceed to checkout
        </Button>
      </div>
    );
  }
);

CartSummary.displayName = "CartSummary";
