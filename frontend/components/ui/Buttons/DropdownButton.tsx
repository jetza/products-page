import React from "react";
import { cn } from "@/lib/utils/cn";
import { ChevronDownIcon } from "@/components/icons";

export interface DropdownButtonProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  variant?: "default" | "filter" | "select" | "selectFilter";
  disabled?: boolean;
  error?: boolean;
  id?: string;
  size?: "sm" | "lg";
  customIcon?: React.ReactNode;
}

export const DropdownButton = React.forwardRef<
  HTMLButtonElement,
  DropdownButtonProps
>(
  (
    {
      children,
      isOpen,
      onClick,
      className,
      variant = "default",
      disabled = false,
      error = false,
      id,
      size = "lg",
      customIcon,
    },
    ref,
  ) => {
    const baseStyles = "inline-flex items-center transition-colors bg-white";

    const variantStyles = {
      default:
        "px-6 py-3 border border-gray-300 rounded hover:border-gray-400 gap-2",
      filter:
        "px-6 py-3 border border-gray-300 rounded hover:border-gray-400 gap-2",
      select:
        "h-12 px-4 pr-10 text-base font-normal text-left border rounded transition-all duration-200 focus:outline-none w-full justify-between",
      selectFilter: cn(
        "justify-between text-base font-normal text-left border border-gray-300 rounded transition-all duration-200 focus:outline-none",
        size === "lg" && "h-10 px-4 gap-2",
        size === "sm" && "h-[33px] px-3 gap-1",
        !disabled && ["hover:bg-gray-50"],
        disabled && [
          "border-gray-300 text-gray-400 bg-gray-50 cursor-not-allowed",
        ],
      ),
    };

    const selectStateStyles =
      variant === "select"
        ? cn(
            !error &&
              !disabled && [
                "border-gray-300 text-gray-800",
                "hover:border-gray-400",
                isOpen && "border-black",
              ],
            error &&
              !disabled && [
                "border-error text-gray-800",
                isOpen && "border-error",
              ],
            disabled && [
              "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed",
            ],
          )
        : "";

    return (
      <button
        ref={ref}
        id={id}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          selectStateStyles,
          className,
        )}
        type="button"
      >
        {children}
        {customIcon ? (
          customIcon
        ) : (
          <ChevronDownIcon
            className={cn(
              variant === "select"
                ? "transition-transform duration-200"
                : "w-4 h-4 transition-transform",
              isOpen && "rotate-180",
              disabled && "text-gray-400",
            )}
          />
        )}
      </button>
    );
  },
);

DropdownButton.displayName = "DropdownButton";
