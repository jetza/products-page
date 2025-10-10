export const CheckmarkIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13 4L6 11L3 8"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

export const ChevronLeft = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.53 3.6L5.33 7.8L9.53 12L8.89 12.636L4.06 7.8L8.89 2.964L9.53 3.6Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.84 7.35L13.54 7.35V8.25L4.84 8.25L4.84 7.35Z"
      fill="currentColor"
    />
  </svg>
);

export const ChevronRight = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.09 7.25H16.59V8.75H2.09V7.25Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.84 2.939L15.91 11L7.84 19.061L6.78 18L13.78 11L6.78 4L7.84 2.939Z"
      fill="currentColor"
    />
  </svg>
);

export const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.265 6.47L5.33 5.404L11 11.074L16.67 5.404L17.73 6.465L11 13.195L4.265 6.47Z"
      fill="currentColor"
    />
  </svg>
);
