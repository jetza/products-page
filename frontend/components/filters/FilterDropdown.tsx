"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { DropdownButton } from "@/components/ui/Buttons/DropdownButton";

export interface FilterDropdownProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const FilterDropdown = React.forwardRef<HTMLDivElement, FilterDropdownProps>(
  (
    {
      label,
      children,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div ref={ref} className={cn("relative", className)}>
        <DropdownButton
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          variant="filter"
        >
          <span className="text-base">{label}</span>
        </DropdownButton>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            <div 
              className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-20 p-6 w-[243px]"
            >
              {children}
            </div>
          </>
        )}
      </div>
    );
  }
);

FilterDropdown.displayName = "FilterDropdown";
