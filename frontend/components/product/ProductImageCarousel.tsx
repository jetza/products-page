"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

interface ProductImageCarouselProps {
  images: { url: string; alt?: string }[];
}

export function ProductImageCarousel({ images }: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.offsetWidth;
      const newScrollPosition = direction === "left" 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });

      const newIndex = direction === "left"
        ? Math.max(0, currentIndex - 1)
        : Math.min(images.length - 1, currentIndex + 1);
      setCurrentIndex(newIndex);
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full">
      <div className="relative w-full max-w-full lg:max-w-[934px] h-[400px] lg:h-[612px]">
        <div 
          ref={scrollContainerRef}
          className="flex gap-0 lg:gap-6 overflow-x-auto scrollbar-hide scroll-smooth h-full snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-none w-full lg:w-[459px] h-full bg-gray-100 rounded overflow-hidden flex items-center justify-center snap-start"
            >
              <Image
                src={image.url}
                alt={image.alt || `Product image ${index + 1}`}
                width={427}
                height={532}
                className="w-full h-full object-contain p-4 lg:p-0"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={() => scroll("left")}
              disabled={currentIndex === 0}
              className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-transparent border border-black rounded-full flex items-center justify-center transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous image"
            >
              <ArrowLeftIcon className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={currentIndex === images.length - 1}
              className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-black rounded-full flex items-center justify-center transition-colors shadow-lg z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next image"
            >
              <ArrowRightIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-3 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                if (scrollContainerRef.current) {
                  const scrollAmount = scrollContainerRef.current.offsetWidth;
                  scrollContainerRef.current.scrollTo({
                    left: index * scrollAmount,
                    behavior: "smooth",
                  });
                }
              }}
              className={`text-sm font-medium transition-colors ${
                index === currentIndex
                  ? "text-black font-semibold"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
