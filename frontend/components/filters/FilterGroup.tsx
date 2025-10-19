import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { ChevronDownIcon } from "@/components/icons";
import { Button } from "@/components/ui/Buttons/Button";

export interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  className?: string;
}

export const FilterGroup = React.memo(
  React.forwardRef<HTMLDivElement, FilterGroupProps>(
    (
      { title, children, collapsible = true, defaultOpen = true, className },
      ref,
    ) => {
      const [isOpen, setIsOpen] = useState(defaultOpen);

      const toggleOpen = React.useCallback(() => {
        if (collapsible) {
          setIsOpen((prev) => !prev);
        }
      }, [collapsible]);

      return (
        <div
          ref={ref}
          className={cn("border-b border-gray-200 pb-6", className)}
        >
          <Button
            onClick={toggleOpen}
            variant="ghost"
            disabled={!collapsible}
            type="button"
            className={cn(
              "w-full flex items-center justify-between mb-4 h-auto p-0 rounded-none",
              collapsible ? "cursor-pointer" : "cursor-default",
            )}
            rightIcon={
              collapsible ? (
                <ChevronDownIcon
                  className={cn(
                    "w-5 h-5 text-gray-600 transition-transform",
                    isOpen ? "rotate-180" : "rotate-0",
                  )}
                />
              ) : undefined
            }
          >
            <h3 className="text-base font-semibold text-black">{title}</h3>
          </Button>

          {isOpen && (
            <div className="animate-in fade-in duration-200">{children}</div>
          )}
        </div>
      );
    },
  ),
);

FilterGroup.displayName = "FilterGroup";
