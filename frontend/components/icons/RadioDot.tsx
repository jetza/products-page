export const RadioDot = ({ 
  className, 
  disabled 
}: { 
  className?: string; 
  disabled?: boolean;
}) => (
  <div className={className}>
    <div
      className={`w-2 h-2 rounded-full ${disabled ? "bg-gray-300" : "bg-black"}`}
    />
  </div>
);
