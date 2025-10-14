export interface Collection {
  id: string;
  title: string;
  image: string;
  href: string;
}

export const collections: Collection[] = [
  {
    id: "1",
    title: "Scandinavian Simplicity",
    image: "/collections/image.png",
    href: "/shop?collection=scandinavian-simplicity",
  },
  {
    id: "2",
    title: "Modern Luxe",
    image: "/collections/image1.png",
    href: "/shop?collection=modern-luxe",
  },
  {
    id: "3",
    title: "Boho Chic",
    image: "/collections/image2.png",
    href: "/shop?collection=boho-chic",
  },
  {
    id: "4",
    title: "Timeless Classics",
    image: "/collections/image3.png",
    href: "/shop?collection=timeless-classics",
  },
];
