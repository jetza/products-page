import Image from "next/image";
import { CONTENT } from "@/lib/constants/content";

interface CollectionInspiredInteriorProps {
  title: string;
  collectionName: string;
  collectionTitle?: string;
}

export function CollectionInspiredInterior({ title, collectionName, collectionTitle }: CollectionInspiredInteriorProps) {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="px-8 md:px-5">
        <div className="mx-auto md:px-24">
          <h2 className="text-h4 md:text-h2 font-semibold mb-8 md:mb-12">{CONTENT.product.collectionInspiredInterior}</h2>
          
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded overflow-hidden mb-6 md:mb-8">
            <Image
              src="/Product page/image1.png"
              alt="Collection inspired interior"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mb-8 md:mb-12 px-8 md:px-0">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <Image
            src="/Product page/image-wide.png"
            alt="Collection inspired interior"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="px-8 md:px-5">
        <div className="mx-auto md:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative w-[70%] md:w-full aspect-square md:aspect-[3/4] rounded overflow-hidden">
              <Image
                src="/Product page/image2.png"
                alt="Featured interior"
                fill
                sizes="(max-width: 768px) 70vw, 50vw"
                className="object-cover scale-[1.2] md:scale-100"
              />
            </div>
            
            <div>
              <h3 className="text-h4 md:text-h3 font-semibold mb-6 md:mb-8">{title}</h3>
              <a 
                href={`/collections/${collectionName}`}
                className="text-sm md:text-body font-medium text-black hover:underline inline-flex items-center gap-2"
              >
                See more out of {collectionTitle || collectionName} collection
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
