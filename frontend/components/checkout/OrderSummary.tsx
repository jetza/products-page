"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { OrderSummary } from "@/components/ui/OrderSummary";

interface CartItem {
  id: string;
  title: string;
  variant?: string;
  price: number;
  quantity: number;
  image: string;
  imageAlt?: string;
}

interface CheckoutOrderSummaryProps {
  items: CartItem[];
  discountCode: string;
  onDiscountCodeChange: (code: string) => void;
  subtotal: number;
  shipping: number;
  taxes: number;
  total: number;
  isMobile?: boolean;
}

export const CheckoutOrderSummary: React.FC<CheckoutOrderSummaryProps> = ({
  items,
  discountCode,
  onDiscountCodeChange,
  subtotal,
  shipping,
  taxes,
  total,
  isMobile = false,
}) => {
  const imageSize = isMobile ? 80 : 132;
  const imageHeight = isMobile ? 80 : 160;

  if (isMobile) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-body font-medium">Order summary</h2>
          <span className="text-body font-medium">€{total.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-medium">Order - {items.length} item</p>
          <Link href="/cart" className="text-xs font-semibold underline">
            Edit cart
          </Link>
        </div>

        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div
                className="relative flex-shrink-0 rounded overflow-hidden bg-gray-100"
                style={{ width: `${imageSize}px`, height: `${imageHeight}px` }}
              >
                <Image
                  src={item.image || '/placeholder.png'}
                  alt={item.imageAlt || item.title || 'Product image'}
                  fill
                  className="object-cover"
                  sizes={`${imageSize}px`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-medium flex-1">{item.title}</h3>
                  <p className="text-sm font-medium ml-4">€{item.price.toFixed(0)}</p>
                </div>
                {item.variant && (
                  <p className="text-xs text-gray-600 mb-1">
                    Variant: {item.variant}
                  </p>
                )}
                <p className="text-xs text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Discount code"
            value={discountCode}
            onChange={(e) => onDiscountCodeChange(e.target.value)}
            fullWidth
            className="mb-2"
          />
          <Button
            variant="secondary"
            size="md"
            disabled={!discountCode.trim()}
            className="w-full"
          >
            Apply
          </Button>
        </div>

        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          taxes={taxes}
          total={total}
          variant="mobile"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-body font-medium">
          Order - {items.length} {items.length === 1 ? 'item' : 'items'}
        </h2>
        <Link href="/cart" className="text-xs font-semibold underline">
          Edit cart
        </Link>
      </div>

      <div className="space-y-6 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex gap-6">
            <div
              className="relative flex-shrink-0 rounded overflow-hidden bg-gray-100"
              style={{ width: `${imageSize}px`, height: `${imageHeight}px` }}
            >
              <Image
                src={item.image || '/placeholder.png'}
                alt={item.imageAlt || item.title || 'Product image'}
                fill
                className="object-cover"
                sizes={`${imageSize}px`}
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex items-start justify-between mb-auto">
                <h3 className="text-body font-medium">{item.title}</h3>
                <p className="text-body font-medium ml-4">${item.price.toFixed(2)}</p>
              </div>
              <div className="mt-auto">
                {item.variant && (
                  <p className="text-body font-normal text-gray-900">
                    Variant: {item.variant}
                  </p>
                )}
                <p className="text-body font-normal text-gray-900">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <div className="flex gap-3 items-stretch">
          <Input
            type="text"
            placeholder="Discount code"
            value={discountCode}
            onChange={(e) => onDiscountCodeChange(e.target.value)}
            fullWidth
          />
          <Button
            variant="secondary"
            size="md"
            disabled={!discountCode.trim()}
            className="flex-shrink-0 h-auto"
          >
            Apply
          </Button>
        </div>
      </div>

      <OrderSummary
        subtotal={subtotal}
        shipping={shipping}
        taxes={taxes}
        total={total}
        variant="desktop"
      />
    </div>
  );
};
