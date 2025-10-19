import Image from "next/image";
import Link from "next/link";
import { getHref } from "@/lib/getHref";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { CONTENT } from "@/lib/constants/content";

interface HomeAboutProps {
  title: string;
  description: string;
  additionalText: string;
  cta: string;
  image: string;
  imageAlt: string;
}

export default HomeAbout;

export function HomeAbout({
  title,
  description,
  additionalText,
  cta,
  image,
  imageAlt,
}: HomeAboutProps) {
  const locale = getCurrentLocale();
  return (
    <section className="bg-white">
      <div className="px-5">
        <div className="mx-auto px-4 lg:px-24 py-12 lg:py-16">
          <h2 className="text-h3 lg:text-h2 font-semibold text-black mb-8 lg:mb-12">
            {CONTENT.nav.about} {CONTENT.brand.shortName}
          </h2>

          <div className="mb-8 lg:mb-12">
            <div className="relative w-full aspect-[21/9] overflow-hidden">
              <Image 
                src={image} 
                alt={imageAlt} 
                fill 
                sizes="100vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
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
              <Link
                href={getHref("/about", locale)}
                className="text-body text-black underline hover:no-underline inline-block"
              >
                {cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
