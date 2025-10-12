import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import {
  RadioDefault,
  RadioSelected,
  RadioHover,
  RadioSelectedHoverDark,
} from "@/components/icons";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, disabled, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const renderRadioIcon = () => {
      if (disabled) {
        // Disabled state - koristimo default SVG sa smanjenom opacity
        return props.checked ? (
          <RadioSelected className="opacity-40" />
        ) : (
          <RadioDefault className="opacity-40" />
        );
      }

      if (props.checked) {
        return isHovered ? <RadioSelectedHoverDark /> : <RadioSelected />;
      }

      return isHovered ? <RadioHover /> : <RadioDefault />;
    };

    return (
      <label
        className={cn(
          "inline-flex items-center cursor-pointer",
          disabled && "cursor-not-allowed"
        )}
        style={{ gap: "8px" }}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative" style={{ width: "16px", height: "16px" }}>
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            className="absolute cursor-pointer disabled:cursor-not-allowed"
            style={{ 
              opacity: 0,
              width: "16px", 
              height: "16px",
              margin: 0,
              padding: 0,
              border: "none",
              outline: "none",
              appearance: "none",
            }}
            {...props}
          />
          <div 
            className="absolute pointer-events-none" 
            style={{ 
              top: 0, 
              left: 0, 
              width: "16px", 
              height: "16px" 
            }}
          >
            {renderRadioIcon()}
          </div>
        </div>
        {label && (
          <span
            className={cn(
              "text-sm leading-[1.4]",
              disabled && "text-gray-400"
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Radio.displayName = "Radio";
