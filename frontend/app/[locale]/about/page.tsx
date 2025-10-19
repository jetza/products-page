import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { HeroSection } from "@/components/layout/HeroSection";
import { AboutIntro } from "@/components/about/AboutIntro";
import { AboutImage } from "@/components/about/AboutImage";
import { AboutReflection } from "@/components/about/AboutReflection";
import { AboutCenter } from "@/components/about/AboutCenter";
import { aboutContent } from "@/lib/constants/pages/about.content";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        imageSrc="/Hero/Hero-about.png"
        imageAlt="Sofa Society - About Us"
        contentBg="bg-gray-50"
      >
        <AboutIntro {...aboutContent.intro} />
      </HeroSection>

      <main>
        <AboutImage {...aboutContent.missionImage} />
        <AboutReflection {...aboutContent.reflection} />
        <AboutCenter {...aboutContent.center} />
      </main>

      <ResponsiveFooter />
    </div>
  );
}
