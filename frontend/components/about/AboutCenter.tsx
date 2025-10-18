import Image from "next/image";

interface AboutCenterProps {
  title: string;
  description: string;
  additionalText: string;
  image: string;
  imageAlt: string;
}

export function AboutCenter({
  title,
  description,
  additionalText,
  image,
  imageAlt,
}: AboutCenterProps) {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mb-12 lg:mb-16">
        <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="px-5">
        <div className="mx-auto px-4 lg:px-24">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="lg:w-[60%]">
              <h2 className="text-h3 lg:text-h2 font-semibold text-black leading-tight">
                {title}
              </h2>
            </div>

            <div className="lg:w-[40%] space-y-6 pt-[72px]">
              <p className="text-body text-gray-700 leading-relaxed">
                {description}
              </p>
              <p className="text-body text-gray-700 leading-relaxed">
                {additionalText}
              </p>
            </div>
          </div>

          <div className="lg:hidden mt-12">
            <p className="text-big text-gray-700 leading-relaxed">
              Thank you for choosing Sofa Society to be a part of your home!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
