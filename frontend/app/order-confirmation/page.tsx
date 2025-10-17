"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { useCheckout } from "@/lib/hooks/useCheckout";
import { OrderConfirmation } from "@/components/order/OrderConfirmation";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { state, resetCheckout } = useCheckout();
  const order = state.completedOrder;

  useEffect(() => {
    if (!state.orderCompleted || !order) {
      router.push("/");
    }
  }, [state.orderCompleted, order, router]);

  const handleBackToHome = () => {
    resetCheckout();
    router.push("/");
  };

  return (
    <>
      <ResponsiveHeader />
      <main className="min-h-screen bg-white">
        {!order ? (
          <LoadingOverlay />
        ) : (
          <OrderConfirmation order={order} onBackToHome={handleBackToHome} />
        )}
      </main>
      <ResponsiveFooter />
    </>
  );
}
