import React from "react";
import { cn } from "@/lib/utils/cn";
import { RadioDot } from "@/components/icons/RadioDot";

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  disabled?: boolean;
  className?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ options, value, onChange, name, disabled, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          "h-14",
          "border border-black rounded",
          "px-4 py-4",
          "flex items-center justify-between",
          "gap-[202px]",
          disabled && "border-gray-300 bg-gray-50",
          className
        )}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "inline-flex items-center gap-2 cursor-pointer",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <div className="relative">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
                className={cn(
                  "w-4 h-4",
                  "border border-black rounded-full",
                  "bg-white",
                  "appearance-none cursor-pointer",
                  "focus:outline-none focus:ring-0",
                  "checked:border-black",
                  "hover:border-gray-400",
                  "checked:hover:border-gray-800",
                  "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300",
                  "disabled:checked:border-gray-300"
                )}
              />
              <RadioDot
                className={cn(
                  "absolute inset-0 flex items-center justify-center pointer-events-none",
                  value === option.value ? "opacity-100" : "opacity-0"
                )}
                disabled={disabled}
              />
            </div>
            <span
              className={cn(
                "text-sm leading-[1.4]",
                disabled && "text-gray-400"
              )}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
