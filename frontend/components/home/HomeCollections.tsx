"use client";

import Link from "next/link";
import { ArrowButton } from "@/components/ui/Buttons/ArrowButton";
import { Button } from "@/components/ui/Buttons/Button";

interface Collection {
  title: string;
  description: string;
  slug: string;
}

interface HomeCollectionsProps {
  collections: Collection[];
}

export function HomeCollections({ collections }: HomeCollectionsProps) {
  return (
    <section className="bg-white">
      <div className="px-5">
        <div className="mx-auto px-4 lg:px-24 py-12 lg:py-16">
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <h2 className="text-h3 lg:text-h2 font-semibold text-black">
            Collections
          </h2>
          
          <Link href="/collection" className="lg:hidden">
            <Button
              variant="primary"
              size="sm"
              className="text-xs"
            >
              View All
            </Button>
          </Link>

          <div className="hidden lg:flex gap-2">
            <ArrowButton direction="left" variant="outline" onClick={() => {}} />
            <ArrowButton direction="right" variant="default" onClick={() => {}} />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group"
            >
              <div className="bg-gray-100 rounded-lg overflow-hidden aspect-[3/4] relative mb-3 lg:mb-4">
                <div className="absolute inset-0 bg-gray-200" />
              </div>
              <h3 className="text-sm lg:text-big font-semibold text-black mb-1 lg:mb-2 group-hover:text-gray-700 transition-colors">
                {collection.title}
              </h3>
              <p className="text-xs lg:text-body text-gray-700 leading-relaxed">
                {collection.description}
              </p>
            </Link>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
