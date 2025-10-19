import Image from "next/image";

interface ValueCard {
  title: string;
  description: string;
}

interface AboutCommitmentProps {
  title: string;
  values: ValueCard[];
}

export function AboutCommitment({ title, values }: AboutCommitmentProps) {
  return (
    <section className="bg-gray-50">
      <div className="px-5">
        <div className="mx-auto px-4 lg:px-24 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="px-5 md:px-0">
              <div className="relative mx-auto w-full max-w-xs md:max-w-none aspect-[3/4] overflow-hidden">
                <Image
                  src="/About/About Small.png"
                  alt="Minimalist beige sofa with plant"
                  fill
                  sizes="(max-width: 768px) 320px, 50vw"
                  className="object-cover object-left"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-8 lg:pt-8">
              <p className="text-body text-gray-700 leading-relaxed">{title}</p>

              <div className="space-y-6">
                {values.map((value, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-big font-semibold text-black">
                      {value.title}
                    </h3>
                    <p className="text-body text-gray-700 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
