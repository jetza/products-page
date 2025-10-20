import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { HeroSection } from "@/components/layout/HeroSection";
import { InspirationProducts } from "@/components/inspiration/InspirationProducts";
import { CollectionsCarousel } from "@/components/shop/CollectionsCarousel";
import { inspirationContent } from "@/lib/constants/pages/inspiration.content";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";

export default function InspirationPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        imageSrc={inspirationContent.hero.image}
        imageAlt={inspirationContent.hero.imageAlt}
      />

      <main>
        <FadeInOnScroll variant="fade-up" duration={800} threshold={0} delay={0}>
          <InspirationProducts />
        </FadeInOnScroll>
        <FadeInOnScroll variant="scale" duration={800}>
          <CollectionsCarousel />
        </FadeInOnScroll>
      </main>

      <ResponsiveFooter />
    </div>
  );
}
