import { useState, useMemo } from "react";
import { ProductCardProps } from "@/components/shop/ProductCard";
import { PRODUCT_METADATA } from "@/lib/constants/filter-options";

interface UseProductFilterOptions {
  enableCollectionFilter?: boolean;
}

interface FilterState {
  selectedCollections: string[];
  setSelectedCollections: (collections: string[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
}

interface SortState {
  sortBy: string;
  setSortBy: (sort: string) => void;
}

interface UseProductFilterReturn {
  filteredProducts: ProductCardProps[];
  filters: FilterState;
  sort: SortState;
}

export function useProductFilter(
  products: ProductCardProps[],
  options: UseProductFilterOptions = {}
): UseProductFilterReturn {
  const { enableCollectionFilter = true } = options;

  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by collections (using PRODUCT_METADATA)
    if (enableCollectionFilter && selectedCollections.length > 0) {
      filtered = filtered.filter((product) => {
        const metadata = product.slug ? PRODUCT_METADATA[product.slug] : null;
        return metadata && selectedCollections.includes(metadata.collection);
      });
    }

    // Filter by categories (using PRODUCT_METADATA)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => {
        const metadata = product.slug ? PRODUCT_METADATA[product.slug] : null;
        return metadata && selectedCategories.includes(metadata.category);
      });
    }

    // Filter by types (using PRODUCT_METADATA)
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((product) => {
        const metadata = product.slug ? PRODUCT_METADATA[product.slug] : null;
        return metadata && selectedTypes.includes(metadata.type);
      });
    }

    // Sort
    if (sortBy === "price-asc") {
      return filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      return filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, selectedCollections, selectedCategories, selectedTypes, sortBy, enableCollectionFilter]);

  return {
    filteredProducts,
    filters: {
      selectedCollections,
      setSelectedCollections,
      selectedCategories,
      setSelectedCategories,
      selectedTypes,
      setSelectedTypes,
    },
    sort: {
      sortBy,
      setSortBy,
    },
  };
}
