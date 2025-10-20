import React from "react";
import { cn } from "@/lib/utils/cn";
import { LoadingSpinner } from "@/components/ui/icons";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
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
      size = "md",
      disabled,
      loading,
      leftIcon,
      rightIcon,
      fullWidth,
      type = "button",
      children,
      style,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        type={type}
        style={style}
        className={cn(
          "inline-flex items-center justify-center",
          "font-medium transition-all duration-200 ease-in-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed",
          "rounded",
          "leading-none",

          size === "sm" && "h-8 px-4 gap-2 text-xs",
          size === "md" && "h-10 px-6 gap-2 text-base",
          size === "lg" && "h-12 px-6 gap-4 text-base",

          variant === "primary" && [
            "bg-button-primary-bg text-button-primary-text",
            "hover:bg-button-primary-hover",
            "disabled:bg-button-disabled-bg disabled:text-white",
          ],
          variant === "secondary" && [
            "bg-button-secondary-bg text-button-secondary-text",
            "border border-button-secondary-border",
            "hover:bg-button-secondary-hover",
            "disabled:bg-button-disabled-bg disabled:border-button-disabled-border disabled:text-button-disabled-text",
          ],
          variant === "ghost" && [
            "bg-gray-50 text-black",
            "hover:bg-gray-300",
            "disabled:text-gray-400",
          ],

          fullWidth && "w-full",

          className
        )}
        {...props}
      >
        {loading && <LoadingSpinner className="animate-spin h-4 w-4" />}
        {!loading && leftIcon && (
          <span className="flex-shrink-0">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
