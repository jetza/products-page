"use client";

import React, { useState, useMemo } from "react";
import { FilterDropdown } from "@/components/filters/FilterDropdown";
import { CheckboxFilter } from "@/components/filters/CheckboxFilter";
import { SortDropdown } from "@/components/filters/SortDropdown";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductCardProps } from "@/components/shop/ProductCard";
import { COLLECTIONS, CATEGORIES, TYPES, SORT_OPTIONS } from "@/src/lib/shop/filter-options";

interface ShopClientProps {
  products: ProductCardProps[];
}

export function ShopClient({ products: shopItems }: ShopClientProps) {
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");

  const filteredShopItems = useMemo(() => {
    const filtered = [...shopItems];

    if (sortBy === "price-asc") {
      return filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      return filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [shopItems, sortBy]);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
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

      <ProductGrid products={filteredShopItems} />
    </>
  );
}
