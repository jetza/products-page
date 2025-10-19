import React from "react";
import { cn } from "@/lib/utils/cn";
import { TrashIcon } from "@/components/icons";

export interface DeleteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onDelete?: () => void;
  variant?: "default" | "ghost";
  className?: string;
}

export const DeleteButton = React.forwardRef<
  HTMLButtonElement,
  DeleteButtonProps
>(({ onDelete, variant = "default", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onDelete}
      className={cn(
        "flex-shrink-0",
        "flex items-center justify-center",
        "text-black",
        "transition-colors",
        variant === "default" && [
          "w-[40px] h-[40px]",
          "bg-transparent",
          "border border-black rounded",
          "hover:bg-gray-50",
        ],
        variant === "ghost" && ["w-11 h-11", "hover:bg-gray-100 rounded"],
        className,
      )}
      {...props}
    >
      <TrashIcon className="w-6 h-6" />
    </button>
  );
});

DeleteButton.displayName = "DeleteButton";
