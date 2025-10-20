import Image from "next/image";

interface AboutReflectionProps {
  title: string;
  description: string;
  additionalDescription: string;
  smallImage: string;
  smallImageAlt: string;
  designPhilosophy: string;
  commitmentText: string;
}

export function AboutReflection({
  title,
  description,
  additionalDescription,
  smallImage,
  smallImageAlt,
  designPhilosophy,
  commitmentText,
}: AboutReflectionProps) {
  return (
    <section className="bg-white">
      <div className="px-5">
        <div className="mx-auto px-4 lg:px-24 py-12 lg:py-16">
          <div className="mb-12 lg:mb-16 lg:w-[60%]">
            <h2 className="text-h3 lg:text-h2 font-semibold text-black leading-tight mb-6">
              {title}
            </h2>
            <div className="space-y-6">
              <p className="text-body text-gray-700 leading-relaxed">
                {description}
              </p>
              <p className="text-body text-gray-700 leading-relaxed">
                {additionalDescription}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src={smallImage}
                  alt={smallImageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-700 leading-relaxed mb-6">
                {designPhilosophy}
              </p>
              <p className="text-body text-gray-700 leading-relaxed">
                {commitmentText}
              </p>
            </div>
          </div>

          <div className="lg:hidden mt-12">
            <p className="text-big text-gray-700 leading-relaxed">
              Our commitment to sustainability ensures that our products are not
              only beautiful but also kind to the planet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
