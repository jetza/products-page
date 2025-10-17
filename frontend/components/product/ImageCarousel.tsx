"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronButton } from "@/components/ui/Buttons/ChevronButton";

interface ImageCarouselProps {
  images: { url: string; alt?: string }[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-square md:aspect-[4/5] md:max-h-[600px] bg-gray-100 rounded overflow-hidden">
        <Image
          src={images[currentIndex].url}
          alt={images[currentIndex].alt || `Product image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-contain"
          priority={currentIndex === 0}
        />
      </div>

      {images.length > 1 && (
        <>
          <ChevronButton
            direction="left"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            aria-label="Previous image"
          />
          <ChevronButton
            direction="right"
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2"
            aria-label="Next image"
          />

          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-black w-8" : "bg-gray-300"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
