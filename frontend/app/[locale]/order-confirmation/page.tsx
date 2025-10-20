"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getHref } from "@/lib/getHref";
import { useLocale } from "@/lib/hooks/useLocale";
import { ResponsiveHeader } from "@/components/layout/Header/ResponsiveHeader";
import { ResponsiveFooter } from "@/components/layout/Footer/ResponsiveFooter";
import { useCheckout } from "@/lib/hooks/useCheckout";
import { OrderConfirmation } from "@/components/order/OrderConfirmation";
import { LoadingOverlay } from "@/components/ui/Feedback/LoadingOverlay";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { locale } = useLocale();
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
