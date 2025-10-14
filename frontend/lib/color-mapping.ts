/**
 * Color name to HEX code mapping for Sofa Society Co.
 * ONLY colors visible in Product Detail color picker (Product.png design)
 * Based on actual design - Paloma Haven has 3 color circles
 */
export const COLOR_HEX_MAP: Record<string, string> = {
  // Main colors from color picker
  "Light Gray": "#D3D3D3",
  "Dark Gray": "#6B6B6B",
  "Black": "#1A1A1A",
};

/**
 * Get HEX color code for a color name
 * @param colorName - The name of the color (case-sensitive)
 * @returns HEX color code or default gray if not found
 */
export const getColorHex = (colorName: string): string => {
  return COLOR_HEX_MAP[colorName] || "#CCCCCC";
};

/**
 * Get all available color names
 */
export const getAvailableColors = (): string[] => {
  return Object.keys(COLOR_HEX_MAP);
};
