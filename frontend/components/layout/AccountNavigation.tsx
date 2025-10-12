import React from "react";
import { cn } from "@/lib/utils/cn";

export interface AccountNavigationItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export interface AccountNavigationProps {
  title?: string;
  items: AccountNavigationItem[];
  onLogout?: () => void;
  className?: string;
}

export const AccountNavigation = React.forwardRef<
  HTMLDivElement,
  AccountNavigationProps
>(({ title = "My account", items, onLogout, className }, ref) => {
  return (
    <div ref={ref} className={cn("account-navigation", className)}>
      <div className="account-navigation-inner">

        <h2 className="text-2xl font-normal text-black">{title}</h2>

        <nav className="flex flex-col gap-6">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={cn(
                "text-left text-base transition-colors",
                item.active
                  ? "font-bold text-black"
                  : "font-normal text-black hover:font-bold"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex-1" />

        {onLogout && (
          <button
            onClick={onLogout}
            className="text-left text-base font-normal text-black hover:font-bold transition-all"
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
});

AccountNavigation.displayName = "AccountNavigation";
