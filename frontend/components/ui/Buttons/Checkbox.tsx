import React from "react";
import { cn } from "@/lib/utils/cn";
import { CheckmarkIcon } from "@/components/icons";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  variant?: "checkbox" | "radio";
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, disabled, variant = "checkbox", className, ...props }, ref) => {
    const isRadioVariant = variant === "radio";

    return (
      <label
        className={cn(
          "flex items-start gap-2 cursor-pointer",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <div className="relative flex-shrink-0 w-4 h-4 mt-0.5">
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "w-4 h-4",
              "border border-black",
              isRadioVariant ? "rounded-full" : "rounded-[2px]",
              "bg-white",
              "transition-colors",
              "peer-checked:bg-black peer-checked:border-black",
              "peer-disabled:bg-gray-100 peer-disabled:border-gray-300",
              "peer-checked:peer-disabled:bg-gray-300 peer-checked:peer-disabled:border-gray-300"
            )}
          />
          {isRadioVariant ? (
            <div
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "w-2 h-2 rounded-full bg-white",
                "opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
              )}
            />
          ) : (
            <CheckmarkIcon
              className={cn(
                "absolute inset-0 w-4 h-4 text-white pointer-events-none",
                "opacity-0 peer-checked:opacity-100 transition-opacity"
              )}
            />
          )}
        </div>
        {label && (
          <span
            className={cn(
              "text-sm leading-[1.4] flex-1",
              disabled && "text-gray-400"
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
