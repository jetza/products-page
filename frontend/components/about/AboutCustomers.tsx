import Image from "next/image";

interface AboutCustomersProps {
  title: string;
  description: string;
  additionalText: string;
  image: string;
  imageAlt: string;
}

export function AboutCustomers({
  title,
  description,
  additionalText,
  image,
  imageAlt,
}: AboutCustomersProps) {
  return (
    <section className="bg-white">
      <div className="px-5">
        <div className="mx-auto px-4 lg:px-24 py-12 lg:py-16">
        <div className="mb-12 lg:mb-16">
          <div className="relative w-full aspect-[16/9] lg:aspect-[21/7] overflow-hidden">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <h2 className="text-h3 lg:text-h2 font-semibold text-black leading-tight">
              {title}
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-body text-gray-700 leading-relaxed">
              {description}
            </p>
            <p className="text-body text-gray-700 leading-relaxed">
              {additionalText}
            </p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
