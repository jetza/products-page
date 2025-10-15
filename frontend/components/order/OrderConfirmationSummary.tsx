"use client";

import React from "react";
import { OrderSummary } from "@/components/ui/OrderSummary";

interface OrderConfirmationSummaryProps {
  subtotal: number;
  shipping: number;
  taxes: number;
  discountAmount?: number;
  discountCode?: string;
  total: number;
  isMobile?: boolean;
}

export const OrderConfirmationSummary: React.FC<OrderConfirmationSummaryProps> = ({
  subtotal,
  shipping,
  taxes,
  discountAmount,
  discountCode,
  total,
  isMobile = false,
}) => {
  return (
    <OrderSummary
      subtotal={subtotal}
      shipping={shipping}
      taxes={taxes}
      total={total}
      variant={isMobile ? "mobile" : "desktop"}
      discountAmount={discountAmount}
      discountCode={discountCode}
      showVatNote={true}
    />
  );
};
