"use client";

import React, { useState } from "react";
import { FilterDropdown } from "@/components/filters/FilterDropdown";
import { CheckboxFilter } from "@/components/filters/CheckboxFilter";
import { SortDropdown } from "@/components/filters/SortDropdown";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductCardProps } from "@/components/shop/ProductCard";
import { DropdownButton } from "@/components/ui/Buttons/DropdownButton";
import { PlusIcon } from "@/components/icons";
import { useProductFilter } from "@/lib/hooks/useProductFilter";
import { COLLECTIONS, CATEGORIES, TYPES, SORT_OPTIONS } from "@/lib/constants/filter-options";

interface ShopClientProps {
  products: ProductCardProps[];
}

export function ShopClient({ products: shopItems }: ShopClientProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const { filteredProducts, filters, sort } = useProductFilter(shopItems, {
    enableCollectionFilter: true,
  });

  const {
    selectedCollections,
    setSelectedCollections,
    selectedCategories,
    setSelectedCategories,
    selectedTypes,
    setSelectedTypes,
  } = filters;

  const { sortBy, setSortBy } = sort;

  return (
    <>
      <div className="flex md:hidden items-center justify-between mb-8">
        <DropdownButton
          isOpen={isFilterOpen}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          variant="filter"
          customIcon={
            <PlusIcon 
              className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-45' : ''}`} 
            />
          }
        >
          <span className="text-base">Filter</span>
        </DropdownButton>

        <SortDropdown
          options={SORT_OPTIONS}
          selected={sortBy}
          onChange={setSortBy}
        />
      </div>

      <div className="hidden md:flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <FilterDropdown label="Collection">
            <CheckboxFilter
              options={COLLECTIONS}
              selected={selectedCollections}
              onChange={setSelectedCollections}
            />
          </FilterDropdown>

          <FilterDropdown label="Category">
            <CheckboxFilter
              options={CATEGORIES}
              selected={selectedCategories}
              onChange={setSelectedCategories}
            />
          </FilterDropdown>

          <FilterDropdown label="Type">
            <CheckboxFilter
              options={TYPES}
              selected={selectedTypes}
              onChange={setSelectedTypes}
            />
          </FilterDropdown>
        </div>

        <SortDropdown
          options={SORT_OPTIONS}
          selected={sortBy}
          onChange={setSortBy}
        />
      </div>

      {isFilterOpen && (
        <div className="md:hidden mb-8 p-6 border border-gray-200 rounded bg-gray-50">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Collection</h3>
              <CheckboxFilter
                options={COLLECTIONS}
                selected={selectedCollections}
                onChange={setSelectedCollections}
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">Category</h3>
              <CheckboxFilter
                options={CATEGORIES}
                selected={selectedCategories}
                onChange={setSelectedCategories}
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">Type</h3>
              <CheckboxFilter
                options={TYPES}
                selected={selectedTypes}
                onChange={setSelectedTypes}
              />
            </div>
          </div>
        </div>
      )}

      <ProductGrid products={filteredProducts} />
    </>
  );
}
