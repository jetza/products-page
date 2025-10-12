import React from "react";
import { cn } from "@/lib/utils/cn";

export interface TagProps {
  children: React.ReactNode;
  variant?: "primary" | "informative" | "disabled" | "discount";
  className?: string;
  onClick?: () => void;
}

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ children, variant = "primary", className, onClick }, ref) => {
    const isClickable = !!onClick;

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          "inline-flex items-center justify-center",
          "h-6",
          "py-1.5 px-4",
          "gap-2",
          "rounded-full",
          "text-xs leading-none font-semibold",
          isClickable && "cursor-pointer",
          variant === "primary" && "bg-black text-white",
          variant === "informative" && "bg-yellow text-black",
          variant === "disabled" && "bg-gray-100 text-gray-400",
          variant === "discount" && "bg-error text-white",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Tag.displayName = "Tag";
