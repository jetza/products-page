"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FadeInOnScroll } from "../ui/Content/FadeInOnScroll";

interface ProductCategory {
  title: string;
  slug: string;
  folder: "sofas" | "arm-chairs";
}

interface HomeProductsProps {
  title: string;
  categories: ProductCategory[];
}

const categoryDefaultImages = {
  sofas: "/products/sutton-royale.jpg",
  "arm-chairs": "/products/belime-haven-arm-chair.png",
};

export const HomeProducts = React.memo(function HomeProducts({
  title,
  categories,
}: HomeProductsProps) {
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    const images: Record<string, string> = {};
    categories.forEach((category) => {
      images[category.slug] = categoryDefaultImages[category.folder];
    });
    setCategoryImages(images);
  }, [categories]);

  return (
    <section className="bg-white">
      <div className="px-5">
        <div className="mx-auto px-4 lg:px-24 py-12 lg:py-16">
          <h2 className="text-h3 lg:text-h2 font-semibold text-black mb-8 lg:mb-12">
            {title}
          </h2>

          <div className="grid grid-cols-2 gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                className="group"
              >
                <div className="bg-gray-100 overflow-hidden aspect-[4/3] relative">
                  {categoryImages[category.slug] && (
                    <Image
                      src={categoryImages[category.slug]}
                      alt={category.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority={index < 2}
                      loading={index < 2 ? undefined : "lazy"}
                    />
                  )}
                </div>
                <FadeInOnScroll>
                  <h3 className="text-big text-black mt-4 group-hover:text-gray-700 transition-colors">
                    {category.title}
                  </h3>
                </FadeInOnScroll>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
