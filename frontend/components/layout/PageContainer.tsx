import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  className,
  noPadding = false 
}) => {
  if (noPadding) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className="px-8 md:px-5">
      <div className={cn("mx-auto md:px-24", className)}>
        {children}
      </div>
    </div>
  );
};

PageContainer.displayName = "PageContainer";
