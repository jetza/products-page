import React from "react";
import { cn } from "@/lib/utils/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

export interface ChevronButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "left" | "right";
  size?: "sm" | "md" | "lg";
  variant?: "white" | "outline";
}

export const ChevronButton = React.forwardRef<
  HTMLButtonElement,
  ChevronButtonProps
>(({ className, direction, size = "md", variant = "white", disabled, ...props }, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "rounded-full flex items-center justify-center transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        
        variant === "white" && [
          "bg-white/90 hover:bg-white shadow-lg",
        ],
        variant === "outline" && [
          "border border-black hover:bg-black hover:text-white",
        ],
        
        size === "sm" && "w-8 h-8",
        size === "md" && "w-10 h-10 md:w-12 md:h-12",
        size === "lg" && "w-12 h-12 md:w-14 md:h-14",
        
        className
      )}
      {...props}
    >
      {direction === "left" ? (
        <ChevronLeftIcon 
          className={cn(
            size === "sm" && "w-4 h-4",
            size === "md" && "w-5 h-5 md:w-6 md:h-6",
            size === "lg" && "w-6 h-6 md:w-7 md:h-7"
          )} 
        />
      ) : (
        <ChevronRightIcon 
          className={cn(
            size === "sm" && "w-4 h-4",
            size === "md" && "w-5 h-5 md:w-6 md:h-6",
            size === "lg" && "w-6 h-6 md:w-7 md:h-7"
          )} 
        />
      )}
    </button>
  );
});

ChevronButton.displayName = "ChevronButton";
