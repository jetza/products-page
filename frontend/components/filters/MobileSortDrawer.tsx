"use client";

import React from "react";
import { Button } from "@/components/ui/Buttons/Button";
import type { SortOption } from "./SortDropdown";
import { CONTENT } from "@/lib/constants/content";

interface MobileSortDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  options: SortOption[];
  selected: string;
  onSelect: (sortId: string) => void;
}

export const MobileSortDrawer = React.memo(function MobileSortDrawer({
  isOpen,
  onClose,
  options,
  selected,
  onSelect,
}: MobileSortDrawerProps) {
  const [tempSelected, setTempSelected] = React.useState(selected);

  React.useEffect(() => {
    if (isOpen) {
      setTempSelected(selected);
    }
  }, [isOpen, selected]);

  const handleApply = React.useCallback(() => {
    onSelect(tempSelected);
    onClose();
  }, [onSelect, tempSelected, onClose]);

  const handleTempChange = React.useCallback((optionId: string) => {
    setTempSelected(optionId);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl overflow-y-auto max-h-[50vh]">
        <div className="flex flex-col h-full">
          <div className="flex-1 px-5 py-8">
            <h2 className="text-2xl font-medium mb-8">
              {CONTENT.common.sortBy}
            </h2>

            <div className="space-y-4">
              {options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span className="text-base">{option.label}</span>
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      value={option.id}
                      checked={tempSelected === option.id}
                      onChange={() => handleTempChange(option.id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        tempSelected === option.id
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    >
                      {tempSelected === option.id && (
                        <div className="w-3 h-3 rounded-full bg-black" />
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="px-5 pb-8">
            <Button
              variant="primary"
              size="lg"
              onClick={handleApply}
              className="w-full"
            >
              Show results
            </Button>
          </div>
        </div>
      </div>
    </>
  );
});
