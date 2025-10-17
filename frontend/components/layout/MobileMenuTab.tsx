import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Buttons/Button";

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
          <Button
            onClick={() => handleTabChange("personal")}
            variant="ghost"
            className={cn(
              "flex-1 h-[72px] rounded-none",
              activeTab === "personal"
                ? "font-bold"
                : "font-normal"
            )}
          >
            Personal & security
          </Button>

          <Button
            onClick={() => handleTabChange("orders")}
            variant="ghost"
            className={cn(
              "flex-1 h-[72px] rounded-none",
              activeTab === "orders"
                ? "font-bold"
                : "font-normal"
            )}
          >
            My orders
          </Button>
        </div>

        {children && <div className="w-full">{children}</div>}
      </div>
    );
  }
);

MobileMenu.displayName = "MobileMenu";
