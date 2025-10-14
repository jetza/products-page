interface MaterialsSelectProps {
  materials: string[];
  selectedMaterial: string;
  onMaterialSelect: (material: string) => void;
}

export function MaterialsSelect({ materials, selectedMaterial, onMaterialSelect }: MaterialsSelectProps) {
  if (materials.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <h3 className="text-base font-normal text-black">Materials</h3>
        <span className="text-base font-normal text-gray-400">
          {selectedMaterial || materials[0]}
        </span>
      </div>
      <div className="relative w-[289px] h-14 border border-gray-200 rounded overflow-hidden bg-white">
        <select
          value={selectedMaterial || materials[0]}
          onChange={(e) => onMaterialSelect(e.target.value)}
          className="w-full h-14 px-4 pr-10 text-base font-normal text-black bg-transparent border-none appearance-none cursor-pointer focus:outline-none"
        >
          {materials.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
