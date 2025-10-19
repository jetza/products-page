import React from "react";
import { cn } from "@/lib/utils/cn";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

export interface ArrowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "left" | "right";
  size?: "sm" | "lg";
  variant?: "default" | "outline";
}

export const ArrowButton = React.forwardRef<
  HTMLButtonElement,
  ArrowButtonProps
>(
  (
    {
      className,
      direction,
      size = "lg",
      variant = "default",
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        style={{
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className={cn(
          "rounded-full",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          size === "lg" && "w-12 h-12",
          size === "sm" && "w-6 h-6",

          variant === "default" && [
            "bg-black text-white",
            "hover:bg-gray-800",
            "disabled:bg-gray-300 disabled:cursor-not-allowed",
          ],
          variant === "outline" && [
            "bg-white text-black",
            "border border-black",
            "hover:bg-gray-100",
            "disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed",
          ],

          className,
        )}
        {...props}
      >
        {direction === "left" ? (
          <ArrowLeftIcon className={size === "lg" ? "w-6 h-6" : "w-3 h-3"} />
        ) : (
          <ArrowRightIcon className={size === "lg" ? "w-6 h-6" : "w-3 h-3"} />
        )}
      </button>
    );
  },
);

ArrowButton.displayName = "ArrowButton";
