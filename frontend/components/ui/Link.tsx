import React from "react";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { getHref } from "@/lib/getHref";

export interface LinkProps {
  href: string;
  locale?: string;
  size?: "sm" | "lg";
  disabled?: boolean;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const CustomLink: React.FC<LinkProps> = ({
  href,
  locale,
  size = "lg",
  disabled,
  external,
  className,
  children,
}) => {
  const linkClasses = cn(
    "inline-block font-normal transition-all duration-200",
    "border-b border-black",
    "hover:border-gray-400",
    
    size === "lg" && "text-big leading-tight",  
    size === "sm" && "text-sm leading-normal",  
    
    disabled && [
      "text-gray-400 border-gray-400",
      "cursor-not-allowed pointer-events-none",
    ],
    
    !disabled && "text-black",
    
    className
  );

  if (disabled) {
    return <span className={linkClasses}>{children}</span>;
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={getHref(href, locale ?? "en")} className={linkClasses}>
      {children}
    </Link>
  );
};

CustomLink.displayName = "CustomLink";
