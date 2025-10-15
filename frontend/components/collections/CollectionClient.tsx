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
    <section className="py-8 md:py-16 px-4 md:px-5">
      <div className="mx-auto md:px-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-12">
          <h2 className="text-h3 md:text-h2 font-medium text-black mb-4 md:mb-0">
            {collectionTitle}
          </h2>
          
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

            <SortDropdown
              options={SORT_OPTIONS}
              selected={sortBy}
              onChange={setSortBy}
            />
          </div>
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
    </section>
  );
}
