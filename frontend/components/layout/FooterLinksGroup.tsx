import React from "react";
import { cn } from "@/lib/utils/cn";
import { FooterLinks } from "./FooterLinks";

interface FooterLinksGroupProps {
  className?: string;
}

export const FooterLinksGroup: React.FC<FooterLinksGroupProps> = ({
  className,
}) => {
  return (
    <div className={cn("grid grid-cols-3 gap-8", className)}>
      <FooterLinks variant="desktop" />
    </div>
  );
};
