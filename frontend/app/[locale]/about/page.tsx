import { ResponsiveFooter } from "@/components/layout/Footer/ResponsiveFooter";
import { HeroSection } from "@/components/layout/HeroSection";
import { AboutIntro } from "@/components/about/AboutIntro";
import { AboutImage } from "@/components/about/AboutImage";
import { AboutReflection } from "@/components/about/AboutReflection";
import { AboutCenter } from "@/components/about/AboutCenter";
import { aboutContent } from "@/lib/constants/pages/about.content";
import { FadeInOnScroll } from "@/components/ui/Content/FadeInOnScroll";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        imageSrc="/Hero/Hero-about.png"
        imageAlt="Sofa Society - About Us"
        contentBg="bg-gray-50"
      >
        <FadeInOnScroll variant="fade-up" duration={1000}>
          <AboutIntro {...aboutContent.intro} />
        </FadeInOnScroll>
      </HeroSection>

      <main>
        <FadeInOnScroll variant="scale" duration={800}>
          <AboutImage {...aboutContent.missionImage} />
        </FadeInOnScroll>
        <FadeInOnScroll variant="fade-up" duration={800}>
          <AboutReflection {...aboutContent.reflection} />
        </FadeInOnScroll>
        <FadeInOnScroll variant="fade-up" duration={800}>
          <AboutCenter {...aboutContent.center} />
        </FadeInOnScroll>
      </main>

      <ResponsiveFooter />
    </div>
  );
}
