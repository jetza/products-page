import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { HeroSection } from "@/components/layout/HeroSection";
import { InspirationProducts } from "@/components/inspiration/InspirationProducts";
import { CollectionsCarousel } from "@/components/shop/CollectionsCarousel";
import { inspirationContent } from "@/lib/constants/pages/inspiration.content";

export default function InspirationPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        imageSrc={inspirationContent.hero.image}
        imageAlt={inspirationContent.hero.imageAlt}
      />

      <main>
        <InspirationProducts />
        <CollectionsCarousel />
      </main>

      <ResponsiveFooter />
    </div>
  );
}
