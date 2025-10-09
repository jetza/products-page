/**
 * Color name to HEX code mapping for product color variants
 * Used for visual representation in color pickers
 */
export const COLOR_HEX_MAP: Record<string, string> = {
  // Basic colors
  "Black": "#000000",
  "White": "#FFFFFF",
  "Navy": "#001F3F",
  "Beige": "#F5F5DC",
  "Gray": "#808080",
  "Light Gray": "#D3D3D3",
  "Dark Gray": "#A9A9A9",
  "Charcoal": "#36454F",
  
  // Earth tones
  "Brown": "#8B4513",
  "Tan": "#D2B48C",
  "Cream": "#FFFDD0",
  "Sand": "#C2B280",
  "Khaki": "#C3B091",
  
  // Fashion colors
  "Olive": "#808000",
  "Burgundy": "#800020",
  "Forest Green": "#228B22",
  "Emerald": "#50C878",
  
  // Blues
  "Light Blue": "#ADD8E6",
  "Sky Blue": "#87CEEB",
  "Royal Blue": "#4169E1",
  
  // Reds & Pinks
  "Red": "#FF0000",
  "Crimson": "#DC143C",
  "Pink": "#FFC0CB",
  "Rose": "#FF007F",
  
  // Pastels
  "Lavender": "#E6E6FA",
  "Mint": "#98FF98",
  "Peach": "#FFE5B4",
  
  // Others
  "Yellow": "#FFFF00",
  "Orange": "#FFA500",
  "Purple": "#800080",
  "Green": "#008000",
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
