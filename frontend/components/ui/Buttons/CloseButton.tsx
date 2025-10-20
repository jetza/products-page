import React from "react";
import { cn } from "@/lib/utils/cn";
import { XIcon } from "@/components/ui/icons";

export interface CloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClose?: () => void;
  variant?: "default" | "minimal" | "light";
  size?: "sm" | "md";
  className?: string;
}

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(({ onClose, variant = "default", size = "md", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClose}
      className={cn(
        "transition-colors",
        variant === "default" && [
          "hover:bg-gray-100 rounded-full",
          size === "md" && "p-2",
          size === "sm" && "p-1",
        ],
        variant === "minimal" && ["text-black hover:text-gray-600"],
        variant === "light" && ["text-white"],
        className
      )}
      aria-label="Close"
      {...props}
    >
      <XIcon
        className={cn(size === "md" && "w-6 h-6", size === "sm" && "w-5 h-5")}
      />
    </button>
  );
});

CloseButton.displayName = "CloseButton";
