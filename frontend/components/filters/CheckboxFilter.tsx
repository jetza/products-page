import React from "react";
import { cn } from "@/lib/utils/cn";

export interface CheckboxFilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface CheckboxFilterProps {
  options: CheckboxFilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}

export const CheckboxFilter = React.forwardRef<HTMLDivElement, CheckboxFilterProps>(
  (
    {
      options,
      selected,
      onChange,
      className,
    },
    ref
  ) => {
    const handleToggle = (optionId: string) => {
      const isSelected = selected.includes(optionId);
      
      if (isSelected) {
        onChange(selected.filter(id => id !== optionId));
      } else {
        onChange([...selected, optionId]);
      }
    };

    return (
      <div ref={ref} className={cn("space-y-3", className)}>
        {options.map((option) => {
          const isChecked = selected.includes(option.id);
          
          return (
            <label
              key={option.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(option.id)}
                className={cn(
                  "w-5 h-5 rounded border-2 transition-colors appearance-none cursor-pointer bg-center bg-no-repeat bg-contain",
                  isChecked
                    ? "bg-black border-black"
                    : "bg-white border-gray-300 group-hover:border-gray-400"
                )}
                style={{
                  backgroundImage: isChecked
                    ? `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 10L8 14L16 6' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
                    : undefined,
                }}
              />

              <span className="flex-1 text-base text-gray-800 group-hover:text-black">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    );
  }
);

CheckboxFilter.displayName = "CheckboxFilter";
