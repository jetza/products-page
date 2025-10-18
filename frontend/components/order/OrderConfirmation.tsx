"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Buttons/Button";
import { OrderConfirmationSummary } from "./OrderConfirmationSummary";
import { CompletedOrder } from "@/lib/checkout-context";
import { ReceiptIcon, CreditCardIcon, MapPinIcon } from "@/components/icons";

interface OrderConfirmationProps {
  order: CompletedOrder;
  onBackToHome: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  order,
  onBackToHome,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
      <div className="mb-8 md:mb-12">
        <h1 className="text-h4 md:text-h2 font-semibold mb-4">
          Thank you for your order!
        </h1>
        <p className="text-sm md:text-body text-gray-600 mb-4">
          We are pleased to confirm that your order has been successfully placed and will be processed shortly.
        </p>
        <p className="text-sm md:text-body text-gray-600 mb-6">
          We have sent you the receipt and order details to your email address
          <br className="hidden md:inline" />
          <span className="md:hidden">. </span>
          Your order number is <span className="font-semibold">{order.orderNumber}</span>.
        </p>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={onBackToHome}
          className="w-full md:w-auto"
        >
          Back to home page
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-12">
        <div className="border border-gray-200 rounded p-4 md:p-6">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <MapPinIcon className="w-4 h-4 md:w-5 md:h-5" />
            <h2 className="text-sm md:text-body font-semibold">Delivery address</h2>
          </div>
          <div className="text-sm md:text-body text-gray-900">
            <p className="font-medium">
              {order.deliveryInfo.firstName} {order.deliveryInfo.lastName}
            </p>
            <p>
              {order.deliveryInfo.address}
              {order.deliveryInfo.apartment ? `, ${order.deliveryInfo.apartment}` : ''}
            </p>
            <p>
              {order.deliveryInfo.postalCode} {order.deliveryInfo.city}, {order.deliveryInfo.country}
            </p>
            <p>{order.deliveryInfo.phone}</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded p-4 md:p-6">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <ReceiptIcon className="w-4 h-4 md:w-5 md:h-5" />
            <h2 className="text-sm md:text-body font-semibold">Billing address</h2>
          </div>
          <div className="text-sm md:text-body text-gray-900">
            <p className="font-medium">
              {order.billingInfo.firstName} {order.billingInfo.lastName}
            </p>
            <p>
              {order.billingInfo.address}
              {order.billingInfo.apartment ? `, ${order.billingInfo.apartment}` : ''}
            </p>
            <p>
              {order.billingInfo.postalCode} {order.billingInfo.city}, {order.billingInfo.country}
            </p>
            <p>{order.billingInfo.phone}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
        {order.items.map((item) => (
          <div 
            key={item.id} 
            className="border border-gray-200 p-4 md:p-6"
          >
            <div className="flex items-start gap-4 md:gap-6">
              <div className="relative w-[120px] h-[200px] md:w-[176px] md:h-[232px] bg-gray-100 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title || 'Product image'}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col h-[200px] md:h-[232px] justify-between">
                <div>
                  <h3 className="text-base md:text-body font-medium mb-1 md:mb-2">
                    {item.title}
                  </h3>
                  {item.variant && (
                    <>
                      {item.variant.includes('/') ? (
                        <>
                          <p className="text-sm md:text-base text-gray-500 leading-[140%]">
                            Material: <span className="text-black font-semibold">{item.variant.split('/')[0].trim()}</span>
                          </p>
                          <p className="text-sm md:text-base text-gray-500 leading-[140%]">
                            Color: <span className="text-black font-semibold">{item.variant.split('/')[1].trim()}</span>
                          </p>
                        </>
                      ) : (
                        <p className="text-sm md:text-base text-gray-500 leading-[140%]">
                          {item.variant}
                        </p>
                      )}
                    </>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm md:text-base text-gray-600">
                    Quantity: <span className="text-black font-semibold">{item.quantity}</span>
                  </p>
                  <div className="text-body md:text-button-big font-bold">
                    €{item.price}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="md:ml-auto border border-gray-200 rounded p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <CreditCardIcon className="w-4 h-4 md:w-5 md:h-5" />
          <h2 className="text-sm md:text-body font-semibold">Payment</h2>
        </div>
        <OrderConfirmationSummary
          subtotal={order.subtotal}
          shipping={order.shipping}
          taxes={order.taxes}
          discountAmount={order.discountAmount}
          discountCode={order.discountCode}
          total={order.total}
        />
      </div>
    </div>
  );
};
