export const homeContent = {
  hero: {
    title: "Elevate Your Living Space with Unmatched Comfort & Style",
    subtitle: "Discover Your Perfect Sofa Today",
    cta: "Explore Now",
    description:
      "Browse our handpicked Sofa Sales collection featuring timeless sofas.",
    image: "/Hero/Hero-home.png",
    imageAlt: "Sofa Society - Premium Living Room Furniture",
  },

  products: {
    title: "Our products",
    categories: [
      {
        title: "Sofas",
        slug: "sofas",
        folder: "sofas" as const,
      },
      {
        title: "Arm Chairs",
        slug: "arm-chairs",
        folder: "arm-chairs" as const,
      },
    ],
  },

  collections: {
    title: "Collections",
    items: [
      {
        title: "Scandinavian Simplicity",
        description:
          "Minimalistic designs, neutral colors, and high-quality textures.",
        slug: "scandinavian-simplicity",
      },
      {
        title: "Modern Luxe",
        description:
          "Sophisticated and sleek, these sofas blend modern design with luxurious comfort.",
        slug: "modern-luxe",
      },
      {
        title: "Boho Chic",
        description:
          "Infused with playful textures and vibrant patterns with eclectic vibes.",
        slug: "boho-chic",
      },
    ],
  },

  about: {
    title:
      "At Sofa Society, we believe that a sofa is the heart of every home.",
    description:
      "We are dedicated to delivering high-quality, thoughtfully designed sofas that merge comfort and style.",
    additionalText:
      "Our mission is to transform your living space into a sanctuary of relaxation and beauty, with products built to last.",
    cta: "Read more about Sofa Society",
    image: "/Home/home.png",
    imageAlt: "Modern living room interior",
  },
};
