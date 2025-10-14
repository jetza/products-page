import { CreateInventoryLevelInput, ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createProductsWorkflow,
  createProductCategoriesWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";

/**
 * Sofa Society Co. - Seed Data
 * E-commerce furniture store specializing in sofas and armchairs
 */

export default async function seedSofaSocietyData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const storeModuleService = container.resolve(Modules.STORE);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);

  logger.info("🛋️  Seeding Sofa Society Co. data...");

  // Get or create default sales channel
  const [store] = await storeModuleService.listStores();
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannel.length) {
    const { result: salesChannelResult } = await createSalesChannelsWorkflow(
      container
    ).run({
      input: {
        salesChannelsData: [
          {
            name: "Default Sales Channel",
          },
        ],
      },
    });
    defaultSalesChannel = [salesChannelResult[0]];
  }

  // Update store details
  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        name: "Sofa Society Co.",
        supported_currencies: [
          {
            currency_code: "eur",
            is_default: true,
          },
        ],
        default_sales_channel_id: defaultSalesChannel[0].id,
      },
    },
  });

  // Create region (Europe)
  logger.info("Creating region...");
  const { result: regions } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Europe",
          currency_code: "eur",
          countries: ["rs", "de", "fr", "it", "es", "nl", "be"],
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  });

  // Create product categories
  logger.info("Creating product categories...");
  const { result: categories } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: [
        {
          name: "Sofas",
          is_active: true,
        },
        {
          name: "Arm Chairs",
          is_active: true,
        },
        {
          name: "Coffee Tables",
          is_active: true,
        },
      ],
    },
  });

  const sofasCategory = categories.find((c) => c.name === "Sofas");
  const armChairsCategory = categories.find((c) => c.name === "Arm Chairs");

  // Standard color options for all products
  const STANDARD_COLORS = ["Light Gray", "Dark Gray", "Black"];
  
  // Helper function to create variants with standard colors
  const createVariants = (baseSku: string, material: string, price: number) => {
    return STANDARD_COLORS.map(color => ({
      title: `${color} / ${material}`,
      sku: `${baseSku}-${color.replace(/\s+/g, '-').toUpperCase()}`,
      options: {
        Color: color,
        Material: material,
      },
      prices: [
        {
          amount: price,
          currency_code: "eur" as const,
        },
      ],
    }));
  };

  // Create products
  logger.info("Creating products...");
  
  const productsData = [
    // SOFAS
    {
      title: "Nordic Haven",
      handle: "nordic-haven",
      description: "Minimalistic design with neutral colors. This light gray sofa brings Scandinavian simplicity to your living space with high-quality textures and clean lines.",
      status: ProductStatus.PUBLISHED,
      images: [
        {
          url: "http://localhost:9000/products/Frame 705.png",
        },
      ],
      options: [
        {
          title: "Color",
          values: STANDARD_COLORS,
        },
        {
          title: "Material",
          values: ["Fabric"],
        },
      ],
      variants: createVariants("NORDIC-HAVEN", "Fabric", 120000),
      collection: {
        title: "Scandinavian Simplicity",
        handle: "scandinavian-simplicity",
      },
      categories: [{ id: sofasCategory?.id }],
      tags: [{ value: "furniture" }, { value: "sofa" }, { value: "scandinavian" }],
    },
    {
      title: "Every Color",
      handle: "every-color",
      description: "Bold and sophisticated. This vibrant coral sofa makes a statement in any modern luxe interior with its rich velvet finish and contemporary design.",
      status: ProductStatus.PUBLISHED,
      images: [
        {
          url: "http://localhost:9000/products/Frame 705 (1).png",
        },
      ],
      options: [
        {
          title: "Color",
          values: ["Coral", "Orange"],
        },
        {
          title: "Material",
          values: ["Velvet"],
        },
      ],
      variants: [
        {
          title: "Coral / Velvet",
          sku: "EVERY-COLOR-CORAL",
          options: {
            Color: "Coral",
            Material: "Velvet",
          },
          prices: [
            {
              amount: 300000, // €3000
              currency_code: "eur",
            },
          ],
        },
        {
          title: "Orange / Velvet",
          sku: "EVERY-COLOR-ORANGE",
          options: {
            Color: "Orange",
            Material: "Velvet",
          },
          prices: [
            {
              amount: 300000,
              currency_code: "eur",
            },
          ],
        },
      ],
      collection: {
        title: "Modern Luxe",
        handle: "modern-luxe",
      },
      categories: [{ id: sofasCategory?.id }],
      tags: [{ value: "furniture" }, { value: "sofa" }, { value: "luxury" }],
    },
    {
      title: "Comdev Retreat",
      handle: "comdev-retreat",
      description: "Playful textures and vibrant colors. This forest green velvet sofa embodies boho chic style with its rich emerald tones and comfortable design.",
      status: ProductStatus.PUBLISHED,
      images: [
        {
          url: "http://localhost:9000/products/Frame 705 (2).png",
        },
      ],
      options: [
        {
          title: "Color",
          values: ["Forest Green", "Emerald"],
        },
        {
          title: "Material",
          values: ["Velvet"],
        },
      ],
      variants: [
        {
          title: "Forest Green / Velvet",
          sku: "COMDEV-FG",
          options: {
            Color: "Forest Green",
            Material: "Velvet",
          },
          prices: [
            {
              amount: 100000, // €1000
              currency_code: "eur",
            },
          ],
        },
        {
          title: "Emerald / Velvet",
          sku: "COMDEV-EM",
          options: {
            Color: "Emerald",
            Material: "Velvet",
          },
          prices: [
            {
              amount: 100000,
              currency_code: "eur",
            },
          ],
        },
      ],
      collection: {
        title: "Boho Chic",
        handle: "boho-chic",
      },
      categories: [{ id: sofasCategory?.id }],
      tags: [{ value: "furniture" }, { value: "sofa" }, { value: "boho" }],
    },
    {
      title: "Azure Curve",
      handle: "azure-curve-sofa",
      description: "Modern design meets luxurious comfort. This charcoal sofa features sleek lines and premium fabric for a sophisticated living space.",
      status: ProductStatus.PUBLISHED,
      images: [
        {
          url: "http://localhost:9000/products/Frame 705 (3).png",
        },
      ],
      options: [
        {
          title: "Color",
          values: ["Charcoal", "Black"],
        },
        {
          title: "Material",
          values: ["Fabric"],
        },
      ],
      variants: [
        {
          title: "Charcoal / Fabric",
          sku: "AZURE-CURVE-SOFA-CH",
          options: {
            Color: "Charcoal",
            Material: "Fabric",
          },
          prices: [
            {
              amount: 180000, // €1800
              currency_code: "eur",
            },
          ],
        },
        {
          title: "Black / Fabric",
          sku: "AZURE-CURVE-SOFA-BK",
          options: {
            Color: "Black",
            Material: "Fabric",
          },
          prices: [
            {
              amount: 180000,
              currency_code: "eur",
            },
          ],
        },
      ],
      collection: {
        title: "Modern Luxe",
        handle: "modern-luxe",
      },
      categories: [{ id: sofasCategory?.id }],
      tags: [{ value: "furniture" }, { value: "sofa" }, { value: "modern" }],
    },
    {
      title: "Paloma Haven",
      handle: "paloma-haven",
      description: "Masterpiece of minimalism and luxury. This linen sofa features clean lines and elegant proportions, perfect for the Modern Luxe collection. See more out of Modern Luxe collection.",
      status: ProductStatus.PUBLISHED,
      images: [
        {
          url: "http://localhost:9000/products/Frame 705 (4).png",
        },
      ],
      options: [
        {
          title: "Color",
          values: ["Light Gray", "Dark Gray"],
        },
        {
          title: "Material",
          values: ["Linen"],
        },
      ],
      variants: [
        {
          title: "Light Gray / Linen",
          sku: "PALOMA-HAVEN-LG",
          options: {
            Color: "Light Gray",
            Material: "Linen",
          },
          prices: [
            {
              amount: 120000, // €1200
              currency_code: "eur",
            },
          ],
        },
        {
          title: "Dark Gray / Linen",
          sku: "PALOMA-HAVEN-DG",
          options: {
            Color: "Dark Gray",
            Material: "Linen",
          },
          prices: [
            {
              amount: 120000,
              currency_code: "eur",
            },
          ],
        },
      ],
      collection: {
        title: "Modern Luxe",
        handle: "modern-luxe",
      },
      categories: [{ id: sofasCategory?.id }],
      tags: [{ value: "furniture" }, { value: "sofa" }, { value: "luxury" }],
    },
    {
      title: "Paloma Neon",
      handle: "paloma-neon",
      description: "Timeless elegance in premium leather. This black leather sofa combines classic design with modern comfort for a sophisticated living space.",
      status: ProductStatus.PUBLISHED,
      images: [
        {
          url: "http://localhost:9000/products/Frame 705 (5).png",
        },
      ],
      options: [
        {
          title: "Color",
          values: ["Black", "Charcoal"],
        },
        {
          title: "Material",
          values: ["Leather"],
        },
      ],
      variants: [
        {
          title: "Black / Leather",
          sku: "PALOMA-NEON-BK",
          options: {
            Color: "Black",
            Material: "Leather",
          },
          prices: [
            {
              amount: 150000, // €1500
              currency_code: "eur",
            },
          ],
        },
        {
          title: "Charcoal / Leather",
          sku: "PALOMA-NEON-CH",
          options: {
            Color: "Charcoal",
            Material: "Leather",
          },
          prices: [
            {
              amount: 150000,
              currency_code: "eur",
            },
          ],
        },
      ],
      collection: {
        title: "Timeless Classics",
        handle: "timeless-classics",
      },
      categories: [{ id: sofasCategory?.id }],
      tags: [{ value: "furniture" }, { value: "sofa" }, { value: "classic" }],
    },
    {
      title: "Sultan Purple",
      handle: "sultan-purple",
      description: "Vibrant and playful. This purple velvet sofa adds a pop of color and boho charm to any living space with luxurious texture and comfort.",
      status: ProductStatus.PUBLISHED,
      images: [
        {
          url: "http://localhost:9000/products/Frame 705 (6).png",
        },
      ],
      options: [
        {
          title: "Color",
          values: ["Purple", "Lavender"],
        },
        {
          title: "Material",
          values: ["Velvet"],
        },
      ],
      variants: [
        {
          title: "Purple / Velvet",
          sku: "SULTAN-PURPLE",
          options: {
            Color: "Purple",
            Material: "Velvet",
          },
          prices: [
            {
              amount: 250000, // €2500
              currency_code: "eur",
            },
          ],
        },
        {
          title: "Lavender / Velvet",
          sku: "SULTAN-LAVENDER",
          options: {
            Color: "Lavender",
            Material: "Velvet",
          },
          prices: [
            {
              amount: 250000,
              currency_code: "eur",
            },
          ],
        },
      ],
      collection: {
        title: "Boho Chic",
        handle: "boho-chic",
      },
      categories: [{ id: sofasCategory?.id }],
      tags: [{ value: "furniture" }, { value: "sofa" }, { value: "colorful" }],
    },
    {
      title: "Oslo Sofa",
      handle: "oslo-sofa",
      description: "Crisp white elegance. This cream fabric sofa embodies Scandinavian simplicity with its clean lines and neutral palette.",
      status: ProductStatus.PUBLISHED,
      images: [
        {
          url: "http://localhost:9000/products/Frame 705 (7).png",
        },
      ],
      options: [
        {
          title: "Color",
          values: ["White", "Cream"],
        },
        {
          title: "Material",
          values: ["Fabric"],
        },
      ],
      variants: [
        {
          title: "White / Fabric",
          sku: "OSLO-WHITE",
          options: {
            Color: "White",
            Material: "Fabric",
          },
          prices: [
            {
              amount: 200000, // €2000
              currency_code: "eur",
            },
          ],
        },
        {
          title: "Cream / Fabric",
          sku: "OSLO-CREAM",
          options: {
            Color: "Cream",
            Material: "Fabric",
          },
          prices: [
            {
              amount: 200000,
              currency_code: "eur",
            },
          ],
        },
      ],
      collection: {
        title: "Scandinavian Simplicity",
        handle: "scandinavian-simplicity",
      },
      categories: [{ id: sofasCategory?.id }],
      tags: [{ value: "furniture" }, { value: "sofa" }, { value: "scandinavian" }],
    },
    // ARM CHAIR
    {
      title: "Bel-m-r Numb",
      handle: "belmr-numb",
      description: "Elegant armchair with soft curves. This light gray fabric chair brings Scandinavian comfort and style to any corner of your home.",
      status: ProductStatus.PUBLISHED,
      images: [
        {
          url: "http://localhost:9000/products/Frame 705 (8).png",
        },
      ],
      options: [
        {
          title: "Color",
          values: ["Light Gray", "Beige"],
        },
        {
          title: "Material",
          values: ["Fabric"],
        },
      ],
      variants: [
        {
          title: "Light Gray / Fabric",
          sku: "BELMR-LG",
          options: {
            Color: "Light Gray",
            Material: "Fabric",
          },
          prices: [
            {
              amount: 120000, // €1200
              currency_code: "eur",
            },
          ],
        },
        {
          title: "Beige / Fabric",
          sku: "BELMR-BG",
          options: {
            Color: "Beige",
            Material: "Fabric",
          },
          prices: [
            {
              amount: 120000,
              currency_code: "eur",
            },
          ],
        },
      ],
      collection: {
        title: "Scandinavian Simplicity",
        handle: "scandinavian-simplicity",
      },
      categories: [{ id: armChairsCategory?.id }],
      tags: [{ value: "furniture" }, { value: "armchair" }, { value: "scandinavian" }],
    },
  ];

  await createProductsWorkflow(container).run({
    input: {
      products: productsData,
    },
  });

  logger.info("✅ Sofa Society Co. seed data completed!");
  logger.info("🛋️  Created 9 products across 4 collections");
  logger.info("📦 Products: Nordic Haven, Every Color, Comdev Retreat, Azure Curve, Paloma Haven, Paloma Neon, Sultan Purple, Oslo Sofa, Bel-m-r Numb");
  logger.info("🏷️  Collections: Scandinavian Simplicity, Modern Luxe, Boho Chic, Timeless Classics");
}
