import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";

export type MobileMenuTab = "personal" | "orders";

export interface MobileMenuProps {
  defaultTab?: MobileMenuTab;
  onTabChange?: (tab: MobileMenuTab) => void;
  className?: string;
  children?: React.ReactNode;
}

export const MobileMenu = React.forwardRef<HTMLDivElement, MobileMenuProps>(
  ({ defaultTab = "personal", onTabChange, className, children }, ref) => {
    const [activeTab, setActiveTab] = useState<MobileMenuTab>(defaultTab);

    const handleTabChange = (tab: MobileMenuTab) => {
      setActiveTab(tab);
      onTabChange?.(tab);
    };

    return (
      <div ref={ref} className={cn("w-full", className)}>
        <div className="flex w-full border-b border-gray-100">
          <button
            onClick={() => handleTabChange("personal")}
            className={cn(
              "flex-1 h-[72px]",
              "flex items-center justify-center",
              "text-base transition-all",
              activeTab === "personal"
                ? "font-bold text-black"
                : "font-normal text-black hover:bg-gray-50"
            )}
          >
            Personal & security
          </button>

          <button
            onClick={() => handleTabChange("orders")}
            className={cn(
              "flex-1 h-[72px]",
              "flex items-center justify-center",
              "text-base transition-all",
              activeTab === "orders"
                ? "font-bold text-black"
                : "font-normal text-black hover:bg-gray-50"
            )}
          >
            My orders
          </button>
        </div>

        {children && <div className="w-full">{children}</div>}
      </div>
    );
  }
);

MobileMenu.displayName = "MobileMenu";
