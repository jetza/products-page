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
        className={cn("bg-white", className)}
        style={{
          width: isMobile ? "375px" : "636px",
          height: isMobile ? "560px" : "900px",
          padding: isMobile ? "32px" : "0",
        }}
      >

        <div
          className="flex items-center justify-between border-b border-gray-200"
          style={{ padding: isMobile ? "0 0 32px 0" : "32px 32px 24px 32px" }}
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
          <div style={{ padding: isMobile ? "32px 0" : "32px 32px 24px 32px" }}>
            {children}
          </div>
        )}

        <div style={{ padding: isMobile ? "0 0 32px 0" : "0 32px 24px 32px" }}>
          <div className="flex" style={{ gap: "8px" }}>
            <input
              type="text"
              placeholder="Discount code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 h-[40px] px-4 text-base border border-gray-200 rounded focus:outline-none focus:border-black"
              style={{ background: "var(--color-gray-50)" }}
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

        <div style={{ padding: isMobile ? "0" : "0 32px 32px 32px" }}>
          <div style={{ gap: isMobile ? "32px" : "8px" }} className="flex flex-col">
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
            className="flex items-center justify-between border-t border-gray-200"
            style={{ marginTop: isMobile ? "32px" : "16px", paddingTop: isMobile ? "32px" : "16px" }}
          >
            <span className="text-xl font-bold text-black">Total</span>
            <span className="text-xl font-bold text-black">
              {currency}{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

OrderSummary.displayName = "OrderSummary";
