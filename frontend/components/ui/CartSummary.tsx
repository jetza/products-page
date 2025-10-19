"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { getHref } from "@/lib/getHref";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { cn } from "@/lib/utils/cn";
import { Button } from "./Buttons/Button";
import { CONTENT } from "@/lib/constants/content";

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
  const router = useRouter();
  const locale = getCurrentLocale();
    
    return (
      <div ref={ref} className={cn("w-[461px] flex flex-col gap-8", className)}>

        <div className="flex items-center justify-between text-body">
          <span className="font-semibold">{CONTENT.order.summary.total}</span>
          <span className="font-bold">
            {currency}{total.toFixed(2)}
          </span>
        </div>

        {showViewCart ? (
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full"
            onClick={() => router.push(getHref('/cart', locale))}
          >
            {CONTENT.cart.viewCart}
          </Button>
        ) : (
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full"
            onClick={onCheckout}
          >
            {CONTENT.cart.proceedToCheckout}
          </Button>
        )}
      </div>
    );
  }
);

CartSummary.displayName = "CartSummary";
