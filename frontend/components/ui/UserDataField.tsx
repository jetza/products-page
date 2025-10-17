import React from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "./Buttons/Button";

export interface UserDataFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  number?: string;
  numberLabel?: string;
  onEdit?: () => void;
  variant?: "desktop" | "mobile";
  className?: string;
}

export const UserDataField = React.forwardRef<HTMLDivElement, UserDataFieldProps>(
  ({ icon, label, value, number, numberLabel, onEdit, variant = "desktop", className }, ref) => {
    if (variant === "desktop") {
      return (
        <div
          ref={ref}
          className={cn(
            "w-[600px] min-h-[79px]",
            "flex items-center p-4 gap-6",
            "bg-white border border-gray-200 rounded",
            className
          )}
        >
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
            {icon}
          </div>

          <div className="flex flex-col flex-1 gap-1">
            <span className="text-sm font-normal text-gray-400">{label}</span>
            <span className="text-base font-normal text-black">{value}</span>
          </div>

          {number && (
            <div className="flex flex-col flex-1 gap-1">
              {numberLabel && (
                <span className="text-sm font-normal text-gray-400">{numberLabel}</span>
              )}
              <span className="text-base font-normal text-black whitespace-nowrap">{number}</span>
            </div>
          )}

          {onEdit && (
            <Button
              variant="secondary"
              size="md"
              onClick={onEdit}
            >
              Change
            </Button>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full p-4 flex flex-col",
          "bg-white border border-gray-200 rounded",
          className
        )}
      >

        <div className="flex items-start gap-4 mb-4">

          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
            {icon}
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <span className="text-sm font-normal text-gray-400">{label}</span>
            <span className="text-base font-normal text-black">{value}</span>

            {number && (
              <div className="flex flex-col gap-1 mt-2">
                {numberLabel && (
                  <span className="text-sm font-normal text-gray-400">{numberLabel}</span>
                )}
                <span className="text-base font-normal text-black">{number}</span>
              </div>
            )}
          </div>
        </div>

        {onEdit && (
          <Button
            variant="secondary"
            size="lg"
            onClick={onEdit}
            className="w-full"
          >
            Change
          </Button>
        )}
      </div>
    );
  }
);

UserDataField.displayName = "UserDataField";
