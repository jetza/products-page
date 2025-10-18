"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowButton } from "@/components/ui/Buttons/ArrowButton";

interface ProductImageCarouselProps {
  images: { url: string; alt?: string }[];
}

export function ProductImageCarousel({ images }: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const newIndex = Math.round(scrollPosition / containerWidth);
      setCurrentIndex(newIndex);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const newIndex = direction === "left"
        ? Math.max(0, currentIndex - 1)
        : Math.min(images.length - 1, currentIndex + 1);
      
      setCurrentIndex(newIndex);
      
      const scrollAmount = container.offsetWidth;
      container.scrollTo({
        left: newIndex * scrollAmount,
        behavior: "smooth",
      });
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
                className={`w-full h-full transition-transform duration-300 ${
                  index === 0 ? 'object-cover' : index === 1 ? 'object-cover' : 'object-contain'
                } lg:p-0`}
                style={index === 1 ? { transform: 'scale(1.5)', transformOrigin: 'center' } : undefined}
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <div className="hidden lg:block">
            <ArrowButton
              direction="left"
              variant="outline"
              onClick={() => scroll("left")}
              disabled={currentIndex === 0}
              className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10"
              aria-label="Previous image"
            />
            <ArrowButton
              direction="right"
              variant="default"
              onClick={() => scroll("right")}
              disabled={currentIndex === images.length - 1}
              className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 shadow-lg z-10"
              aria-label="Next image"
            />
          </div>
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
