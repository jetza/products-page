export interface CollectionDetails {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  heroImage: string;
}

export const COLLECTION_DETAILS: Record<string, CollectionDetails> = {
  "scandinavian-simplicity": {
    title: "Scandinavian Simplicity",
    subtitle: "Effortless elegance, timeless comfort",
    description: "Minimalistic designs, neutral colors, and high-quality textures. Perfect for those who seek comfort with a clean and understated aesthetic.",
    longDescription: "This collection brings the essence of Scandinavian elegance to your living room.",
    heroImage: "/hero/Hero.png",
  },
  "modern-luxe": {
    title: "Modern Luxe",
    subtitle: "Contemporary sophistication",
    description: "Bold designs with luxurious materials and contemporary style.",
    longDescription: "Experience modern luxury with our curated collection.",
    heroImage: "/hero/Hero.png",
  },
  "boho-chic": {
    title: "Boho Chic",
    subtitle: "Eclectic and vibrant",
    description: "Playful textures and vibrant colors for a unique living space.",
    longDescription: "Embrace the boho lifestyle with our colorful collection.",
    heroImage: "/hero/Hero.png",
  },
  "timeless-classics": {
    title: "Timeless Classics",
    subtitle: "Enduring elegance",
    description: "Classic designs that never go out of style.",
    longDescription: "Invest in furniture that stands the test of time.",
    heroImage: "/hero/Hero.png",
  },
};
