"use client";

import { useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getHref } from "@/lib/getHref";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { ArrowButton } from "@/components/ui/Buttons/ArrowButton";
import { Button } from "@/components/ui/Buttons/Button";
import { collections } from "@/lib/constants/collections.data";
import { CONTENT } from "@/lib/constants/content";

export function CollectionsGrid() {
  const locale = getCurrentLocale();
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const firstCard = scrollContainerRef.current.querySelector("a");
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
  }, []);

  return (
    <div className="py-8 md:py-12">
      <div className="px-8 md:px-5">
        <div className="mx-auto md:px-24">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-h3 md:text-h2 font-medium text-black">
              {CONTENT.filters.browseCollections}
            </h2>

            <Button
              variant="primary"
              size="sm"
              className="text-xs md:hidden"
              onClick={() => router.push("/collection")}
            >
              {CONTENT.common.viewAll}
            </Button>

            <div className="hidden md:flex gap-2">
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

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide -mx-8 px-8 md:mx-0 md:px-0 md:overflow-x-visible"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-3 md:grid md:grid-cols-4 md:gap-6">
              {collections.map((collection, index) => {
                const href = getHref(collection.href, locale);
                return (
                  <Link
                    key={collection.id}
                    href={href}
                    className="flex-none w-[70vw] sm:w-[280px] md:w-auto group"
                  >
                    <div className="relative aspect-[4/5] mb-2 md:mb-4 overflow-hidden">
                      <Image
                        src={collection.image}
                        alt={collection.title}
                        fill
                        sizes="(max-width: 768px) 70vw, (max-width: 1024px) 280px, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        priority={index < 2}
                        loading={index < 2 ? undefined : "lazy"}
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm md:text-base font-semibold leading-[140%] text-black">
                        {collection.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
