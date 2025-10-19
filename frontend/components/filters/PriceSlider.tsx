"use client";

import { useState, useRef, useCallback, useMemo } from "react";

interface PriceSliderProps {
  min?: number;
  max?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export const PriceSlider = ({ min = 0, max = 10000, value, onChange }: PriceSliderProps) => {
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const updateValue = useCallback(
    (clientX: number) => {
      if (!sliderRef.current || !isDragging) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const percent = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width)
      );
      const newValue = Math.round(min + percent * (max - min));

      if (isDragging === "min" && newValue <= value[1]) {
        onChange([newValue, value[1]]);
      } else if (isDragging === "max" && newValue >= value[0]) {
        onChange([value[0], newValue]);
      }
    },
    [isDragging, min, max, value, onChange]
  );

  const handleMouseDown = useCallback((type: "min" | "max") => {
    setIsDragging(type);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      updateValue(e.clientX);
    },
    [updateValue]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length > 0) {
        updateValue(e.touches[0].clientX);
      }
    },
    [updateValue]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(null);
  }, []);

  const { minPercent, maxPercent } = useMemo(() => {
    const minPercent = ((value[0] - min) / (max - min)) * 100;
    const maxPercent = ((value[1] - min) / (max - min)) * 100;
    return { minPercent, maxPercent };
  }, [value, min, max]);

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <span className="text-base text-gray-900">€{value[0]}</span>
        <span className="text-base text-gray-900">€{value[1]}</span>
      </div>

      <div
        ref={sliderRef}
        className="relative h-1 bg-gray-200 rounded cursor-pointer"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseUp={handleEnd}
        onTouchEnd={handleEnd}
        onMouseLeave={handleEnd}
      >
        <div
          className="absolute h-full bg-black rounded"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        <div
          className="absolute w-4 h-4 bg-white border-2 border-black rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 top-1/2 touch-none"
          style={{ left: `${minPercent}%` }}
          onMouseDown={() => handleMouseDown("min")}
          onTouchStart={() => handleMouseDown("min")}
        />

        <div
          className="absolute w-4 h-4 bg-white border-2 border-black rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 top-1/2 touch-none"
          style={{ left: `${maxPercent}%` }}
          onMouseDown={() => handleMouseDown("max")}
          onTouchStart={() => handleMouseDown("max")}
        />
      </div>
    </div>
  );
};
