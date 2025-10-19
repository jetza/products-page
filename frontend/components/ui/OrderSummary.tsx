import React from "react";
import { cn } from "@/lib/utils/cn";
import { CONTENT } from "@/lib/constants/content";

export interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  taxes: number;
  total: number;
  currency?: string;
  variant?: "desktop" | "mobile";
  className?: string;
  discountAmount?: number;
  discountCode?: string;
  showVatNote?: boolean;
}

export const OrderSummary = React.forwardRef<HTMLDivElement, OrderSummaryProps>(
  (
    {
      subtotal,
      shipping,
      taxes,
      total,
      currency = "€",
      variant = "desktop",
      className,
      discountAmount,
      discountCode,
      showVatNote = false,
    },
    ref,
  ) => {
    const isMobile = variant === "mobile";
    const textSize = isMobile ? "text-sm" : "text-base";
    const totalSize = isMobile ? "text-body" : "text-button-big";
    const spacing = isMobile ? "space-y-2 mb-4" : "space-y-3 mb-6";
    const separatorMargin = isMobile ? "mb-4" : "mb-6";
    const totalMargin = isMobile ? "mb-6" : "mb-8";

    return (
      <div ref={ref} className={className}>
        <div className={spacing}>
          <div className={cn("flex justify-between", textSize)}>
            <span className="text-gray-600">
              {CONTENT.order.summary.subtotal}
            </span>
            <span className="font-medium">
              {currency}
              {subtotal.toFixed(2)}
            </span>
          </div>
          <div className={cn("flex justify-between", textSize)}>
            <span className="text-gray-600">
              {CONTENT.order.summary.shipping}
            </span>
            <span className="font-medium">
              {currency}
              {shipping.toFixed(2)}
            </span>
          </div>
          <div className={cn("flex justify-between", textSize)}>
            <span className="text-gray-600">{CONTENT.order.summary.taxes}</span>
            <span className="font-medium">
              {currency}
              {taxes.toFixed(2)}
            </span>
          </div>
          {discountAmount && discountAmount > 0 && (
            <div
              className={cn("flex justify-between", textSize, "text-green-600")}
            >
              <span>
                {CONTENT.order.summary.discount}{" "}
                {discountCode && `(${discountCode})`}:
              </span>
              <span className="font-medium">
                -{currency}
                {discountAmount.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {isMobile && (
          <div className={cn("h-px bg-gray-200", separatorMargin)} />
        )}

        <div className={cn("flex justify-between", totalSize, totalMargin)}>
          <span className="font-semibold">{CONTENT.order.summary.total}</span>
          <span className="font-bold">
            {currency}
            {total.toFixed(2)}
          </span>
        </div>

        {showVatNote && (
          <p className="text-xs text-gray-500 mt-2">
            {CONTENT.order.summary.includingVAT}
          </p>
        )}
      </div>
    );
  },
);

OrderSummary.displayName = "OrderSummary";
