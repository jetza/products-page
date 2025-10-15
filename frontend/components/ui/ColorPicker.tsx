import { getColorValue } from "@/lib/constants/colors";

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export function ColorPicker({ colors, selectedColor, onColorSelect }: ColorPickerProps) {
  if (colors.length === 0) return null;

  return (
    <div className="mb-8 w-[149px] h-[78px]">
      <div className="flex items-center gap-4 mb-4">
        <h3 className="text-base font-normal text-black">Colors</h3>
        <span className="text-base font-normal text-gray-400">
          {selectedColor || colors[0]}
        </span>
      </div>
      <div className="flex h-8 gap-6">
        {colors.map((colorName) => (
          <div key={colorName} className="relative w-8 h-8 flex flex-col">
            <button
              className="w-full h-full cursor-pointer transition-all hover:opacity-80"
              style={{ backgroundColor: getColorValue(colorName) }}
              title={colorName}
              onClick={() => onColorSelect(colorName)}
              aria-label={`Select ${colorName} color`}
            />
            <div
              className={`absolute w-8 h-0 top-[46px] border-t transition-all ${
                selectedColor === colorName || (!selectedColor && colorName === colors[0])
                  ? 'border-black'
                  : 'border-transparent'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
