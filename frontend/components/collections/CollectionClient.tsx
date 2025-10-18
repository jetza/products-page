"use client";

import React from "react";
import { FilterDropdown } from "@/components/filters/FilterDropdown";
import { CheckboxFilter } from "@/components/filters/CheckboxFilter";
import { SortDropdown } from "@/components/filters/SortDropdown";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductCardProps } from "@/components/shop/ProductCard";
import { useProductFilter } from "@/lib/hooks/useProductFilter";
import { FURNITURE_CATEGORIES, FURNITURE_TYPES } from "@/lib/constants/furniture-filter-options";
import { SORT_OPTIONS } from "@/lib/constants/filter-options";

interface CollectionClientProps {
  products: ProductCardProps[];
  collectionTitle: string;
}

export function CollectionClient({ products, collectionTitle }: CollectionClientProps) {
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
          
          <div className="flex items-center justify-between mb-8 lg:mb-12">
            <div className="flex items-center gap-4">
              <FilterDropdown label="Category">
                <CheckboxFilter
                  options={FURNITURE_CATEGORIES}
                  selected={selectedCategories}
                  onChange={setSelectedCategories}
                />
              </FilterDropdown>

              <FilterDropdown label="Type">
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

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-button-big text-gray-500">
                No products match your filters.
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
