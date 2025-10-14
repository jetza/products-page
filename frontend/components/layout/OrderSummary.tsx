import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

export interface OrderSummaryProps {
  title?: string;
  itemCount?: number;
  subtotal: number;
  shipping: number;
  taxes: number;
  total: number;
  currency?: string;
  onDiscountApply?: (code: string) => void;
  onEditCart?: () => void;
  children?: React.ReactNode;
  variant?: "desktop" | "mobile";
  className?: string;
}

export const OrderSummary = React.forwardRef<HTMLDivElement, OrderSummaryProps>(
  (
    {
      title = "Order",
      itemCount = 1,
      subtotal,
      shipping,
      taxes,
      total,
      currency = "€",
      onDiscountApply,
      onEditCart,
      children,
      variant = "desktop",
      className,
    },
    ref
  ) => {
    const [code, setCode] = useState("");

    const isMobile = variant === "mobile";

    return (
      <div 
        ref={ref} 
        className={cn(
          "bg-white",
          isMobile ? "w-[375px] h-[560px] p-8" : "w-[636px] h-[900px]",
          className
        )}
      >

        <div
          className={cn(
            "flex items-center justify-between border-b border-gray-200",
            isMobile ? "pb-8" : "px-8 pt-8 pb-6"
          )}
        >
          <span className="text-base font-normal text-black">
            {title} – {itemCount} item{itemCount !== 1 ? "s" : ""}
          </span>
          {onEditCart && (
            <button
              onClick={onEditCart}
              className="text-base font-normal text-black underline hover:no-underline"
            >
              Edit cart
            </button>
          )}
        </div>

        {children && (
          <div className={isMobile ? "py-8" : "px-8 pt-8 pb-6"}>
            {children}
          </div>
        )}

        <div className={isMobile ? "pb-8" : "px-8 pb-6"}>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Discount code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 h-10 px-4 text-base border border-gray-200 rounded focus:outline-none focus:border-black bg-gray-50"
            />
            <Button
              onClick={() => {
                if (onDiscountApply && code) {
                  onDiscountApply(code);
                }
              }}
              variant="ghost"
              size="md"
            >
              Apply
            </Button>
          </div>
        </div>

        <div className={isMobile ? "" : "px-8 pb-8"}>
          <div className={cn("flex flex-col", isMobile ? "gap-8" : "gap-2")}>
            <div className="flex items-center justify-between">
              <span className="text-base font-normal text-gray-600">
                Subtotal
              </span>
              <span className="text-base font-normal text-black">
                {currency}{subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-normal text-gray-600">
                Shipping
              </span>
              <span className="text-base font-normal text-black">
                {currency}{shipping.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-normal text-gray-600">Taxes</span>
              <span className="text-base font-normal text-black">
                {currency}{taxes.toFixed(2)}
              </span>
            </div>
          </div>

          <div
            className={cn(
              "flex items-center justify-between border-t border-gray-200",
              isMobile ? "mt-8 pt-8" : "mt-4 pt-4"
            )}
          >
            <span className="text-button-big font-bold text-black">Total</span>
            <span className="text-button-big font-bold text-black">
              {currency}{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

OrderSummary.displayName = "OrderSummary";
