import { ExecArgs } from "@medusajs/framework/types";
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
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";

/**
 * Sofa Society Co. - Simplified Seed Data
 * All products have 3 standard colors: Light Gray, Dark Gray, Black
 */

export default async function seedSofaSocietyData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const storeModuleService = container.resolve(Modules.STORE);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const regionModuleService = container.resolve(Modules.REGION);
  const productModuleService = container.resolve(Modules.PRODUCT);
  const inventoryModuleService = container.resolve(Modules.INVENTORY);

  logger.info("🛋️  Seeding Sofa Society Co. data...");

  // Delete all existing inventory items first
  logger.info("🗑️  Deleting existing inventory items...");
  try {
    const existingInventory = await inventoryModuleService.listInventoryItems({});
    if (existingInventory.length > 0) {
      const inventoryIds = existingInventory.map(i => i.id);
      await inventoryModuleService.deleteInventoryItems(inventoryIds);
      logger.info(`✅ Deleted ${inventoryIds.length} existing inventory items`);
    }
  } catch (error) {
    logger.warn(`⚠️  Could not delete inventory items: ${error.message}`);
  }

  // Delete all existing products
  logger.info("🗑️  Deleting existing products...");
  const existingProducts = await productModuleService.listProducts();
  if (existingProducts.length > 0) {
    const productIds = existingProducts.map(p => p.id);
    await productModuleService.deleteProducts(productIds);
    logger.info(`✅ Deleted ${productIds.length} existing products`);
  }

  // Delete all existing collections
  logger.info("🗑️  Deleting existing collections...");
  try {
    const existingCollections = await productModuleService.listProductCollections({});
    if (existingCollections.length > 0) {
      const collectionIds = existingCollections.map(c => c.id);
      await productModuleService.deleteProductCollections(collectionIds);
      logger.info(`✅ Deleted ${collectionIds.length} existing collections`);
    } else {
      logger.info("No existing collections found");
    }
  } catch (error) {
    logger.warn(`⚠️  Could not delete collections: ${error.message}`);
  }

  // Create collections with images
  logger.info("Creating collections...");
  const collectionsData = [
    {
      title: "Scandinavian Simplicity",
      handle: "scandinavian-simplicity",
      metadata: {
        image_url: "http://localhost:9000/collections/image.png"
      }
    },
    {
      title: "Modern Luxe",
      handle: "modern-luxe",
      metadata: {
        image_url: "http://localhost:9000/collections/image1.png"
      }
    },
    {
      title: "Boho Chic",
      handle: "boho-chic",
      metadata: {
        image_url: "http://localhost:9000/collections/image2.png"
      }
    },
    {
      title: "Timeless Classics",
      handle: "timeless-classics",
      metadata: {
        image_url: "http://localhost:9000/collections/image3.png"
      }
    }
  ];

  const createdCollections = await productModuleService.createProductCollections(collectionsData);
  logger.info(`✅ Created ${createdCollections.length} collections`);

  // Map collections by handle for easy lookup
  const scandinavianCollection = createdCollections.find(c => c.handle === "scandinavian-simplicity");
  const modernLuxeCollection = createdCollections.find(c => c.handle === "modern-luxe");
  const bohoChicCollection = createdCollections.find(c => c.handle === "boho-chic");
  const timelessCollection = createdCollections.find(c => c.handle === "timeless-classics");

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

  // Update store
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

  // Get existing region (skip creation to avoid conflicts)
  logger.info("Getting existing region...");
  const allRegions = await regionModuleService.listRegions();
  if (!allRegions.length) {
    logger.warn("No regions found. Please create a region first.");
    throw new Error("No regions available");
  }
  const defaultRegion = allRegions[0];
  logger.info(`Using existing region: ${defaultRegion.name}`);

  // Get existing categories (skip creation as they already exist from previous seed)
  logger.info("Getting existing categories...");
  const allCategories = await productModuleService.listProductCategories();
  
  logger.info(`Found ${allCategories.length} categories`);
  if (allCategories.length > 0) {
    logger.info(`Category handles: ${allCategories.map(c => c.handle).join(", ")}`);
  }

  const sofasCategory = allCategories.find((cat) => cat.handle === "sofas");
  const armChairsCategory = allCategories.find((cat) => cat.handle === "arm-chairs");
  
  if (!sofasCategory || !armChairsCategory) {
    logger.warn("⚠️  Required categories not found. Using any available categories as fallback.");
    logger.info("This is expected if you're running seed for the first time. Categories will be created manually or through admin.");
  }
  
  logger.info(`Using categories: Sofas (${sofasCategory?.id || "not found"}), Arm Chairs (${armChairsCategory?.id || "not found"})`);

  // Standard colors and materials for ALL products
  const COLORS = ["Light Gray", "Dark Gray", "Black"];
  const MATERIALS = ["Linen", "Cotton", "Velvet"];
  
  logger.info(`📍 Using region for pricing: ${defaultRegion.name} (${defaultRegion.currency_code})`);

  // Helper to create variants for multiple materials
  const createVariants = (sku: string, basePrice: number) => {
    const variants: any[] = [];
    MATERIALS.forEach(material => {
      COLORS.forEach(color => {
        variants.push({
          title: `${color} / ${material}`,
          sku: `${sku}-${color.replace(/\s+/g, '-').toUpperCase()}-${material.toUpperCase()}`,
          options: {
            Color: color,
            Material: material,
          },
          prices: [{
            amount: basePrice,
            currency_code: defaultRegion.currency_code,
            rules: { region_id: defaultRegion.id }
          }],
        });
      });
    });
    return variants;
  };

  // Create products
  logger.info("Creating products...");
  
  await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "Nordic Haven",
          handle: "nordic-haven",
          description: "Minimalistic design with neutral colors. This light gray sofa brings Scandinavian simplicity to your living space.",
          status: ProductStatus.PUBLISHED,
          images: [{ url: "http://localhost:9000/products/sofa1.png" }],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("NORDIC-HAVEN", 120000),
          collection_id: scandinavianCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Every Color",
          handle: "every-color",
          description: "Bold statement in dark tones. This velvet sofa adds drama and sophistication to any room.",
          status: ProductStatus.PUBLISHED,
          images: [{ url: "http://localhost:9000/products/sofa2.png" }],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("EVERY-COLOR", 300000),
          collection_id: modernLuxeCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Comdev Retreat",
          handle: "comdev-retreat",
          description: "Playful textures and vibrant style. This velvet sofa embodies boho chic with comfortable design.",
          status: ProductStatus.PUBLISHED,
          images: [{ url: "http://localhost:9000/products/sofa3.png" }],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("COMDEV-RETREAT", 100000),
          collection_id: bohoChicCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Azure Curve",
          handle: "azure-curve-sofa",
          description: "Modern design meets luxurious comfort. This sofa features sleek lines and premium fabric.",
          status: ProductStatus.PUBLISHED,
          images: [{ url: "http://localhost:9000/products/sofa4.png" }],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("AZURE-CURVE-SOFA", 180000),
          collection_id: modernLuxeCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Paloma Haven",
          handle: "paloma-haven",
          description: "Masterpiece of minimalism and luxury. This linen sofa features clean lines and elegant proportions.",
          status: ProductStatus.PUBLISHED,
          images: [{ url: "http://localhost:9000/products/sofa5.png" }],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("PALOMA-HAVEN", 120000),
          collection_id: modernLuxeCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Paloma Neon",
          handle: "paloma-neon",
          description: "Timeless elegance in premium materials. This sofa combines classic design with modern comfort.",
          status: ProductStatus.PUBLISHED,
          images: [{ url: "http://localhost:9000/products/sofa6.png" }],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("PALOMA-NEON", 150000),
          collection_id: timelessCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Sultan Purple",
          handle: "sultan-purple",
          description: "Vibrant and playful. This sofa adds charm to any living space with luxurious texture.",
          status: ProductStatus.PUBLISHED,
          images: [{ url: "http://localhost:9000/products/sofa7.png" }],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("SULTAN-PURPLE", 250000),
          collection_id: bohoChicCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Oslo Sofa",
          handle: "oslo-sofa",
          description: "Crisp elegance. This sofa embodies Scandinavian simplicity with clean lines.",
          status: ProductStatus.PUBLISHED,
          images: [{ url: "http://localhost:9000/products/sofa8.png" }],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("OSLO-SOFA", 200000),
          collection_id: scandinavianCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Bel-m-r Numb",
          handle: "belmr-numb",
          description: "Elegant armchair with soft curves. This chair brings Scandinavian comfort to any corner.",
          status: ProductStatus.PUBLISHED,
          images: [{ url: "http://localhost:9000/products/sofa9.png" }],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("BELMR-NUMB", 120000),
          collection_id: scandinavianCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
      ],
    },
  });

  logger.info("✅ Sofa Society Co. seed completed!");
  logger.info("🛋️  9 products with 3 color variants each (Light Gray, Dark Gray, Black)");
}
