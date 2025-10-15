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
      <footer className={cn("bg-gray-50 py-12 px-8", className)}>
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
      <div className="px-5">
        <div className="mx-auto px-24">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start justify-between">
            <div className="w-full md:w-[168px]">
              <FooterLogo />
            </div>

            <div className="w-full md:w-[384px]">
              <FooterLinksGroup />
            </div>

            <div className="w-full md:w-[384px]">
              <Newsletter layout="horizontal" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
