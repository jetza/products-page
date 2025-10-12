import React from "react";
import { cn } from "@/lib/utils/cn";
import { TrashIcon } from "@/components/icons";

export interface DeleteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onDelete?: () => void;
  className?: string;
}

export const DeleteButton = React.forwardRef<
  HTMLButtonElement,
  DeleteButtonProps
>(({ onDelete, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onDelete}
      className={cn(
        "flex-shrink-0 w-[40px] h-[40px]",
        "flex items-center justify-center",
        "text-black bg-transparent",
        "border border-black rounded",
        "transition-colors hover:bg-gray-50",
        className
      )}
      {...props}
    >
      <TrashIcon className="w-6 h-6" />
    </button>
  );
});

DeleteButton.displayName = "DeleteButton";
