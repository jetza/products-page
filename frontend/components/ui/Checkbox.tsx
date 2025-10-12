import React from "react";
import { cn } from "@/lib/utils/cn";
import { CheckmarkIcon } from "@/components/icons";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  variant?: "checkbox" | "radio";
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, disabled, variant = "checkbox", ...props }, ref) => {
    const isRadioVariant = variant === "radio";

    return (
      <label
        className={cn(
          "inline-flex items-center gap-2 cursor-pointer",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <div className="relative">
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-4 h-4",
              "border border-black",
              isRadioVariant ? "rounded-full" : "rounded-[2px]",
              "bg-white",
              "appearance-none cursor-pointer",
              "focus:outline-none focus:ring-0",
              isRadioVariant
                ? "checked:bg-black checked:border-black"
                : "checked:bg-black checked:border-black",
              "hover:border-gray-400",
              "checked:hover:bg-gray-900 checked:hover:border-gray-900",
              "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300",
              "disabled:checked:bg-gray-300 disabled:checked:border-gray-300",
              className
            )}
            {...props}
          />
          {isRadioVariant ? (
            <div
              className={cn(
                "absolute pointer-events-none",
                props.checked ? "opacity-100" : "opacity-0"
              )}
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="rounded-full bg-white"
                style={{ width: "8px", height: "8px" }}
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
