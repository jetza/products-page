// import { getCurrentLocale } from "@/lib/getCurrentLocale";
// import { getHref } from "@/lib/getHref";

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
    image: "/Collections/Image.png",
    href: "/collection",
  },
  {
    id: "2",
    title: "Modern Luxe",
    description:
      "Sophisticated and sleek, these sofas blend modern design with luxurious comfort",
    image: "/Collections/image1.png",
    href: "/collection",
  },
  {
    id: "3",
    title: "Boho Chic",
    description:
      "Infused with playful textures and patterns with colorful accents",
    image: "/Collections/image2.png",
    href: "/collection",
  },
  {
    id: "4",
    title: "Timeless Classics",
    description: "Elegant and enduring designs that never go out of style",
    image: "/Collections/image3.png",
    href: "/collection",
  },
];
