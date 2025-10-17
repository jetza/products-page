import React from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "./Buttons/Button";
import Link from "next/link";

export interface CartSummaryProps {
  total: number;
  currency?: string;
  onCheckout?: () => void;
  showViewCart?: boolean;
  className?: string;
}

export const CartSummary = React.forwardRef<HTMLDivElement, CartSummaryProps>(
  (
    {
      total,
      currency = "€",
      onCheckout,
      showViewCart = true,
      className,
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("w-[461px] flex flex-col gap-8", className)}>

        <div className="flex items-center justify-between text-body">
          <span className="font-semibold">Total:</span>
          <span className="font-bold">
            {currency}{total.toFixed(2)}
          </span>
        </div>

        {showViewCart ? (
          <Link href="/cart">
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full"
            >
              View cart
            </Button>
          </Link>
        ) : (
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full"
            onClick={onCheckout}
          >
            Proceed to checkout
          </Button>
        )}
      </div>
    );
  }
);

CartSummary.displayName = "CartSummary";
