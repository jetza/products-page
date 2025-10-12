import React from "react";
import { cn } from "@/lib/utils/cn";
import { DeleteButton } from "./DeleteButton";

export interface AddressProps {
  icon: React.ReactNode;
  address: string;
  addressValue: string;
  country: string;
  countryValue: string;
  apartment?: string;
  apartmentValue?: string;
  postalCode: string;
  postalCodeValue: string;
  city: string;
  cityValue: string;
  onDelete?: () => void;
  onEdit?: () => void;
  variant?: "desktop" | "mobile";
  className?: string;
}

export const Address = React.forwardRef<HTMLDivElement, AddressProps>(
  (
    {
      icon,
      address,
      addressValue,
      country,
      countryValue,
      apartment,
      apartmentValue,
      postalCode,
      postalCodeValue,
      city,
      cityValue,
      onDelete,
      onEdit,
      variant = "desktop",
      className,
    },
    ref
  ) => {
    // Desktop layout
    if (variant === "desktop") {
      return (
        <div
          ref={ref}
          className={cn(
            "w-full",
            "bg-white border border-gray-200 rounded",
            className
          )}
          style={{ padding: "24px" }}
        >
          <div className="flex">
            <div className="flex-shrink-0 w-[24px] h-[24px] flex items-center justify-start" style={{ marginRight: "24px" }}>
              {icon}
            </div>

            <div className="flex-1 flex" style={{ gap: "24px" }}>
              <div className="flex-1 flex flex-col" style={{ gap: "16px" }}>
                <div className="flex flex-col" style={{ gap: "4px" }}>
                  <span className="text-sm font-normal text-gray-400">{address}</span>
                  <span className="text-base font-normal text-black">{addressValue}</span>
                </div>
                {apartment && apartmentValue && (
                  <div className="flex flex-col" style={{ gap: "4px" }}>
                    <span className="text-sm font-normal text-gray-400">{apartment}</span>
                    <span className="text-base font-normal text-black">{apartmentValue}</span>
                  </div>
                )}
                <div className="flex flex-col" style={{ gap: "4px" }}>
                  <span className="text-sm font-normal text-gray-400">{postalCode}</span>
                  <span className="text-base font-normal text-black">{postalCodeValue}</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col" style={{ gap: "16px" }}>
                <div className="flex flex-col" style={{ gap: "4px" }}>
                  <span className="text-sm font-normal text-gray-400">{country}</span>
                  <span className="text-base font-normal text-black">{countryValue}</span>
                </div>

                {apartment && apartmentValue && <div style={{ height: "47px" }} />}

                <div className="flex flex-col" style={{ gap: "4px" }}>
                  <span className="text-sm font-normal text-gray-400">{city}</span>
                  <span className="text-base font-normal text-black">{cityValue}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start" style={{ gap: "8px", marginLeft: "24px" }}>
              {onDelete && <DeleteButton onDelete={onDelete} />}
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
          </div>
        </div>
      );
    }

    // Mobile layout
    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          "bg-white border border-gray-200 rounded",
          className
        )}
        style={{ padding: "24px" }}
      >
        <div className="flex items-start" style={{ marginBottom: "16px" }}>
          <div className="flex-shrink-0 w-[24px] h-[24px] flex items-center justify-center" style={{ marginRight: "16px" }}>
            {icon}
          </div>

          <div className="flex flex-1" style={{ gap: "24px" }}>
            <div className="flex flex-col flex-1" style={{ gap: "4px" }}>
              <span className="text-sm font-normal text-gray-400">{address}</span>
              <span className="text-base font-normal text-black">{addressValue}</span>
            </div>

            <div className="flex flex-col flex-1" style={{ gap: "4px" }}>
              <span className="text-sm font-normal text-gray-400">{country}</span>
              <span className="text-base font-normal text-black">{countryValue}</span>
            </div>
          </div>
        </div>

        {apartment && apartmentValue && (
          <div className="flex flex-col" style={{ marginBottom: "16px", marginLeft: "40px", gap: "4px" }}>
            <span className="text-sm font-normal text-gray-400">{apartment}</span>
            <span className="text-base font-normal text-black">{apartmentValue}</span>
          </div>
        )}

        <div className="flex" style={{ marginBottom: "16px", marginLeft: "40px", gap: "24px" }}>
          <div className="flex flex-col flex-1" style={{ gap: "4px" }}>
            <span className="text-sm font-normal text-gray-400">{postalCode}</span>
            <span className="text-base font-normal text-black">{postalCodeValue}</span>
          </div>

          <div className="flex flex-col flex-1" style={{ gap: "4px" }}>
            <span className="text-sm font-normal text-gray-400">{city}</span>
            <span className="text-base font-normal text-black">{cityValue}</span>
          </div>
        </div>

        <div className="flex items-center" style={{ gap: "8px", marginLeft: "40px" }}>
          {onDelete && <DeleteButton onDelete={onDelete} />}
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
      </div>
    );
  }
);

Address.displayName = "Address";
