import React from "react";
import { cn } from "@/lib/utils/cn";
import { CheckmarkIcon } from "@/components/icons";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  variant?: "checkbox" | "radio";
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, disabled, variant = "checkbox", ...props }, ref) => {
    const isRadioVariant = variant === "radio";

    return (
      <label
        className={cn(
          "inline-flex items-center gap-2 cursor-pointer",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <div className="relative w-4 h-4">
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            className="absolute inset-0 opacity-0 appearance-none cursor-pointer disabled:cursor-not-allowed z-10 m-0 p-0 w-0 h-0"
            {...props}
          />
          <div
            className={cn(
              "absolute inset-0",
              "border border-black",
              isRadioVariant ? "rounded-full" : "rounded-[2px]",
              "bg-white",
              "pointer-events-none",
              props.checked && "bg-black border-black",
              disabled && "bg-gray-100 border-gray-300",
              disabled && props.checked && "bg-gray-300 border-gray-300"
            )}
          />
          {isRadioVariant ? (
            <div
              className={cn(
                "absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                props.checked ? "opacity-100" : "opacity-0"
              )}
            >
              <div
                className="rounded-full bg-white w-2 h-2"
              />
            </div>
          ) : (
            <CheckmarkIcon
              className={cn(
                "absolute inset-0 w-4 h-4 pointer-events-none",
                props.checked ? "opacity-100" : "opacity-0"
              )}
            />
          )}
        </div>
        {label && (
          <span
            className={cn(
              "text-sm leading-[1.4]",
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
