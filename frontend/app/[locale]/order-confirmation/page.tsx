"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getHref } from "@/lib/getHref";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { useCheckout } from "@/lib/hooks/useCheckout";
import { OrderConfirmation } from "@/components/order/OrderConfirmation";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const locale = getCurrentLocale();
  const { state, resetCheckout } = useCheckout();
  const order = state.completedOrder;

  useEffect(() => {
    if (!state.orderCompleted || !order) {
      router.push(getHref("/", locale));
    }
  }, [state.orderCompleted, order, router, locale]);

  const handleBackToHome = () => {
    resetCheckout();
    router.push(getHref("/", locale));
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
