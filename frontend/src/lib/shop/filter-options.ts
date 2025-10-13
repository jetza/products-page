export interface FilterOption {
  id: string;
  label: string;
}

export const COLLECTIONS: FilterOption[] = [
  { id: "scandinavian-simplicity", label: "Scandinavian Simplicity" },
  { id: "modern-luxe", label: "Modern Luxe" },
  { id: "boho-chic", label: "Boho Chic" },
  { id: "timeless-classics", label: "Timeless Classics" },
];

export const CATEGORIES: FilterOption[] = [
  { id: "shirts", label: "Shirts" },
  { id: "sweatshirts", label: "Sweatshirts" },
  { id: "pants", label: "Pants" },
  { id: "merch", label: "Merch" },
];

export const TYPES: FilterOption[] = [
  { id: "clothing", label: "Clothing" },
  { id: "accessories", label: "Accessories" },
];

export const SORT_OPTIONS: FilterOption[] = [
  { id: "featured", label: "Featured" },
  { id: "best-selling", label: "Best selling" },
  { id: "price-asc", label: "Lowest price" },
  { id: "price-desc", label: "Highest price" },
];
