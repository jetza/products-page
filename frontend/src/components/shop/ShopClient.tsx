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
import { COLLECTIONS, CATEGORIES, TYPES, SORT_OPTIONS, MATERIALS, COLORS_FILTER, PRODUCT_METADATA } from "@/lib/constants/filter-options";

interface ShopClientProps {
  products: ProductCardProps[];
}

export function ShopClient({ products: shopItems }: ShopClientProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  
  const { filteredProducts: baseFilteredProducts, filters, sort } = useProductFilter(shopItems, {
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

  // Additional filtering for price, materials, and colors using PRODUCT_METADATA
  const filteredProducts = React.useMemo(() => {
    let filtered = [...baseFilteredProducts];

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by materials (using PRODUCT_METADATA)
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter((product) => {
        const metadata = product.slug ? PRODUCT_METADATA[product.slug] : null;
        return metadata && selectedMaterials.some((material) => metadata.materials.includes(material));
      });
    }

    // Filter by colors (using PRODUCT_METADATA)
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) => {
        const metadata = product.slug ? PRODUCT_METADATA[product.slug] : null;
        return metadata && selectedColors.some((color) => metadata.colors.includes(color));
      });
    }

    return filtered;
  }, [baseFilteredProducts, priceRange, selectedMaterials, selectedColors]);

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

        <DropdownButton
          isOpen={isSortOpen}
          onClick={() => setIsSortOpen(!isSortOpen)}
          variant="filter"
        >
          <span className="text-base">Sort by</span>
        </DropdownButton>
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

      <MobileFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        collections={COLLECTIONS}
        categories={CATEGORIES}
        types={TYPES}
        selectedCollections={selectedCollections}
        selectedCategories={selectedCategories}
        selectedTypes={selectedTypes}
        selectedMaterials={selectedMaterials}
        selectedColors={selectedColors}
        priceRange={priceRange}
        onCollectionsChange={setSelectedCollections}
        onCategoriesChange={setSelectedCategories}
        onTypesChange={setSelectedTypes}
        onMaterialsChange={setSelectedMaterials}
        onColorsChange={setSelectedColors}
        onPriceChange={setPriceRange}
        onApply={() => {
          // Filter will be applied automatically through state
        }}
      />

      <MobileSortDrawer
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        options={SORT_OPTIONS}
        selected={sortBy}
        onSelect={setSortBy}
      />

      <ProductGrid products={filteredProducts} />
    </>
  );
}
