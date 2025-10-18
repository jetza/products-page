"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowButton } from "@/components/ui/Buttons/ArrowButton";
import { collections } from "@/lib/constants/collections.data";
import { Button } from "@/components/ui/Buttons/Button";
import { CONTENT } from "@/lib/constants/content";

export function CollectionsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const firstCard = scrollContainerRef.current.querySelector('a');
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const gap = 24;
        const scrollAmount = cardWidth + gap;
        
        scrollContainerRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="py-8 md:py-12">
      <div className="px-8 md:px-5">
        <div className="mx-auto md:px-24">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-h3 md:text-h2 font-medium text-black">{CONTENT.filters.collections}</h2>

            <Link href="/collection" className="md:hidden">
              <Button
                variant="primary"
                size="sm"
                className="text-xs"
              >
                View All
              </Button>
            </Link>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/collection">
                <Button
                  variant="primary"
                  size="md"
                >
                  View All
                </Button>
              </Link>
              
              <div className="flex gap-2">
                <ArrowButton
                  direction="left"
                  onClick={() => scroll("left")}
                  variant="outline"
                  size="lg"
                  aria-label="Scroll left"
                />
                <ArrowButton
                  direction="right"
                  onClick={() => scroll("right")}
                  variant="outline"
                  size="lg"
                  aria-label="Scroll right"
                />
              </div>
            </div>
          </div>

          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide -mx-4 md:-mx-24 px-4 md:px-24" 
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-3 md:gap-6">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={collection.href}
                  className="flex-none w-[70vw] sm:w-[280px] md:w-[calc((100%-48px)/2.5)] group"
                >
                  <div className="relative aspect-[4/5] mb-2 md:mb-4 overflow-hidden">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm md:text-base font-semibold leading-[140%] text-black">
                      {collection.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                      {collection.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
