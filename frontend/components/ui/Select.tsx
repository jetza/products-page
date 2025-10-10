"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { ChevronDown } from "@/components/icons/ChevronIcons";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  id?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  helperText,
  error,
  fullWidth,
  disabled,
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectId = id || 'select-' + Math.random().toString(36).substr(2, 9);

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
    <div ref={selectRef} className={cn("flex flex-col gap-2", fullWidth && "w-full")}>
      {label && (
        <label htmlFor={selectId} className={cn("text-sm font-normal text-gray-800", disabled && "text-gray-400")}>
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          id={selectId}
          disabled={disabled}
          onClick={toggleDropdown}
          className={cn(
            "h-12 px-4 pr-10 text-base font-normal text-left border rounded transition-all duration-200 focus:outline-none w-full flex items-center justify-between",
            !error && !disabled && ["border-gray-300 bg-white text-gray-900", "hover:border-gray-400", isOpen && "border-black"],
            error && !disabled && ["border-error bg-white text-gray-900", isOpen && "border-error"],
            disabled && ["border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"]
          )}
        >
          <span className={cn(!selectedOption && "text-gray-400")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={cn("transition-transform duration-200", isOpen && "rotate-180", disabled && "text-gray-400")} />
        </button>
        {isOpen && !disabled && (
          <div className={cn("absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded shadow-lg max-h-[448px] overflow-y-auto")}>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "w-full h-14 px-4 text-left text-base transition-colors duration-150 hover:bg-gray-50 hover:font-semibold focus:outline-none",
                  option.value === value && "bg-black text-white font-semibold"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {helperText && (
        <p className={cn("text-sm font-normal", error ? "text-error" : "text-gray-500", disabled && "text-gray-400")}>
          {helperText}
        </p>
      )}
    </div>
  );
};

Select.displayName = "Select";
