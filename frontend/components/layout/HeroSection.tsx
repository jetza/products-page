import Image from "next/image";
import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { ReactNode } from "react";

interface HeroSectionProps {
  /** Image path from /public folder */
  imageSrc: string;
  /** Alt text for the hero image */
  imageAlt: string;
  /** Optional page title displayed above the hero image */
  pageTitle?: string;
  /** Height classes for different breakpoints */
  height?: string;
  /** Optional overlay content (title, subtitle, etc.) */
  overlay?: ReactNode;
  /** Children content to be displayed below the hero image */
  children?: ReactNode;
  /** Background color for the content section below hero */
  contentBg?: string;
}

export function HeroSection({
  imageSrc,
  imageAlt,
  pageTitle,
  height = "h-[400px] md:h-[500px] lg:h-[600px]",
  overlay,
  children,
  contentBg = "bg-white",
}: HeroSectionProps) {
  return (
    <>
      {/* Fixed Transparent Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <ResponsiveHeader theme="transparent" />
      </div>

      {/* Hero Section */}
      <section className="relative">
        {/* Optional Page Title */}
        {pageTitle && (
          <div className="px-5">
            <div className="mx-auto px-4 lg:px-24 pt-24 pb-8">
              <h1 className="text-h3 lg:text-h2 font-semibold text-black">
                {pageTitle}
              </h1>
            </div>
          </div>
        )}

        {/* Hero Image */}
        <div className={`relative w-full ${height}`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            quality={100}
          />
          
          {/* Optional Overlay Content */}
          {overlay && (
            <div className="absolute inset-0 flex items-center justify-center">
              {overlay}
            </div>
          )}
        </div>

        {/* Content Section Below Hero */}
        {children && (
          <div className={contentBg}>
            {children}
          </div>
        )}
      </section>
    </>
  );
}
