import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { HeroSection } from "@/components/layout/HeroSection";
import { HomeProducts } from "@/components/home/HomeProducts";
import HomeAbout from "@/components/home/HomeAbout";
import { homeContent } from "@/lib/constants/pages/home.content";
import Link from "next/link";
import { CollectionsCarousel } from "@/components/shop/CollectionsCarousel";
import { getHref } from "@/lib/getHref";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

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
              <div className="lg:w-[60%]">
                <h1 className="text-[32px] lg:text-[48px] font-semibold text-black leading-tight">
                  {homeContent.hero.title}
                </h1>
              </div>
              <div className="lg:w-[40%] flex flex-col gap-4">
                <p className="text-[18px] lg:text-[24px] text-gray-700 leading-relaxed">
                  {homeContent.hero.subtitle}
                </p>
                <Link
                  href={getHref("/shop", locale)}
                  className="text-[18px] lg:text-[24px] text-black underline hover:no-underline inline-block"
                >
                  {homeContent.hero.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </HeroSection>

      <main>
        <HomeProducts {...homeContent.products} />
        <CollectionsCarousel />
        <HomeAbout {...homeContent.about} />
      </main>

      <ResponsiveFooter />
    </div>
  );
}
