import React from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      disabled,
      fullWidth,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className={cn("flex flex-col gap-2", fullWidth && "w-full")}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-normal text-gray-800",
              disabled && "text-gray-400"
            )}
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={cn(
            "h-12 px-4 text-base font-normal",
            "border rounded",
            "transition-all duration-200",
            "focus:outline-none",
            "placeholder:text-gray-400",
            
            !error && !disabled && [
              "border-gray-300 bg-white text-gray-800",
              "hover:border-gray-400",
              "focus:border-black",
            ],
            error && !disabled && [
              "border-error bg-white text-gray-800",
              "focus:border-error",
            ],
            disabled && [
              "border-gray-200 bg-gray-50 text-gray-400",
              "cursor-not-allowed",
            ],
            
            fullWidth && "w-full",
            className
          )}
          {...props}
        />
        {helperText && (
          <p
            className={cn(
              "text-sm font-normal",
              error ? "text-error" : "text-gray-500",
              disabled && "text-gray-400"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
