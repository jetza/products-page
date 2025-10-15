"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { useCheckout, DeliveryInfo } from "@/lib/checkout-context";
import { DeliveryForm } from "./DeliveryForm";

export type CheckoutStep = "email" | "delivery" | "shipping" | "payment" | "review";

interface CheckoutFormProps {
  isMobile?: boolean;
  onPlaceOrder: () => Promise<void>;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  isMobile = false,
  onPlaceOrder,
}) => {
  const { state, setEmail, setDeliveryInfo } = useCheckout();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("email");
  const [email, setEmailLocal] = useState(state.email);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(state.subscribeNewsletter);

  const handleEmailNext = () => {
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }
    setEmail(email, subscribeNewsletter);
    setCurrentStep("delivery");
  };

  const handleDeliverySubmit = (deliveryData: DeliveryInfo) => {
    setDeliveryInfo(deliveryData);
    setCurrentStep("shipping");
  };

  if (isMobile) {
    return (
      <div>
        {/* Step 1: Email */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-4">1. Email</h2>
          {currentStep === "email" && (
            <>
              <p className="text-xs text-gray-600 mb-4">
                Already have an account?
                <br />
                No worries, just{" "}
                <Link href="/login" className="font-semibold underline">
                  log in
                </Link>
                .
              </p>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmailLocal(e.target.value)}
                fullWidth
                className="mb-4"
              />
              <Checkbox
                checked={subscribeNewsletter}
                onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                label="Want to get news and offers? Ok, yes and some discounts. But only if you subscribe."
                className="mb-6"
              />
              <Button variant="primary" size="lg" onClick={handleEmailNext} className="w-full">
                Next
              </Button>
            </>
          )}
          {currentStep !== "email" && state.email && (
            <p className="text-xs text-gray-600">{state.email}</p>
          )}
        </div>

        {/* Step 2: Delivery */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-sm font-semibold mb-4">2. Delivery details</h2>
          {currentStep === "delivery" && (
            <DeliveryForm 
              onSubmit={handleDeliverySubmit}
              initialData={state.deliveryInfo}
            />
          )}
          {currentStep !== "delivery" && state.deliveryInfo && (
            <p className="text-xs text-gray-600">
              {state.deliveryInfo.firstName} {state.deliveryInfo.lastName}<br />
              {state.deliveryInfo.address}<br />
              {state.deliveryInfo.city}, {state.deliveryInfo.postalCode}
            </p>
          )}
        </div>

        {/* Step 3: Shipping */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-sm font-semibold mb-4">3. Shipping method</h2>
          {currentStep === "shipping" && (
            <div>
              <p className="text-sm text-gray-600 mb-6">Select shipping...</p>
              <Button variant="primary" size="lg" onClick={() => setCurrentStep("payment")} className="w-full">
                Continue
              </Button>
            </div>
          )}
        </div>

        {/* Step 4: Payment */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-sm font-semibold mb-4">4. Payment</h2>
          {currentStep === "payment" && (
            <div>
              <p className="text-sm text-gray-600 mb-6">Enter payment...</p>
              <Button variant="primary" size="lg" onClick={() => setCurrentStep("review")} className="w-full">
                Review
              </Button>
            </div>
          )}
        </div>

        {/* Step 5: Review */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-sm font-semibold mb-4">5. Review</h2>
          {currentStep === "review" && (
            <div>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs font-semibold mb-1">Email</p>
                  <p className="text-sm text-gray-600">{state.email}</p>
                </div>
                {state.deliveryInfo && (
                  <div>
                    <p className="text-xs font-semibold mb-1">Delivery</p>
                    <p className="text-sm text-gray-600">
                      {state.deliveryInfo.firstName} {state.deliveryInfo.lastName}<br />
                      {state.deliveryInfo.address}<br />
                      {state.deliveryInfo.city}, {state.deliveryInfo.postalCode}
                    </p>
                  </div>
                )}
              </div>
              <Button 
                variant="primary" 
                size="lg" 
                onClick={onPlaceOrder}
                disabled={state.isProcessing}
                className="w-full"
              >
                {state.isProcessing ? "Processing..." : "Place an order"}
              </Button>
              {state.error && (
                <p className="text-xs text-red-600 mt-4">{state.error}</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop version
  return (
    <div>
      {/* Step 1: Email */}
      <div className="pt-8 pb-8">
        <div className="mb-6 flex flex-col xl:flex-row xl:items-start xl:justify-between gap-2">
          <h2 className="text-body font-medium">1. Email</h2>
          <p className="text-sm text-gray-600">
            Already have an account? No worries, just{" "}
            <Link href="/login" className="font-semibold underline">
              log in
            </Link>
            .
          </p>
        </div>

        {currentStep === "email" && (
          <>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmailLocal(e.target.value)}
              fullWidth
              className="mb-4"
            />

            <Checkbox
              checked={subscribeNewsletter}
              onChange={(e) => setSubscribeNewsletter(e.target.checked)}
              label="Want to get news and offers? Ok, yes and some discounts. But only if you subscribe."
              className="mb-6"
            />

            <div>
              <Button variant="primary" size="lg" onClick={handleEmailNext} className="px-12">
                Next
              </Button>
            </div>
          </>
        )}

        {currentStep !== "email" && state.email && (
          <p className="text-sm text-gray-600">{state.email}</p>
        )}
      </div>

      {/* Step 2: Delivery Details */}
      <div className="border-t border-gray-200 pt-8 pb-8">
        <h2 className="text-body font-medium mb-6">2. Delivery details</h2>
        {currentStep === "delivery" && (
          <DeliveryForm 
            onSubmit={handleDeliverySubmit}
            initialData={state.deliveryInfo}
          />
        )}
        {currentStep !== "delivery" && state.deliveryInfo && (
          <p className="text-sm text-gray-600">
            {state.deliveryInfo.firstName} {state.deliveryInfo.lastName}<br />
            {state.deliveryInfo.address}<br />
            {state.deliveryInfo.city}, {state.deliveryInfo.postalCode}
          </p>
        )}
      </div>

      {/* Step 3: Shipping Method */}
      <div className="border-t border-gray-200 pt-8 pb-8">
        <h2 className="text-body font-medium mb-6">3. Shipping method</h2>
        {currentStep === "shipping" && (
          <div>
            <p className="text-sm text-gray-600 mb-6">Select shipping method...</p>
            <div>
              <Button variant="primary" size="lg" onClick={() => setCurrentStep("payment")} className="px-12">
                Continue to payment
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Step 4: Payment */}
      <div className="border-t border-gray-200 pt-8 pb-8">
        <h2 className="text-body font-medium mb-6">4. Payment</h2>
        {currentStep === "payment" && (
          <div>
            <p className="text-sm text-gray-600 mb-6">Enter payment details...</p>
            <div>
              <Button variant="primary" size="lg" onClick={() => setCurrentStep("review")} className="px-12">
                Review order
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Step 5: Review */}
      <div className="border-t border-gray-200 pt-8 pb-8">
        <h2 className="text-body font-medium mb-6">5. Review</h2>
        {currentStep === "review" && (
          <div>
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm font-semibold mb-2">Email</h3>
                <p className="text-sm text-gray-600">{state.email}</p>
              </div>
              {state.deliveryInfo && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Delivery Address</h3>
                  <p className="text-sm text-gray-600">
                    {state.deliveryInfo.firstName} {state.deliveryInfo.lastName}<br />
                    {state.deliveryInfo.address}<br />
                    {state.deliveryInfo.city}, {state.deliveryInfo.postalCode}<br />
                    {state.deliveryInfo.country}<br />
                    {state.deliveryInfo.phone}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Place Order Button */}
      <div className="border-t border-gray-200 pt-8">
        <Button
          variant="secondary"
          size="lg"
          onClick={onPlaceOrder}
          disabled={currentStep !== "review" || state.isProcessing}
          className="w-full"
        >
          {state.isProcessing ? "Processing..." : "Place an order"}
        </Button>
        {state.error && (
          <p className="text-sm text-red-600 mt-4">{state.error}</p>
        )}
      </div>
    </div>
  );
};
