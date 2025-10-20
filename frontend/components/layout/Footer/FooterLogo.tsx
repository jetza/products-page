import React from "react";
import { cn } from "@/lib/utils/cn";
import { CONTENT } from "@/lib/constants/content";

interface FooterLogoProps {
  className?: string;
}

export const FooterLogo: React.FC<FooterLogoProps> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <h2 className="text-big font-semibold mb-4">
        Sofa
        <br />
        Society
        <br />
        Co.
      </h2>
      <p className="text-xs text-gray-600">{CONTENT.brand.copyright}</p>
    </div>
  );
};
