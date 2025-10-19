"use client";

import React from "react";
import { CheckboxFilter } from "./CheckboxFilter";
import { PriceSlider } from "./PriceSlider";
import { Button } from "@/components/ui/Buttons/Button";
import {
  FilterOption,
  MATERIALS,
  COLORS_FILTER,
} from "@/lib/constants/filter-options.config";
import { CONTENT } from "@/lib/constants/content";

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
  showPriceFilter?: boolean;
  showColorFilter?: boolean;
  showMaterialFilter?: boolean;
  showCollectionFilter?: boolean;
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
  showPriceFilter = true,
  showColorFilter = true,
  showMaterialFilter = true,
  showCollectionFilter = true,
}: MobileFilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      <div className="fixed inset-x-0 bottom-0 bg-white z-50 rounded-t-3xl overflow-hidden max-h-[80vh]">
        <div className="overflow-y-auto px-5 pt-8 pb-6 max-h-[calc(80vh-80px)]">
          <div className="space-y-6">
            {showPriceFilter && (
              <div>
                <h3 className="text-xl font-medium mb-4">
                  {CONTENT.filters.price}
                </h3>
                <PriceSlider
                  min={0}
                  max={5000}
                  value={priceRange}
                  onChange={onPriceChange}
                />
              </div>
            )}

            {showColorFilter && (
              <div>
                <h3 className="text-xl font-medium mb-4">
                  {CONTENT.filters.color}
                </h3>
                <CheckboxFilter
                  options={COLORS_FILTER}
                  selected={selectedColors}
                  onChange={onColorsChange}
                />
              </div>
            )}

            {showMaterialFilter && (
              <div>
                <h3 className="text-xl font-medium mb-4">
                  {CONTENT.filters.materials}
                </h3>
                <CheckboxFilter
                  options={MATERIALS}
                  selected={selectedMaterials}
                  onChange={onMaterialsChange}
                />
              </div>
            )}

            {showCollectionFilter && collections.length > 0 && (
              <div>
                <h3 className="text-xl font-medium mb-4">
                  {CONTENT.filters.collection}
                </h3>
                <CheckboxFilter
                  options={collections}
                  selected={selectedCollections}
                  onChange={onCollectionsChange}
                />
              </div>
            )}

            <div>
              <h3 className="text-xl font-medium mb-4">
                {CONTENT.filters.category}
              </h3>
              <CheckboxFilter
                options={categories}
                selected={selectedCategories}
                onChange={onCategoriesChange}
              />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">
                {CONTENT.filters.type}
              </h3>
              <CheckboxFilter
                options={types}
                selected={selectedTypes}
                onChange={onTypesChange}
              />
            </div>
          </div>
        </div>

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
            {CONTENT.common.showResults}
          </Button>
        </div>
      </div>
    </>
  );
}
