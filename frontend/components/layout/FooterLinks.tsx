import React from "react";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { HELP_LINKS, SOCIAL_LINKS, LEGAL_LINKS } from "./footer-links.data";

interface FooterLinksProps {
  variant?: "mobile" | "desktop";
  className?: string;
}

export const FooterLinks: React.FC<FooterLinksProps> = ({ 
  variant = "desktop",
  className 
}) => {
  if (variant === "mobile") {
    return (
      <div className={cn("grid grid-cols-3 gap-8 text-sm", className)}>
        <div>
          {HELP_LINKS.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="block mb-3 last:mb-0 hover:text-gray-600"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div>
          {SOCIAL_LINKS.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="block mb-3 last:mb-0 hover:text-gray-600"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div>
          {LEGAL_LINKS.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="block mb-3 last:mb-0 hover:text-gray-600"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={className}>
        {HELP_LINKS.map((link) => (
          <Link 
            key={link.href}
            href={link.href} 
            className="block mb-3 text-sm last:mb-0 hover:text-gray-600"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className={className}>
        {SOCIAL_LINKS.map((link) => (
          <Link 
            key={link.href}
            href={link.href} 
            className="block mb-3 text-sm last:mb-0 hover:text-gray-600"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className={className}>
        {LEGAL_LINKS.map((link) => (
          <Link 
            key={link.href}
            href={link.href} 
            className="block mb-3 text-sm last:mb-0 hover:text-gray-600"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
};
