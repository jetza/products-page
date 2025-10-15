"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { useCheckout } from "@/lib/checkout-context";
import { OrderConfirmation } from "@/components/order/OrderConfirmation";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { state, resetCheckout } = useCheckout();
  const order = state.completedOrder;

  useEffect(() => {
    if (!state.orderCompleted || !order) {
      router.push("/");
    }
  }, [state.orderCompleted, order, router]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-body text-gray-600">Loading...</p>
      </div>
    );
  }

  const handleBackToHome = () => {
    resetCheckout();
    router.push("/");
  };

  return (
    <>
      <ResponsiveHeader />
      
      <main className="min-h-screen bg-white">
        <OrderConfirmation order={order} onBackToHome={handleBackToHome} />
      </main>

      <ResponsiveFooter />
    </>
  );
}
