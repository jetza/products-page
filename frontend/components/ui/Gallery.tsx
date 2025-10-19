import React from "react";
import { cn } from "@/lib/utils/cn";

export interface GalleryProps {
  total: number;
  current: number;
  onSelect?: (index: number) => void;
  className?: string;
}

export const Gallery = React.forwardRef<HTMLDivElement, GalleryProps>(
  ({ total, current, onSelect, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center", "gap-4", className)}
      >
        {Array.from({ length: total }, (_, index) => {
          const itemNumber = index + 1;
          const isActive = itemNumber === current;
          const isClickable = !!onSelect;

          return (
            <button
              key={itemNumber}
              onClick={() => onSelect?.(itemNumber)}
              disabled={!isClickable}
              className={cn(
                "text-base leading-[1.375] font-normal",
                "h-[22px]",
                "min-w-[10px]",
                "flex items-center justify-center",
                isClickable && "cursor-pointer",
                !isClickable && "cursor-default",
                isActive && "font-semibold text-black",
                !isActive && "text-gray-400",
                !isActive && isClickable && "hover:text-gray-600",
                "bg-transparent border-0 p-0",
                "focus:outline-none",
              )}
            >
              {itemNumber}
            </button>
          );
        })}
      </div>
    );
  },
);

Gallery.displayName = "Gallery";
