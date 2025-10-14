/**
 * Color name to CSS variable mapping for Sofa Society Co.
 * ONLY colors visible in Product Detail color picker (Product.png design)
 * Based on actual design - Paloma Haven has 3 color circles
 */
export const COLOR_VALUE_MAP: Record<string, string> = {
  // Main colors from color picker
  "Light Gray": "var(--color-product-light-gray)",
  "Dark Gray": "var(--color-product-dark-gray)",
  "Black": "var(--color-product-black)",
};

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
 * Get CSS variable value for a color name (for inline styles)
 * @param colorName - The name of the color (case-sensitive)
 * @returns CSS var() or default gray if not found
 */
export const getColorValue = (colorName: string): string => {
  return COLOR_VALUE_MAP[colorName] || "var(--color-gray-300)";
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
