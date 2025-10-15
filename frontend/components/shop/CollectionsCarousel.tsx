"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { collections } from "@/lib/constants/collections";
import { Button } from "@/components/ui/Button";

export function CollectionsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="py-8 md:py-12 overflow-hidden">
      {/* Header section with standard padding */}
      <div className="px-4 md:px-5">
        <div className="mx-auto md:px-24">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-h3 md:text-h2 font-medium text-black">Collections</h2>

            <Link href="/collections" className="md:hidden">
              <Button
                variant="primary"
                size="sm"
                className="text-xs"
              >
                View All
              </Button>
            </Link>

            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel - extends to right edge with left alignment */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 md:gap-6 overflow-x-auto scrollbar-hide pl-4 md:pl-[116px]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={collection.href}
            className="flex-none w-[70vw] sm:w-[280px] md:w-[320px] lg:w-[360px] group"
          >
            <div className="relative aspect-[4/5] mb-2 md:mb-4 overflow-hidden">
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-sm md:text-base font-normal leading-[140%] text-black">
              {collection.title}
            </h3>
          </Link>
        ))}
        {/* Spacer for right padding - responsive */}
        <div className="flex-none w-4 md:w-[116px]" />
      </div>
    </div>
  );
}
