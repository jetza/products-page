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
          "inline-flex items-center gap-2 cursor-pointer",
          disabled && "cursor-not-allowed"
        )}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-4 h-4">
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            className="absolute inset-0 w-full h-full opacity-0 appearance-none cursor-pointer disabled:cursor-not-allowed z-10 m-0 p-0"
            style={{ width: 0, height: 0 }}
            {...props}
          />
          <div className="absolute inset-0 pointer-events-none z-0">
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
