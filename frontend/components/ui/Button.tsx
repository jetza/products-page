import React from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "lg",
      disabled,
      loading,
      leftIcon,
      rightIcon,
      fullWidth,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center",
          "font-medium transition-all duration-200 ease-in-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed",
          "rounded",
          size === "sm" && "h-8 py-2 px-4 gap-2 text-[12px] leading-none",
          size === "lg" && "h-12 py-2 px-6 gap-4 text-base leading-none",

          variant === "primary" && [
            "bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]",
            "hover:bg-[var(--button-primary-hover-bg)]",
            "disabled:bg-[var(--button-disabled-bg)] disabled:text-[var(--button-disabled-text)]",
          ],
          variant === "secondary" && [
            "bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)]",
            "border border-[var(--button-secondary-border)]",
            "hover:bg-[var(--button-secondary-hover-bg)]",
            "disabled:border-[var(--button-disabled-border)] disabled:text-[var(--button-disabled-text)]",

            "dark:border-white dark:text-white",
            "dark:hover:bg-white/10",
            "dark:disabled:border-gray-600 dark:disabled:text-gray-600",
          ],
          
          fullWidth && "w-full",
          
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
