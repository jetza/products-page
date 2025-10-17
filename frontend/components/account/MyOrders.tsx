"use client";

import React from "react";
import Image from "next/image";
import { mockOrders } from "@/lib/constants/mockOrders";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Buttons/Button";
import { PackageIcon, TruckIcon, CheckmarkIcon } from "@/components/icons";

const statusIcons = {
  Packing: PackageIcon,
  Delivering: TruckIcon,
  Delivered: CheckmarkIcon,
};

export const MyOrders: React.FC = () => {
  return (
    <div>
      <h1 className="text-[32px] font-semibold mb-8 md:mb-12">
        My orders
      </h1>

      <div className="space-y-6">
        {mockOrders.map((order) => {
          const StatusIcon = statusIcons[order.status];
          
          return (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4 md:p-6">
              <div className="md:hidden space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="relative aspect-square bg-gray-50 rounded overflow-hidden"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                <Tag variant="primary" className="self-start">
                  <StatusIcon className="w-3 h-3" />
                  {order.status}
                </Tag>

                <div>
                  <p className="text-sm text-gray-900 mb-1">
                    <span className="font-medium">Order:</span> {order.orderNumber}
                  </p>
                  <p className="text-xs text-gray-500">
                    Order date: {order.date}
                  </p>
                </div>

                <Button 
                  variant="secondary" 
                  size="sm"
                  className="w-full"
                >
                  Check status
                </Button>
              </div>

              <div className="hidden md:grid md:grid-cols-[1fr_auto] gap-6">
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-base text-gray-900 mb-1">
                      <span className="font-medium">Order:</span> {order.orderNumber}
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
                  <div className="grid grid-cols-4 gap-3">
                    {order.items.map((item) => (
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