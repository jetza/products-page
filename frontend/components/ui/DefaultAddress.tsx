import React from "react";
import { cn } from "@/lib/utils/cn";
import { Radio } from "./Radio";
import { DeleteButton } from "./DeleteButton";

export interface DefaultAddressProps {
  label: string;
  address?: string;
  addressValue?: string;
  country?: string;
  countryValue?: string;
  apartment?: string;
  apartmentValue?: string;
  postalCode?: string;
  postalCodeValue?: string;
  city?: string;
  cityValue?: string;
  isDefault?: boolean;
  onDefaultChange?: (checked: boolean) => void;
  onDelete?: () => void;
  onEdit?: () => void;
  className?: string;
}

export const DefaultAddress = React.forwardRef<HTMLDivElement, DefaultAddressProps>(
  (
    {
      label,
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
      isDefault = false,
      onDefaultChange,
      onDelete,
      onEdit,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white border border-gray-200 rounded",
          className
        )}
        style={{ padding: "24px", width: "288px" }}
      >
        <div className="flex items-center" style={{ marginBottom: "24px" }}>
          <Radio
            checked={isDefault}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onDefaultChange?.(e.target.checked)}
            className="mr-[16px]"
          />
          <span className="text-base font-normal text-black">{label}</span>
        </div>

        {address && country && (
          <div className="flex" style={{ marginBottom: "16px", gap: "24px" }}>
            <div className="flex flex-col flex-1" style={{ gap: "4px" }}>
              <span className="text-sm font-normal text-gray-400">{address}</span>
              <span className="text-base font-normal text-black">{addressValue}</span>
            </div>
            <div className="flex flex-col flex-1" style={{ gap: "4px" }}>
              <span className="text-sm font-normal text-gray-400">{country}</span>
              <span className="text-base font-normal text-black">{countryValue}</span>
            </div>
          </div>
        )}

        {apartment && apartmentValue && (
          <div className="flex flex-col" style={{ marginBottom: "16px", gap: "4px" }}>
            <span className="text-sm font-normal text-gray-400">{apartment}</span>
            <span className="text-base font-normal text-black">{apartmentValue}</span>
          </div>
        )}

        {postalCode && city && (
          <div className="flex" style={{ marginBottom: "24px", gap: "24px" }}>
            <div className="flex flex-col flex-1" style={{ gap: "4px" }}>
              <span className="text-sm font-normal text-gray-400">{postalCode}</span>
              <span className="text-base font-normal text-black">{postalCodeValue}</span>
            </div>
            <div className="flex flex-col flex-1" style={{ gap: "4px" }}>
              <span className="text-sm font-normal text-gray-400">{city}</span>
              <span className="text-base font-normal text-black">{cityValue}</span>
            </div>
          </div>
        )}

        <div className="flex items-center" style={{ gap: "8px" }}>
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

DefaultAddress.displayName = "DefaultAddress";
