import React from "react";
import { cn } from "@/lib/utils/cn";
import { Radio } from "../Buttons/Radio";
import { DeleteButton } from "../Buttons/DeleteButton";
import { Button } from "../Buttons/Button";

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

export const DefaultAddress = React.forwardRef<
  HTMLDivElement,
  DefaultAddressProps
>(
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
          "bg-white border border-gray-200 rounded p-6 w-72",
          className
        )}
      >
        <div className="flex items-center mb-6">
          <Radio
            checked={isDefault}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onDefaultChange?.(e.target.checked)
            }
            className="mr-4"
          />
          <span className="text-base font-normal text-black">{label}</span>
        </div>

        {address && country && (
          <div className="flex mb-4 gap-6">
            <div className="flex flex-col flex-1 gap-1">
              <span className="text-sm font-normal text-gray-400">
                {address}
              </span>
              <span className="text-base font-normal text-black">
                {addressValue}
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <span className="text-sm font-normal text-gray-400">
                {country}
              </span>
              <span className="text-base font-normal text-black">
                {countryValue}
              </span>
            </div>
          </div>
        )}

        {apartment && apartmentValue && (
          <div className="flex flex-col mb-4 gap-1">
            <span className="text-sm font-normal text-gray-400">
              {apartment}
            </span>
            <span className="text-base font-normal text-black">
              {apartmentValue}
            </span>
          </div>
        )}

        {postalCode && city && (
          <div className="flex mb-6 gap-6">
            <div className="flex flex-col flex-1 gap-1">
              <span className="text-sm font-normal text-gray-400">
                {postalCode}
              </span>
              <span className="text-base font-normal text-black">
                {postalCodeValue}
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <span className="text-sm font-normal text-gray-400">{city}</span>
              <span className="text-base font-normal text-black">
                {cityValue}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          {onDelete && <DeleteButton onDelete={onDelete} />}
          {onEdit && (
            <Button variant="secondary" size="md" onClick={onEdit}>
              Change
            </Button>
          )}
        </div>
      </div>
    );
  }
);

DefaultAddress.displayName = "DefaultAddress";
