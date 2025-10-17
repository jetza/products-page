"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { DropdownButton } from "@/components/ui/Buttons/DropdownButton";

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
      <DropdownButton
        isOpen={isOpen}
        onClick={toggleDropdown}
        variant="selectFilter"
        disabled={disabled}
        size={size}
      >
        <span className={cn(!selectedOption && "text-gray-500")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
      </DropdownButton>

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
