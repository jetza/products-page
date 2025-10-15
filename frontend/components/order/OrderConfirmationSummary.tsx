"use client";

import React from "react";

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
  const textSize = isMobile ? "text-sm" : "text-body";
  const marginBottom = isMobile ? "mb-3" : "mb-3";

  return (
    <div>
      <div className={`flex items-center justify-between ${textSize} ${marginBottom}`}>
        <span className="text-gray-600">Subtotal:</span>
        <span className="font-medium">€{subtotal.toFixed(2)}</span>
      </div>
      <div className={`flex items-center justify-between ${textSize} ${marginBottom}`}>
        <span className="text-gray-600">Shipping:</span>
        <span className="font-medium">€{shipping.toFixed(2)}</span>
      </div>
      <div className={`flex items-center justify-between ${textSize} ${isMobile ? "mb-6" : "mb-6"}`}>
        <span className="text-gray-600">Taxes:</span>
        <span className="font-medium">€{taxes.toFixed(2)}</span>
      </div>
      {discountAmount && discountAmount > 0 && (
        <div className={`flex items-center justify-between ${textSize} ${isMobile ? "mb-6" : "mb-6"} text-green-600`}>
          <span>Discount ({discountCode}):</span>
          <span className="font-medium">-€{discountAmount.toFixed(2)}</span>
        </div>
      )}
      <div className={`flex items-center justify-between ${isMobile ? "text-body" : "text-big"} border-t border-gray-200 ${isMobile ? "pt-4" : "pt-6"}`}>
        <span className="font-semibold">Total</span>
        <span className="font-semibold">€{total.toFixed(2)}</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">Including VAT</p>
    </div>
  );
};
