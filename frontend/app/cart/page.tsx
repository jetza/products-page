"use client";

import React, { useState } from "react";
import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { useCart } from "@/lib/cart-context";
import { CartItem } from "@/components/ui/CartItem";
import { Button } from "@/components/ui/Button";
import { DiscountCodeInput } from "@/components/ui/DiscountCodeInput";
import { LoginPrompt } from "@/components/ui/LoginPrompt";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const [discountCode, setDiscountCode] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; 
  const taxes = 0;
  const total = subtotal + shipping + taxes;

  return (
    <>
      <ResponsiveHeader />
      <main className="flex-1 bg-white">
        <div className="hidden md:block max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-h2 font-medium mb-12">Your shopping cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-body text-gray-500 mb-6">Your cart is empty</p>
              <Link href="/shop">
                <Button variant="primary">Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-[1fr_380px] gap-20">
              <div>
                {items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <CartItem
                      {...item}
                      onQuantityChange={updateQuantity}
                      onRemove={removeFromCart}
                    />
                    {index < items.length - 1 && (
                      <div className="h-px bg-gray-200 my-8" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="sticky top-8 h-fit">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium">€{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Taxes:</span>
                    <span className="font-medium">€{taxes.toFixed(2)}</span>
                  </div>
                </div>

                <div className="h-px bg-gray-200 mb-6" />

                <div className="flex justify-between text-button-big mb-8">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold">€{total.toFixed(2)}</span>
                </div>

                <DiscountCodeInput
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  onApply={() => console.log("Apply discount:", discountCode)}
                  className="mb-6"
                />

                <Link href="/checkout">
                  <Button variant="primary" size="lg" className="w-full mb-6">
                    Proceed to checkout
                  </Button>
                </Link>

                <LoginPrompt />

              </div>
            </div>
          )}
        </div>

        <div className="md:hidden px-4 py-8">
          <h1 className="text-h3 font-medium mb-8">Your shopping cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-base text-gray-500 mb-6">Your cart is empty</p>
              <Link href="/shop">
                <Button variant="primary" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                {items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <CartItem
                      {...item}
                      onQuantityChange={updateQuantity}
                      onRemove={removeFromCart}
                    />
                    {index < items.length - 1 && (
                      <div className="h-px bg-gray-200 my-6" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="border-t pt-6">

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium">€{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes:</span>
                    <span className="font-medium">€{taxes.toFixed(2)}</span>
                  </div>
                </div>

                <div className="h-px bg-gray-200 mb-4" />

                <div className="flex justify-between text-body mb-6">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold">€{total.toFixed(2)}</span>
                </div>

                <DiscountCodeInput
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  onApply={() => console.log("Apply discount:", discountCode)}
                  className="mb-4"
                />

                <Link href="/checkout">
                  <Button variant="primary" size="lg" className="w-full mb-4">
                    Proceed to checkout
                  </Button>
                </Link>

                <LoginPrompt />
              </div>
            </>
          )}
        </div>
      </main>
      <ResponsiveFooter />
    </>
  );
}
