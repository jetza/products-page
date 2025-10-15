"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { CheckoutForm, CheckoutStep } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  const { items } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("email");
  const [email, setEmail] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 30.0;
  const taxes = 0;
  const total = subtotal + shipping + taxes;

  const handleNext = () => {
    const steps: CheckoutStep[] = ["email", "delivery", "shipping", "payment", "review"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_636px]">
        <div className="bg-white">
          <div className="px-12 py-6">
            <Link href="/" className="text-h4 font-medium">
              SofaSocietyCo.
            </Link>
          </div>
          
          <div className="px-12 py-12">
            <CheckoutForm
              currentStep={currentStep}
              email={email}
              onEmailChange={setEmail}
              saveInfo={saveInfo}
              onSaveInfoChange={setSaveInfo}
              onNext={handleNext}
            />
          </div>
        </div>

        <div className="bg-gray-100 min-h-screen" style={{ width: '636px' }}>
          <div className="px-12" style={{ paddingTop: '104px' }}>
            <OrderSummary
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

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="px-4 py-6 flex items-center justify-between">
          <Link href="/" className="text-body font-medium">
            SofaSocietyCo.
          </Link>
          <h1 className="text-body font-medium">Checkout</h1>
        </div>

        <div className="px-4 py-6 bg-gray-100">
          <OrderSummary
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

        <div className="px-4 py-6">
          <CheckoutForm
            currentStep={currentStep}
            email={email}
            onEmailChange={setEmail}
            saveInfo={saveInfo}
            onSaveInfoChange={setSaveInfo}
            onNext={handleNext}
            isMobile
          />
        </div>
      </div>
    </main>
  );
}
