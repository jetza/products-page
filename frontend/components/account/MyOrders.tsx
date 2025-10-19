"use client";

import React from "react";
import Image from "next/image";
import { mockOrders } from "@/lib/constants/mock-orders.data";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Buttons/Button";
import { PackageIcon, TruckIcon, CheckmarkIcon } from "@/components/icons";
import { CONTENT } from "@/lib/constants/content";

const statusIcons = {
  Packing: PackageIcon,
  Delivering: TruckIcon,
  Delivered: CheckmarkIcon,
};

export const MyOrders: React.FC = () => {
  return (
    <div>
      <h1 className="text-[32px] font-semibold mb-8 md:mb-12">
        {CONTENT.account.myOrders}
      </h1>

      <div className="space-y-6">
        {mockOrders.map((order) => {
          const StatusIcon = statusIcons[order.status];
          const displayItems = [...order.items].slice(0, 4).reverse();
          const remainingCount = Math.max(0, order.items.length - 4);

          console.log(
            "Order:",
            order.orderNumber,
            "Total items:",
            order.items.length,
            "Display:",
            displayItems.length,
            "Remaining:",
            remainingCount,
          );

          return (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 md:p-6"
            >
              <div className="md:hidden space-y-4">
                <div className="flex flex-row-reverse gap-2">
                  {displayItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="relative aspect-square bg-gray-50 rounded overflow-hidden flex-1"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      {index === 0 && remainingCount > 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            +{remainingCount}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Tag variant="primary" className="self-start">
                  <StatusIcon className="w-3 h-3" />
                  {order.status}
                </Tag>

                <div>
                  <p className="text-sm text-gray-900 mb-1">
                    <span className="font-medium">
                      {CONTENT.account.orderLabel}
                    </span>{" "}
                    {order.orderNumber}
                  </p>
                  <p className="text-xs text-gray-500">
                    Order date: {order.date}
                  </p>
                </div>

                <Button variant="secondary" size="sm" className="w-full">
                  Check status
                </Button>
              </div>

              <div className="hidden md:grid md:grid-cols-[1fr_auto] gap-6">
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-base text-gray-900 mb-1">
                      <span className="font-medium">
                        {CONTENT.account.orderLabel}
                      </span>{" "}
                      {order.orderNumber}
                    </p>
                    <p className="text-sm text-gray-500">
                      Order date: {order.date}
                    </p>
                  </div>

                  <Tag variant="primary" className="mt-4 self-start">
                    <StatusIcon className="w-4 h-4" />
                    {order.status}
                  </Tag>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-row-reverse gap-3">
                    {displayItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="relative aspect-square bg-gray-50 rounded overflow-hidden w-20"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                        {index === 0 && remainingCount > 0 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-medium text-base">
                              +{remainingCount}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-auto self-end"
                  >
                    Check status
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
