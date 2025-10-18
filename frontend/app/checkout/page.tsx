"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useCheckout } from "@/lib/hooks/useCheckout";
import Link from "next/link";
import { CheckoutOrderSummary } from "@/components/checkout/OrderSummary";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCart();
  const { state, completeOrder } = useCheckout();
  const [discountCode, setDiscountCode] = useState(state.discountCode);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 30.0;
  const taxes = 0;
  const total = subtotal + shipping + taxes - state.discountAmount;

  const handlePlaceOrder = async () => {
    try {
      const orderItems = items.map(item => ({
        id: item.id,
        title: item.title,
        variant: item.variant,
        size: undefined,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      await completeOrder(orderItems, subtotal, shipping, taxes);
      router.push("/order-confirmation");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to complete order. Please try again.");
    }
  };

  return (
    <main className="min-h-screen">
      <div className="hidden md:grid md:grid-cols-[1fr_636px]">
        <div className="bg-white">
          <div className="px-12 py-6">
            <Link href="/" className="text-h4 font-medium">
              SofaSocietyCo.
            </Link>
          </div>
          
          <div className="px-12 py-12">
            <CheckoutForm onPlaceOrder={handlePlaceOrder} />
          </div>
        </div>

        <div className="bg-gray-100 min-h-screen" style={{ width: '636px' }}>
          <div className="px-12" style={{ paddingTop: '174px' }}>
            <CheckoutOrderSummary
              items={items}
              discountCode={discountCode}
              onDiscountCodeChange={setDiscountCode}
              subtotal={subtotal}
              shipping={shipping}
              taxes={taxes}
              total={total}
            />
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="px-8 py-6 flex items-center justify-between">
          <Link href="/" className="text-body font-medium">
            SofaSocietyCo.
          </Link>
          <h1 className="text-body font-medium">Checkout</h1>
        </div>

        <div className="px-8 py-6 bg-gray-100">
          <CheckoutOrderSummary
            items={items}
            discountCode={discountCode}
            onDiscountCodeChange={setDiscountCode}
            subtotal={subtotal}
            shipping={shipping}
            taxes={taxes}
            total={total}
            isMobile
          />
        </div>

        <div className="px-8 py-6">
          <CheckoutForm isMobile onPlaceOrder={handlePlaceOrder} />
        </div>
      </div>
    </main>
  );
}
