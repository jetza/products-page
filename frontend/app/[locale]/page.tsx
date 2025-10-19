import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { HeroSection } from "@/components/layout/HeroSection";
import { HomeProducts } from "@/components/home/HomeProducts";
import HomeAbout from "@/components/home/HomeAbout";
import { homeContent } from "@/lib/constants/pages/home.content";
import Link from "next/link";
import { CollectionsCarousel } from "@/components/shop/CollectionsCarousel";
import { getHref } from "@/lib/getHref";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";

export default function Home() {
  const locale = getCurrentLocale();

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        imageSrc={homeContent.hero.image}
        imageAlt={homeContent.hero.imageAlt}
        contentBg="bg-white"
      >
        <div className="px-5">
          <div className="mx-auto px-4 lg:px-24 py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row lg:gap-16 space-y-6 lg:space-y-0">
              <FadeInOnScroll variant="fade-right" duration={1000}>
                <h1 className="text-[32px] lg:text-[48px] font-semibold text-black leading-tight flex-1">
                  {homeContent.hero.title}
                </h1>
              </FadeInOnScroll>
              <FadeInOnScroll variant="fade-left" duration={1000} delay={200}>
                <div className="lg:w-full flex flex-col gap-4">
                  <p className="text-[18px] lg:text-[24px] text-gray-700 leading-relaxed whitespace-normal">
                    {homeContent.hero.subtitle}
                  </p>
                  <Link
                    href={getHref("/shop", locale)}
                    className="text-[18px] lg:text-[24px] text-black underline hover:no-underline block w-full whitespace-nowrap"
                  >
                    {homeContent.hero.cta}
                  </Link>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </div>
      </HeroSection>

      <main>
        <FadeInOnScroll variant="fade-up" duration={800}>
          <HomeProducts {...homeContent.products} />
        </FadeInOnScroll>
        <FadeInOnScroll variant="scale" duration={800}>
          <CollectionsCarousel />
        </FadeInOnScroll>
        <FadeInOnScroll variant="fade-up" duration={800}>
          <HomeAbout {...homeContent.about} />
        </FadeInOnScroll>
      </main>

      <ResponsiveFooter />
    </div>
  );
}
