import Image from "next/image";

interface AboutImageProps {
  image: string;
  imageAlt: string;
}

export function AboutImage({ image, imageAlt }: AboutImageProps) {
  return (
    <section className="bg-white">
      <div className="px-5">
        <div className="mx-auto px-4 lg:px-24 py-12 lg:py-16">
          <div className="relative w-full aspect-[4/3] lg:aspect-[16/9] overflow-hidden px-8 lg:px-0">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
