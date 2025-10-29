// import { getCurrentLocale } from "@/lib/getCurrentLocale";
// import { getHref } from "@/lib/getHref";

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export const collections: Collection[] = [
  {
    id: "1",
    title: "Scandinavian Simplicity",
    description:
      "Minimalistic designs, neutral colors, and high-quality textures",
    image: `${BACKEND_URL}/collections/image.png`,
    href: "/collection",
  },
  {
    id: "2",
    title: "Modern Luxe",
    description:
      "Sophisticated and sleek, these sofas blend modern design with luxurious comfort",
    image: `${BACKEND_URL}/collections/image1.png`,
    href: "/collection",
  },
  {
    id: "3",
    title: "Boho Chic",
    description:
      "Infused with playful textures and patterns with colorful accents",
    image: `${BACKEND_URL}/collections/image2.png`,
    href: "/collection",
  },
  {
    id: "4",
    title: "Timeless Classics",
    description: "Elegant and enduring designs that never go out of style",
    image: `${BACKEND_URL}/collections/image3.png`,
    href: "/collection",
  },
];
