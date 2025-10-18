import Image from "next/image";
import Link from "next/link";

export function InspirationProducts() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="px-5">
        <div className="mx-auto px-4 lg:px-24 space-y-16 lg:space-y-24">
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="lg:w-[60%] space-y-6">
              <h2 className="text-h3 lg:text-h2 font-semibold text-black leading-tight">
                The Astrid Curve sofa is a masterpiece of minimalism and luxury.
              </h2>
              <p className="text-body text-gray-700 leading-relaxed">
                Our design philosophy revolves around creating pieces that are both beautiful and practical. Each sofa is crafted with attention to detail, carefully, medium, and timeless classics.
              </p>
            </div>
            <div className="lg:w-[40%]">
              <Link href="/shop/astrid-curve">
                <div className="relative w-full aspect-square overflow-hidden cursor-pointer">
                  <Image
                    src="/products/astrid-curve.png"
                    alt="Astrid Curve Sofa"
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-body font-semibold text-black">Astrid Curve</p>
                  <p className="text-big font-semibold text-black">1800€</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">Modern Elegance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 md:px-5 my-16 lg:my-24">
        <div className="mx-auto md:px-24">
          <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
            <Image
              src="/Inspiration page/Inspiration.jpg"
              alt="Haven Sofas"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="px-5">
        <div className="mx-auto px-4 lg:px-24 space-y-16 lg:space-y-24">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="lg:w-[60%] space-y-6">
              <h2 className="text-h3 lg:text-h2 font-semibold text-black leading-tight">
                Haven Sofas have minimalistic designs, neutral colors, and high-quality textures.
              </h2>
              <p className="text-body text-gray-700 leading-relaxed">
                Perfect for those who seek comfort with a clean and understated aesthetic. This collection exudes the essence of Scandinavian elegance to your living room.
              </p>
            </div>
            <div className="lg:w-[40%] space-y-8">
              <div>
                <Link href="/shop/nordic-haven">
                  <div className="relative w-full aspect-square overflow-hidden cursor-pointer">
                    <Image
                      src="/products/nordic-haven.jpg"
                      alt="Nordic Haven"
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-body font-semibold text-black">Nordic Haven</p>
                    <p className="text-sm text-gray-600">Modern Living</p>
                  </div>
                  <p className="text-big font-semibold text-black">1000€</p>
                </div>
              </div>

              <div>
                <Link href="/shop/bellaire-haven">
                  <div className="relative w-full aspect-square overflow-hidden cursor-pointer">
                    <Image
                      src="/products/belime-haven-arm-chair.png"
                      alt="Bellaire Haven"
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-body font-semibold text-black">Bellaire Haven</p>
                    <p className="text-sm text-gray-600">Accent Chair</p>
                  </div>
                  <p className="text-big font-semibold text-black">1200€</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 md:px-0 my-16 lg:my-24">
        <div className="mx-auto">
          <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
            <Image
              src="/Inspiration page/Inspiration-wide.png"
              alt="Oslo Drift Collection"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="px-5">
        <div className="mx-auto px-4 lg:px-24 space-y-16 lg:space-y-24">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
              <div className="lg:w-[60%] space-y-6">
                <h2 className="text-h3 lg:text-h2 font-semibold text-black leading-tight">
                  Oslo Drift is infused with playful textures and vibrant patterns with eclectic vibes.
                </h2>
                <p className="text-body text-gray-700 leading-relaxed">
                  Whether You&apos;re looking for bold statement pieces or subtle elegance, this collection elevates your home with a touch of glamour sophistication, and unmatched warmth.
                </p>
              </div>
              
              <div className="lg:w-[40%]">
                <Link href="/shop/camden-retreat">
                  <div className="relative w-full aspect-square overflow-hidden cursor-pointer">
                    <Image
                      src="/products/camden-retreat.jpg"
                      alt="Camden Retreat"
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-body font-semibold text-black">Camden Retreat</p>
                      <p className="text-sm text-gray-600 mt-1">Bohemian Luxury</p>
                    </div>
                    <div className="text-right">
                      <p className="text-big font-semibold text-red-500">1000€</p>
                      <p className="text-sm text-black line-through">1200€</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
