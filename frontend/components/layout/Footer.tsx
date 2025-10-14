"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";
import { Newsletter } from "@/components/ui/Newsletter";
import { FooterLinks } from "./FooterLinks";
import { FooterLinksGroup } from "./FooterLinksGroup";
import { FooterLogo } from "./FooterLogo";

interface FooterProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ 
  variant = "desktop",
  className 
}) => {

  if (variant === "mobile") {
    return (
      <footer className={cn("bg-gray-50 py-12 px-6", className)}>
        <div className="max-w-md mx-auto">
          <Newsletter className="mb-12" />
          
          <FooterLogo className="mb-8" />

          <FooterLinks variant="mobile" />
        </div>
      </footer>
    );
  }

  return (
    <footer className={cn("bg-gray-50 py-12", className)}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-[200px_1fr_500px] gap-12">
          <FooterLogo />

          <div className="flex justify-center">
            <FooterLinksGroup />
          </div>

          <div className="w-full">
            <Newsletter layout="horizontal" />
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
