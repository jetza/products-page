import React from "react";
import { cn } from "@/lib/utils/cn";
import { LoadingSpinner } from "@/components/icons";

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

    const sizeStyles = {
      sm: { height: "32px", padding: "8px 16px", gap: "8px", fontSize: "12px" },
      md: { height: "40px", padding: "8px 24px", gap: "8px", fontSize: "16px" },
      lg: { height: "48px", padding: "12px 24px", gap: "16px", fontSize: "16px" },
    };

    const backgroundStyle = variant === "ghost" ? { background: "var(--color-gray-50)" } : {};

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        type={type}
        style={{
          ...sizeStyles[size],
          ...backgroundStyle,
          ...style,
        }}
        className={cn(
          "inline-flex items-center justify-center",
          "font-medium transition-all duration-200 ease-in-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed",
          "rounded",
          "leading-none",

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
          variant === "ghost" && [
            "text-black",
            "hover:bg-gray-300",
            "disabled:text-gray-400",
          ],
          
          fullWidth && "w-full",
          
          className
        )}
        {...props}
      >
        {loading && <LoadingSpinner className="animate-spin h-4 w-4" />}
        {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
