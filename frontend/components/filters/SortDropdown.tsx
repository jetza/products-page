import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { DropdownButton } from "@/components/ui/Buttons/DropdownButton";
import { Button } from "@/components/ui/Buttons/Button";

export interface SortOption {
  id: string;
  label: string;
}

export interface SortDropdownProps {
  options: SortOption[];
  selected: string;
  onChange: (sortId: string) => void;
  className?: string;
}

export const SortDropdown = React.forwardRef<HTMLDivElement, SortDropdownProps>(
  (
    {
      options,
      selected,
      onChange,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt.id === selected);

    const handleSelect = (optionId: string) => {
      onChange(optionId);
      setIsOpen(false);
    };

    return (
      <div ref={ref} className={cn("relative", className)}>
        <DropdownButton
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          variant="filter"
          className="min-w-[180px]"
        >
          <span className="text-base flex-1 text-left">
            {selectedOption?.label || "Sort by"}
          </span>
        </DropdownButton>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-20 min-w-[180px] py-2">
              {options.map((option) => (
                <Button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  variant="ghost"
                  type="button"
                  className={cn(
                    "w-full px-4 py-2 text-left text-base justify-start rounded-none h-auto",
                    selected === option.id && "bg-gray-100 font-medium"
                  )}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
);

SortDropdown.displayName = "SortDropdown";
