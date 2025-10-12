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
            "w-full p-6 bg-white border border-gray-200 rounded",
            className
          )}
        >
          <div className="flex">
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-start mr-6">
              {icon}
            </div>

            <div className="flex-1 flex gap-6">
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-normal text-gray-400">{address}</span>
                  <span className="text-base font-normal text-black">{addressValue}</span>
                </div>
                {apartment && apartmentValue && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-normal text-gray-400">{apartment}</span>
                    <span className="text-base font-normal text-black">{apartmentValue}</span>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-normal text-gray-400">{postalCode}</span>
                  <span className="text-base font-normal text-black">{postalCodeValue}</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-normal text-gray-400">{country}</span>
                  <span className="text-base font-normal text-black">{countryValue}</span>
                </div>

                {apartment && apartmentValue && <div className="h-[47px]" />}

                <div className="flex flex-col gap-1">
                  <span className="text-sm font-normal text-gray-400">{city}</span>
                  <span className="text-base font-normal text-black">{cityValue}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 ml-6">
              {onDelete && <DeleteButton onDelete={onDelete} />}
              {onEdit && (
                <button
                  type="button"
                  onClick={onEdit}
                  className="flex-shrink-0 h-10 px-4 text-base font-normal text-black bg-transparent border border-black rounded transition-colors hover:bg-gray-50"
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
          "w-full p-6 bg-white border border-gray-200 rounded",
          className
        )}
      >
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mr-4">
            {icon}
          </div>

          <div className="flex flex-1 gap-6">
            <div className="flex flex-col flex-1 gap-1">
              <span className="text-sm font-normal text-gray-400">{address}</span>
              <span className="text-base font-normal text-black">{addressValue}</span>
            </div>

            <div className="flex flex-col flex-1 gap-1">
              <span className="text-sm font-normal text-gray-400">{country}</span>
              <span className="text-base font-normal text-black">{countryValue}</span>
            </div>
          </div>
        </div>

        {apartment && apartmentValue && (
          <div className="flex flex-col mb-4 ml-10 gap-1">
            <span className="text-sm font-normal text-gray-400">{apartment}</span>
            <span className="text-base font-normal text-black">{apartmentValue}</span>
          </div>
        )}

        <div className="flex mb-4 ml-10 gap-6">
          <div className="flex flex-col flex-1 gap-1">
            <span className="text-sm font-normal text-gray-400">{postalCode}</span>
            <span className="text-base font-normal text-black">{postalCodeValue}</span>
          </div>

          <div className="flex flex-col flex-1 gap-1">
            <span className="text-sm font-normal text-gray-400">{city}</span>
            <span className="text-base font-normal text-black">{cityValue}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-10">
          {onDelete && <DeleteButton onDelete={onDelete} />}
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="flex-shrink-0 h-10 px-4 text-base font-normal text-black bg-transparent border border-black rounded transition-colors hover:bg-gray-50"
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
