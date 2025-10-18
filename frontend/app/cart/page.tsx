"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { useCart } from "@/lib/cart-context";
import { CartItem } from "@/components/ui/CartItem";
import { Button } from "@/components/ui/Buttons/Button";
import { DiscountCodeInput } from "@/components/ui/DiscountCodeInput";
import { LoginPrompt } from "@/components/ui/LoginPrompt";
import { OrderSummary } from "@/components/ui/OrderSummary";
import Link from "next/link";
import { CONTENT } from "@/lib/constants/content";

export default function CartPage() {
  const router = useRouter();
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
        <div className="hidden md:block px-5">
          <div className="px-24 py-12">
          {items.length === 0 ? (
            <>
              <h1 className="text-h2 font-medium mb-12">{CONTENT.cart.title}</h1>
              <div className="text-center py-20">
                <p className="text-body text-gray-500 mb-6">{CONTENT.cart.empty}</p>
                <Link href="/shop">
                  <Button variant="primary">{CONTENT.common.continueShopping}</Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-[1fr_380px] gap-20">
              <div>
                <h1 className="text-h2 font-medium mb-12">{CONTENT.cart.title}</h1>
                {items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {index === 0 && (
                      <div className="h-px bg-gray-200 mb-8" />
                    )}
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

              <div>
                <OrderSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  taxes={taxes}
                  total={total}
                  variant="desktop"
                />

                <DiscountCodeInput
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  onApply={() => console.log("Apply discount:", discountCode)}
                  className="mb-6"
                />

                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full mb-6"
                  onClick={() => router.push('/checkout')}
                >
                  Proceed to checkout
                </Button>

                <LoginPrompt />
              </div>
            </div>
          )}
          </div>
        </div>

        <div className="md:hidden px-3 py-8">
          <h1 className="text-h3 font-medium mb-8">{CONTENT.cart.shoppingBag}</h1>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-base text-gray-500 mb-6">{CONTENT.cart.empty}</p>
              <Link href="/shop">
                <Button variant="primary" className="w-full">
                  {CONTENT.common.continueShopping}
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                {items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {index === 0 && (
                      <div className="h-px bg-gray-200 mb-6" />
                    )}
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

                <OrderSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  taxes={taxes}
                  total={total}
                  variant="mobile"
                />

                <DiscountCodeInput
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  onApply={() => console.log("Apply discount:", discountCode)}
                  className="mb-4"
                />

                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full mb-4"
                  onClick={() => router.push('/checkout')}
                >
                  Proceed to checkout
                </Button>

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
