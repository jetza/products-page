import Image from "next/image";

interface CollectionInspiredInteriorProps {
  title: string;
  subtitle: string;
  collectionName: string;
}

export function CollectionInspiredInterior({ title, subtitle, collectionName }: CollectionInspiredInteriorProps) {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-h4 md:text-h2 font-semibold mb-8 md:mb-12">Collection Inspired Interior</h2>
        
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded overflow-hidden mb-6 md:mb-8">
          <Image
            src="/product-page/image1.png"
            alt="Collection inspired interior"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded overflow-hidden mb-8 md:mb-12">
          <Image
            src="/product-page/image-wide.png"
            alt="Collection inspired interior"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="relative aspect-square md:aspect-[3/4] rounded overflow-hidden">
            <Image
              src="/product-page/image1.png"
              alt="Featured interior"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          
          <div>
            <h3 className="text-h4 md:text-h3 font-semibold mb-4 md:mb-6">{title}</h3>
            <p className="text-sm md:text-body text-gray-600 mb-6 md:mb-8">{subtitle}</p>
            <a 
              href={`/collections/${collectionName}`}
              className="text-sm md:text-body font-medium text-black hover:underline inline-flex items-center gap-2"
            >
              See more out of {collectionName} collection
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
