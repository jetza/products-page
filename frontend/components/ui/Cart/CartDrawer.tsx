"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils/cn";
import { CartItem, CartItemProps } from "@/components/ui/Cart/CartItem";
import { CartSummary } from "@/components/ui/Cart/CartSummary";
import { CloseButton } from "@/components/ui/Buttons/CloseButton";
import { CONTENT } from "@/lib/constants/content";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items?: Omit<CartItemProps, "onQuantityChange" | "onRemove">[];
  onQuantityChange?: (id: string, newQuantity: number) => void;
  onRemoveItem?: (id: string) => void;
  className?: string;
}

export const CartDrawer = React.memo<CartDrawerProps>(
  ({
    isOpen,
    onClose,
    items = [],
    onQuantityChange,
    onRemoveItem,
    className,
  }) => {
    const total = useMemo(
      () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      [items]
    );

    if (!isOpen) return null;

    return (
      <>
        <div
          className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
          onClick={onClose}
        />
        <div
          className={cn(
            "fixed top-0 right-0 bottom-0 bg-white z-[70] flex flex-col shadow-2xl w-full sm:w-[557px]",
            className
          )}
        >
          <div className="flex items-center justify-between px-5 sm:px-12 pt-20 sm:pt-[132px] pb-8">
            <h2 className="text-base sm:text-big font-semibold">
              {CONTENT.cart.cart}
            </h2>
            <CloseButton onClose={onClose} />
          </div>

          <div className="flex-1 overflow-y-auto px-5 sm:px-12">
            {items.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">{CONTENT.cart.empty}</p>
              </div>
            ) : (
              <div>
                {items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <CartItem
                      {...item}
                      onQuantityChange={onQuantityChange}
                      onRemove={onRemoveItem}
                    />
                    {index < items.length - 1 && (
                      <div className="w-full sm:w-[461px] h-px bg-gray-200 my-8" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="px-5 sm:px-12 pb-8">
              <div className="w-full sm:w-[461px] h-px bg-gray-200 mb-8" />
              <CartSummary total={total} />
            </div>
          )}
        </div>
      </>
    );
  }
);

CartDrawer.displayName = "CartDrawer";
