/**
 * Color name to Tailwind class mapping for Sofa Society Co.
 * ONLY colors visible in Product Detail color picker (Product.png design)
 * Based on actual design - Paloma Haven has 3 color circles
 */
export const COLOR_CLASS_MAP: Record<string, string> = {
  // Main colors from color picker
  "Light Gray": "bg-product-light-gray",
  "Dark Gray": "bg-product-dark-gray",
  "Black": "bg-product-black",
};

/**
 * Get Tailwind background color class for a color name
 * @param colorName - The name of the color (case-sensitive)
 * @returns Tailwind bg-* class or default gray if not found
 */
export const getColorClass = (colorName: string): string => {
  return COLOR_CLASS_MAP[colorName] || "bg-gray-300";
};

/**
 * Get all available color names
 */
export const getAvailableColors = (): string[] => {
  return Object.keys(COLOR_CLASS_MAP);
};
