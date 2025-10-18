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
    description: "Minimalistic designs, neutral colors, and high-quality textures",
    image: "/collections/image.png",
    href: "/collection",
  },
  {
    id: "2",
    title: "Modern Luxe",
    description: "Sophisticated and sleek, these sofas blend modern design with luxurious comfort",
    image: "/collections/image1.png",
    href: "/collection",
  },
  {
    id: "3",
    title: "Boho Chic",
    description: "Infused with playful textures and patterns with colorful accents",
    image: "/collections/image2.png",
    href: "/collection",
  },
  {
    id: "4",
    title: "Timeless Classics",
    description: "Elegant and enduring designs that never go out of style",
    image: "/collections/image3.png",
    href: "/collection",
  },
];
