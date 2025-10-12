import React from "react";
import { cn } from "@/lib/utils/cn";
import { RadioDot } from "@/components/icons/RadioDot";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, disabled, ...props }, ref) => {
    return (
      <label
        className={cn(
          "inline-flex items-center gap-2 cursor-pointer",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <div className="relative">
          <input
            type="radio"
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-4 h-4",
              "border border-black rounded-full",
              "bg-white",
              "appearance-none cursor-pointer",
              "focus:outline-none focus:ring-0",
              "checked:border-black",
              "hover:border-gray-400",
              "checked:hover:border-gray-900",

              "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300",
              "disabled:checked:border-gray-300",
              className
            )}
            {...props}
          />
          <RadioDot
            className={cn(
              "absolute inset-0 flex items-center justify-center pointer-events-none",
              props.checked ? "opacity-100" : "opacity-0"
            )}
            disabled={disabled}
          />
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

Radio.displayName = "Radio";
