"use client";

import React from "react";
import { CheckboxFilter } from "./CheckboxFilter";
import { PriceSlider } from "./PriceSlider";
import { Button } from "@/components/ui/Buttons/Button";
import { FilterOption, MATERIALS, COLORS_FILTER } from "@/lib/constants/filter-options";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  collections: FilterOption[];
  categories: FilterOption[];
  types: FilterOption[];
  selectedCollections: string[];
  selectedCategories: string[];
  selectedTypes: string[];
  selectedMaterials: string[];
  selectedColors: string[];
  priceRange: [number, number];
  onCollectionsChange: (values: string[]) => void;
  onCategoriesChange: (values: string[]) => void;
  onTypesChange: (values: string[]) => void;
  onMaterialsChange: (values: string[]) => void;
  onColorsChange: (values: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
  onApply: () => void;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  collections,
  categories,
  types,
  selectedCollections,
  selectedCategories,
  selectedTypes,
  selectedMaterials,
  selectedColors,
  priceRange,
  onCollectionsChange,
  onCategoriesChange,
  onTypesChange,
  onMaterialsChange,
  onColorsChange,
  onPriceChange,
  onApply,
}: MobileFilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Drawer - full width, with top margin to show header behind */}
      <div className="fixed inset-x-0 top-20 bottom-0 bg-white z-50 rounded-t-3xl overflow-hidden flex flex-col">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 pt-8 pb-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-4">Price</h3>
              <PriceSlider
                min={0}
                max={5000}
                value={priceRange}
                onChange={onPriceChange}
              />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">Color</h3>
              <CheckboxFilter
                options={COLORS_FILTER}
                selected={selectedColors}
                onChange={onColorsChange}
              />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">Materials</h3>
              <CheckboxFilter
                options={MATERIALS}
                selected={selectedMaterials}
                onChange={onMaterialsChange}
              />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">Collection</h3>
              <CheckboxFilter
                options={collections}
                selected={selectedCollections}
                onChange={onCollectionsChange}
              />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">Category</h3>
              <CheckboxFilter
                options={categories}
                selected={selectedCategories}
                onChange={onCategoriesChange}
              />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">Type</h3>
              <CheckboxFilter
                options={types}
                selected={selectedTypes}
                onChange={onTypesChange}
              />
            </div>
          </div>
        </div>

        {/* Footer with Show Results Button */}
        <div className="px-5 py-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              onApply();
              onClose();
            }}
            className="w-full"
          >
            Show results
          </Button>
        </div>
      </div>
    </>
  );
}
