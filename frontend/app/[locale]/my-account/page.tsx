"use client";

import React, { useState } from "react";
import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { AccountNavigation } from "@/components/layout/AccountNavigation";
import { MobileMenu, MobileMenuTab } from "@/components/layout/MobileMenuTab";
import { PersonalSecurity } from "@/components/account/PersonalSecurity";
import { MyOrders } from "@/components/account/MyOrders";
import { CONTENT } from "@/lib/constants/content";

export type AccountTab = "personal" | "orders";

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState<AccountTab>("personal");

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logging out...");
  };

  const handleTabChange = (tab: MobileMenuTab) => {
    setActiveTab(tab);
  };

  const navigationItems = [
    {
      label: CONTENT.account.personalSecurity,
      onClick: () => setActiveTab("personal"),
      active: activeTab === "personal",
    },
    {
      label: CONTENT.account.myOrders,
      onClick: () => setActiveTab("orders"),
      active: activeTab === "orders",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <ResponsiveHeader />

      <main className="flex-1 py-8 md:py-16">
        <div className="md:hidden px-5 mb-8">
          <MobileMenu defaultTab={activeTab} onTabChange={handleTabChange} />
        </div>

        <div className="hidden md:grid md:grid-cols-[auto_1fr] md:gap-8 lg:gap-12">
          <AccountNavigation
            items={navigationItems}
            onLogout={handleLogout}
            className="px-5 lg:pl-[116px] -mt-16"
          />

          <div className="px-5 lg:pl-0 lg:pr-0 lg:ml-[412px] lg:w-[700px]">
            {activeTab === "personal" && <PersonalSecurity />}
            {activeTab === "orders" && <MyOrders />}
          </div>
        </div>

        <div className="md:hidden px-5">
          {activeTab === "personal" && <PersonalSecurity />}
          {activeTab === "orders" && <MyOrders />}

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-base font-medium mb-4">
              {CONTENT.account.logout}
            </h3>
            <button
              onClick={handleLogout}
              className="w-full h-12 bg-white border border-black text-black text-base font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              {CONTENT.account.logout}
            </button>
          </div>
        </div>
      </main>

      <ResponsiveFooter />
    </div>
  );
}
