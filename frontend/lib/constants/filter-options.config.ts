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
  { id: "one-seater", label: "One seater" },
  { id: "two-seater", label: "Two seater" },
  { id: "three-seater", label: "Three seater" },
];

export const TYPES: FilterOption[] = [
  { id: "sofa", label: "Sofa" },
  { id: "armchair", label: "Armchair" },
];

export const MATERIALS: FilterOption[] = [
  { id: "velvet", label: "Velvet" },
  { id: "linen", label: "Linen" },
  { id: "boucle", label: "Boucle" },
  { id: "leather", label: "Leather" },
];

export const COLORS_FILTER: FilterOption[] = [
  { id: "black", label: "Black" },
  { id: "gray", label: "Gray" },
  { id: "white", label: "White" },
  { id: "red", label: "Red" },
];

export const SORT_OPTIONS: FilterOption[] = [
  { id: "featured", label: "Featured" },
  { id: "best-selling", label: "Best selling" },
  { id: "price-asc", label: "Lowest price" },
  { id: "price-desc", label: "Highest price" },
];

// Product metadata for filtering
export const PRODUCT_METADATA: Record<string, { 
  category: string; 
  type: string; 
  collection: string;
  materials: string[];
  colors: string[];
}> = {
  // Armchair - One seater
  "bellaire-haven": { 
    category: "one-seater", 
    type: "armchair", 
    collection: "modern-luxe",
    materials: ["velvet", "leather"],
    colors: ["black", "gray"]
  },
  "astrid-curve": { 
    category: "one-seater", 
    type: "armchair", 
    collection: "boho-chic",
    materials: ["boucle", "linen"],
    colors: ["white", "gray"]
  },
  
  // Sofa - Two seater
  "paloma-haven": { 
    category: "two-seater", 
    type: "sofa", 
    collection: "scandinavian-simplicity",
    materials: ["linen", "boucle"],
    colors: ["white", "gray"]
  },
  "paloma-haven-armchair": { 
    category: "two-seater", 
    type: "sofa", 
    collection: "scandinavian-simplicity",
    materials: ["linen", "velvet"],
    colors: ["gray", "white"]
  },
  "everly-estate": { 
    category: "two-seater", 
    type: "sofa", 
    collection: "modern-luxe",
    materials: ["velvet", "leather"],
    colors: ["black", "gray", "red"]
  },
  "sutton-royale": { 
    category: "two-seater", 
    type: "sofa", 
    collection: "timeless-classics",
    materials: ["leather", "velvet"],
    colors: ["black", "gray"]
  },
  
  // Sofa - Three seater
  "nordic-haven": { 
    category: "three-seater", 
    type: "sofa", 
    collection: "scandinavian-simplicity",
    materials: ["linen", "boucle"],
    colors: ["white", "gray"]
  },
  "camden-retreat": { 
    category: "three-seater", 
    type: "sofa", 
    collection: "boho-chic",
    materials: ["boucle", "linen"],
    colors: ["white", "gray", "red"]
  },
  "astrid-curve-2": { 
    category: "three-seater", 
    type: "sofa", 
    collection: "boho-chic",
    materials: ["velvet", "boucle"],
    colors: ["gray", "black"]
  },
  "astrid-curve-gray": { 
    category: "three-seater", 
    type: "sofa", 
    collection: "timeless-classics",
    materials: ["velvet", "leather"],
    colors: ["gray", "black"]
  },
};
