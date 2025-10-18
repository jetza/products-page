import Image from "next/image";

interface StyleCardProps {
  title: string;
  description: string;
  image: string;
}

interface InspirationGalleryProps {
  title: string;
  description: string;
  styles: StyleCardProps[];
}

export function InspirationGallery({ title, description, styles }: InspirationGalleryProps) {
  return (
    <section className="bg-white">
      <div className="px-5">
        <div className="mx-auto px-4 lg:px-24 py-12 lg:py-16">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-h3 lg:text-h2 font-semibold text-black mb-4">
            {title}
          </h2>
          <p className="text-body text-gray-700 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="space-y-12 lg:space-y-16">
          {styles.map((style, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={style.image}
                    alt={style.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="space-y-4">
                  <h3 className="text-h4 lg:text-h3 font-semibold text-black">
                    {style.title}
                  </h3>
                  <p className="text-body text-gray-700 leading-relaxed">
                    {style.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
