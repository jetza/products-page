import React from "react";
import { cn } from "@/lib/utils/cn";
import { Checkbox } from "@/components/ui/Buttons/Checkbox";

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
            <Checkbox
              key={option.id}
              checked={isChecked}
              onChange={() => handleToggle(option.id)}
              label={option.label}
            />
          );
        })}
      </div>
    );
  }
);

CheckboxFilter.displayName = "CheckboxFilter";
