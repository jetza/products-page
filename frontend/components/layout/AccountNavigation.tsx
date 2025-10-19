import React from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Buttons/Button";

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
        <h2 className="text-big font-normal text-black">{title}</h2>

        <nav className="flex flex-col gap-6">
          {items.map((item, index) => (
            <Button
              key={index}
              onClick={item.onClick}
              variant="ghost"
              className={cn(
                "text-left text-base justify-start h-auto p-0 rounded-none",
                item.active
                  ? "font-bold text-black"
                  : "font-normal text-black hover:font-bold",
              )}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="flex-1" />

        {onLogout && (
          <Button
            onClick={onLogout}
            variant="ghost"
            className="text-left text-base font-normal text-black hover:font-bold h-auto p-0 rounded-none justify-start"
          >
            Log out
          </Button>
        )}
      </div>
    </div>
  );
});

AccountNavigation.displayName = "AccountNavigation";
