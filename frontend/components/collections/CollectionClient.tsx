"use client";

import React, { useState } from "react";
import { FilterDropdown } from "@/components/filters/FilterDropdown";
import { CheckboxFilter } from "@/components/filters/CheckboxFilter";
import { SortDropdown } from "@/components/filters/SortDropdown";
import { MobileFilterDrawer } from "@/components/filters/MobileFilterDrawer";
import { MobileSortDrawer } from "@/components/filters/MobileSortDrawer";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductCardProps } from "@/components/shop/ProductCard";
import { DropdownButton } from "@/components/ui/Buttons/DropdownButton";
import { PlusIcon } from "@/components/icons";
import { useProductFilter } from "@/lib/hooks/useProductFilter";
import { FURNITURE_CATEGORIES, FURNITURE_TYPES } from "@/lib/constants/furniture-filters.config";
import { SORT_OPTIONS } from "@/lib/constants/filter-options.config";
import { CONTENT } from "@/lib/constants/content";

interface CollectionClientProps {
  products: ProductCardProps[];
  collectionTitle: string;
}

export function CollectionClient({ products, collectionTitle }: CollectionClientProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const { filteredProducts, filters, sort } = useProductFilter(products, {
    enableCollectionFilter: false,
  });

  const { selectedCategories, setSelectedCategories, selectedTypes, setSelectedTypes } = filters;
  const { sortBy, setSortBy } = sort;

  return (
    <section className="bg-white">
      <div className="px-5">
        <div className="mx-auto px-4 lg:px-24 py-12 lg:py-16">
          <h2 className="text-h3 lg:text-h2 font-semibold text-black mb-6 lg:mb-8">
            {collectionTitle}
          </h2>
          
          {/* Mobile and Tablet - Filter and Sort buttons */}
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
              <span className="text-base">{CONTENT.common.filter}</span>
            </DropdownButton>

            <DropdownButton
              isOpen={isSortOpen}
              onClick={() => setIsSortOpen(!isSortOpen)}
              variant="filter"
            >
              <span className="text-base">{CONTENT.common.sortBy}</span>
            </DropdownButton>
          </div>

          {/* Desktop - Individual filter dropdowns */}
          <div className="hidden md:flex items-center justify-between mb-8 lg:mb-12">
            <div className="flex items-center gap-4">
              <FilterDropdown label={CONTENT.filters.category}>
                <CheckboxFilter
                  options={FURNITURE_CATEGORIES}
                  selected={selectedCategories}
                  onChange={setSelectedCategories}
                />
              </FilterDropdown>

              <FilterDropdown label={CONTENT.filters.type}>
                <CheckboxFilter
                  options={FURNITURE_TYPES}
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

          <MobileFilterDrawer
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            collections={[]}
            categories={FURNITURE_CATEGORIES}
            types={FURNITURE_TYPES}
            selectedCollections={[]}
            selectedCategories={selectedCategories}
            selectedTypes={selectedTypes}
            selectedMaterials={[]}
            selectedColors={[]}
            priceRange={[0, 5000]}
            onCollectionsChange={() => {}}
            onCategoriesChange={setSelectedCategories}
            onTypesChange={setSelectedTypes}
            onMaterialsChange={() => {}}
            onColorsChange={() => {}}
            onPriceChange={() => {}}
            onApply={() => {}}
          />

          <MobileSortDrawer
            isOpen={isSortOpen}
            onClose={() => setIsSortOpen(false)}
            options={SORT_OPTIONS}
            selected={sortBy}
            onSelect={setSortBy}
          />

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-button-big text-gray-500">
                {CONTENT.common.noProductsMatch}
              </p>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </section>
  );
}
