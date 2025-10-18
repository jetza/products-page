/**
 * SEO Constants
 * Centralized SEO metadata for all pages
 */

export const SEO = {
  // Site-wide defaults
  site: {
    name: "Sofa Society Co.",
    url: "https://sofasociety.com", // Update with actual domain
    description: "Premium sofas and furniture for every home. Discover comfort and style with Sofa Society.",
    keywords: ["sofas", "furniture", "home decor", "living room", "comfort", "style", "modern furniture"],
  },

  // Home Page
  home: {
    title: "Sofa Society Co. - Premium Sofas & Furniture",
    description: "Elevate your living space with unmatched comfort & style. Discover handpicked sofas, arm chairs, and collections designed for modern homes.",
    keywords: ["premium sofas", "modern furniture", "scandinavian design", "luxury sofas", "home furniture"],
    openGraph: {
      title: "Sofa Society Co. - Premium Sofas & Furniture",
      description: "Discover your perfect sofa today. Browse our handpicked collection featuring timeless sofas.",
      image: "/Hero/Hero-home.png",
    },
  },

  // Shop Page
  shop: {
    title: "Shop All Sofas | Sofa Society Co.",
    description: "Browse our full collection of premium sofas, arm chairs, and furniture. Filter by style, color, material, and price to find your perfect piece.",
    keywords: ["buy sofas", "shop furniture", "sofa collection", "modern sofas", "scandinavian sofas"],
    openGraph: {
      title: "Shop All Sofas | Sofa Society Co.",
      description: "Explore our premium collection of sofas and furniture for every style.",
    },
  },

  // About Page
  about: {
    title: "About Us | Sofa Society Co.",
    description: "Learn about Sofa Society's mission to deliver high-quality, thoughtfully designed sofas that merge comfort and style for your home.",
    keywords: ["about sofa society", "furniture company", "sustainable furniture", "quality sofas"],
    openGraph: {
      title: "About Sofa Society - Our Story",
      description: "We believe that a sofa is the heart of every home. Discover our commitment to comfort, style, and sustainability.",
      image: "/About/About.png",
    },
  },

  // Inspiration Page
  inspiration: {
    title: "Design Inspiration | Sofa Society Co.",
    description: "Find your inspiration. Explore beautiful spaces and discover your perfect style with our curated collection of sofas and furniture.",
    keywords: ["interior design", "sofa inspiration", "home decor ideas", "living room design"],
    openGraph: {
      title: "Find Your Inspiration | Sofa Society",
      description: "From minimalist sanctuaries to bold statement rooms, find inspiration for your perfect space.",
      image: "/Hero/Hero-inspiration.png",
    },
  },

  // Collection Pages
  collections: {
    scandinavianSimplicity: {
      title: "Scandinavian Simplicity Collection | Sofa Society Co.",
      description: "Minimalistic designs, neutral colors, and high-quality textures. Explore our Scandinavian Simplicity collection.",
      keywords: ["scandinavian sofas", "minimalist furniture", "nordic design", "neutral sofas"],
    },
    modernLuxe: {
      title: "Modern Luxe Collection | Sofa Society Co.",
      description: "Sophisticated and sleek sofas that blend modern design with luxurious comfort.",
      keywords: ["luxury sofas", "modern design", "contemporary furniture"],
    },
    bohoChic: {
      title: "Boho Chic Collection | Sofa Society Co.",
      description: "Playful textures and vibrant patterns with eclectic vibes. Discover our Boho Chic collection.",
      keywords: ["boho furniture", "eclectic sofas", "colorful furniture"],
    },
  },

  // Product Page (template)
  product: {
    titleTemplate: (productName: string) => `${productName} | Sofa Society Co.`,
    descriptionTemplate: (productName: string, collection: string) => 
      `Shop the ${productName} from our ${collection} collection. Premium quality, modern design, and unmatched comfort.`,
    keywords: ["buy sofa", "premium furniture", "modern sofa", "quality furniture"],
  },

  // Account Pages
  account: {
    title: "My Account | Sofa Society Co.",
    description: "Manage your Sofa Society account, view orders, and update your information.",
  },

  // Cart
  cart: {
    title: "Shopping Cart | Sofa Society Co.",
    description: "Review your selected items and proceed to checkout.",
  },

  // Checkout
  checkout: {
    title: "Checkout | Sofa Society Co.",
    description: "Complete your order securely and get your premium furniture delivered.",
  },

  // Privacy Policy
  privacyPolicy: {
    title: "Privacy Policy | Sofa Society Co.",
    description: "Read our privacy policy to understand how we protect your data and respect your privacy.",
  },

  // 404 Page
  notFound: {
    title: "Page Not Found | Sofa Society Co.",
    description: "The page you're looking for doesn't exist. Browse our collections instead.",
  },
} as const;

// Helper function to generate full page title
export const getPageTitle = (pageTitle: string) => {
  return `${pageTitle} | Sofa Society Co.`;
};

// Helper function to generate meta tags
export const generateMetaTags = (seoData: {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
  };
}) => {
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords?.join(", "),
    openGraph: {
      title: seoData.openGraph?.title || seoData.title,
      description: seoData.openGraph?.description || seoData.description,
      images: seoData.openGraph?.image ? [{ url: seoData.openGraph.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.openGraph?.title || seoData.title,
      description: seoData.openGraph?.description || seoData.description,
      images: seoData.openGraph?.image ? [seoData.openGraph.image] : undefined,
    },
  };
};
