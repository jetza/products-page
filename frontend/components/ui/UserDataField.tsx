import React from "react";
import { cn } from "@/lib/utils/cn";

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
    // Desktop layout
    if (variant === "desktop") {
      return (
        <div
          ref={ref}
          className={cn(
            "w-[600px] min-h-[79px]",
            "flex items-center",
            "bg-white border border-gray-200 rounded",
            className
          )}
          style={{ padding: "16px", gap: "24px" }}
        >
          <div className="flex-shrink-0 w-[24px] h-[24px] flex items-center justify-center">
            {icon}
          </div>

          <div className="flex flex-col flex-1" style={{ gap: "4px" }}>
            <span className="text-sm font-normal text-gray-400">{label}</span>
            <span className="text-base font-normal text-black">{value}</span>
          </div>

          {number && (
            <div className="flex flex-col flex-1" style={{ gap: "4px" }}>
              {numberLabel && (
                <span className="text-sm font-normal text-gray-400">{numberLabel}</span>
              )}
              <span className="text-base font-normal text-black whitespace-nowrap">{number}</span>
            </div>
          )}

          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="flex-shrink-0 h-[40px] text-base font-normal text-black bg-transparent border border-black rounded transition-colors hover:bg-gray-50"
              style={{ padding: "8px 16px" }}
            >
              Label
            </button>
          )}
        </div>
      );
    }

    // Mobile layout
    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          "flex flex-col",
          "bg-white border border-gray-200 rounded",
          className
        )}
        style={{ padding: "16px" }}
      >

        <div className="flex items-start" style={{ gap: "16px", marginBottom: "16px" }}>

          <div className="flex-shrink-0 w-[24px] h-[24px] flex items-center justify-center">
            {icon}
          </div>

          <div className="flex-1 flex flex-col" style={{ gap: "4px" }}>
            <span className="text-sm font-normal text-gray-400">{label}</span>
            <span className="text-base font-normal text-black">{value}</span>

            {number && (
              <div className="flex flex-col" style={{ gap: "4px", marginTop: "8px" }}>
                {numberLabel && (
                  <span className="text-sm font-normal text-gray-400">{numberLabel}</span>
                )}
                <span className="text-base font-normal text-black">{number}</span>
              </div>
            )}
          </div>
        </div>

        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="w-full h-[48px] text-base font-normal text-black bg-transparent border border-black rounded transition-colors hover:bg-gray-50"
          >
            Label
          </button>
        )}
      </div>
    );
  }
);

UserDataField.displayName = "UserDataField";
