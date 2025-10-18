"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductCategory {
  title: string;
  slug: string;
  folder: "sofas" | "arm-chairs";
}

interface HomeProductsProps {
  title: string;
  categories: ProductCategory[];
}

// Lista slika po kategorijama (fiksne slike)
const categoryDefaultImages = {
  sofas: "/products/sofa7.png",
  "arm-chairs": "/products/arm-chair1.png",
};

export function HomeProducts({ title, categories }: HomeProductsProps) {
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>({});

  useEffect(() => {
    // Koristi fiksne slike bez shuffle-a
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
          {categories.map((category) => (
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
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <h3 className="text-big text-black mt-4 group-hover:text-gray-700 transition-colors">
                {category.title}
              </h3>
            </Link>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
