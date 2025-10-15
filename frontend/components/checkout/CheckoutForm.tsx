"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";

export type CheckoutStep = "email" | "delivery" | "shipping" | "payment" | "review";

interface CheckoutFormProps {
  currentStep: CheckoutStep;
  email: string;
  onEmailChange: (email: string) => void;
  saveInfo: boolean;
  onSaveInfoChange: (checked: boolean) => void;
  onNext: () => void;
  isMobile?: boolean;
}

const STEPS = [
  { id: "email" as CheckoutStep, label: "Email", number: 1 },
  { id: "delivery" as CheckoutStep, label: "Delivery details", number: 2 },
  { id: "shipping" as CheckoutStep, label: "Shipping method", number: 3 },
  { id: "payment" as CheckoutStep, label: "Payment", number: 4 },
  { id: "review" as CheckoutStep, label: "Review", number: 5 },
];

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  currentStep,
  email,
  onEmailChange,
  saveInfo,
  onSaveInfoChange,
  onNext,
  isMobile = false,
}) => {
  const currentStepIndex = STEPS.findIndex((step) => step.id === currentStep);

  const currentStepData = STEPS.find(step => step.id === currentStep);
  const isLastStep = currentStepIndex === STEPS.length - 1;

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
                onChange={(e) => onEmailChange(e.target.value)}
                fullWidth
                className="mb-4"
              />

              <Checkbox
                checked={saveInfo}
                onChange={(e) => onSaveInfoChange(e.target.checked)}
                label="What to get news and offers? Ok, yes and some discounts. But only if you subscribe."
                className="mb-6"
              />

              <Button variant="primary" size="lg" onClick={onNext} className="w-full">
                Next
              </Button>
            </>
          )}
        </div>

        {/* Step 2: Delivery details */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-sm font-semibold mb-4">2. Delivery details</h2>
          {currentStep === "delivery" && (
            <div>
              <p className="text-sm text-gray-600 mb-6">Content for delivery details...</p>
              <Button variant="primary" size="lg" onClick={onNext} className="w-full">
                Next
              </Button>
            </div>
          )}
        </div>

        {/* Step 3: Shipping method */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-sm font-semibold mb-4">3. Shipping method</h2>
          {currentStep === "shipping" && (
            <div>
              <p className="text-sm text-gray-600 mb-6">Content for shipping method...</p>
              <Button variant="primary" size="lg" onClick={onNext} className="w-full">
                Next
              </Button>
            </div>
          )}
        </div>

        {/* Step 4: Payment */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-sm font-semibold mb-4">4. Payment</h2>
          {currentStep === "payment" && (
            <div>
              <p className="text-sm text-gray-600 mb-6">Content for payment...</p>
              <Button variant="primary" size="lg" onClick={onNext} className="w-full">
                Next
              </Button>
            </div>
          )}
        </div>

        {/* Step 5: Review */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-sm font-semibold mb-4">5. Review</h2>
          {currentStep === "review" && (
            <div>
              <p className="text-sm text-gray-600 mb-6">Content for review...</p>
              <Button variant="primary" size="lg" disabled className="w-full">
                Place an order
              </Button>
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
        <div className="flex items-start justify-between mb-6">
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
              onChange={(e) => onEmailChange(e.target.value)}
              fullWidth
              className="mb-4"
            />

            <Checkbox
              checked={saveInfo}
              onChange={(e) => onSaveInfoChange(e.target.checked)}
              label="What to get news and offers? Ok, yes and some discounts. But only if you subscribe."
              className="mb-6"
            />

            <div>
              <Button variant="primary" size="lg" onClick={onNext} className="px-12">
                Next
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Step 2-5 */}
      {STEPS.slice(1).map((step) => (
        <div key={step.id} className="border-t border-gray-200 pt-8 pb-8">
          <h2 className="text-body font-medium">
            {step.number}. {step.label}
          </h2>
          {currentStep === step.id && (
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-6">Content for {step.label}...</p>
              <div>
                <Button variant="primary" size="lg" onClick={onNext} className="px-12">
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Place Order Button */}
      <div className="border-t border-gray-200 pt-8">
        <Button
          variant="secondary"
          size="lg"
          disabled
          className="w-full"
        >
          Place an order
        </Button>
      </div>
    </div>
  );
};
