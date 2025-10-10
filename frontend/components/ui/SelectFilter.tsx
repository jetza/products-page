"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { ChevronDown } from "@/components/icons/ChevronIcons";

export interface SelectFilterOption {
  value: string;
  label: string;
}

export interface SelectFilterProps {
  options?: SelectFilterOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: "sm" | "lg";
  disabled?: boolean;
  className?: string;
}

export const SelectFilter: React.FC<SelectFilterProps> = ({
  options = [],
  value,
  onChange,
  placeholder = "Filter",
  size = "lg",
  disabled,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    if (!disabled) {
      onChange?.(optionValue);
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={selectRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={toggleDropdown}
        className={cn(
          "inline-flex items-center justify-between",
          "text-sm font-normal text-left",
          "border border-black rounded",
          "transition-all duration-200",
          "focus:outline-none",
          "bg-white",
          size === "lg" && "h-10 px-4 gap-2",
          size === "sm" && "h-[33px] px-3 gap-1",
          !disabled && [
            "hover:bg-gray-50",
            isOpen && "bg-gray-50",
          ],
          
          disabled && [
            "border-gray-300 text-gray-400 bg-gray-50",
            "cursor-not-allowed",
          ],
        )}
      >
        <span className={cn(!selectedOption && "text-gray-500")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180",
            disabled && "text-gray-400"
          )} 
        />
      </button>

      {isOpen && !disabled && (
        <div className={cn(
          "absolute z-50 mt-2",
          "bg-white border border-gray-300 rounded",
          "shadow-lg",
          "min-w-full",
          "max-h-[300px] overflow-y-auto"
        )}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={cn(
                "w-full px-4 py-2 text-left text-sm",
                "transition-colors duration-150",
                "hover:bg-gray-50 hover:font-semibold",
                "focus:outline-none",
                "whitespace-nowrap",
                option.value === value && "bg-gray-100 font-semibold"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

SelectFilter.displayName = "SelectFilter";
