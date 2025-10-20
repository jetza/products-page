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
    const existingInventory = await inventoryModuleService.listInventoryItems(
      {},
    );
    if (existingInventory.length > 0) {
      const inventoryIds = existingInventory.map((i) => i.id);
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
    const productIds = existingProducts.map((p) => p.id);
    await productModuleService.deleteProducts(productIds);
    logger.info(`✅ Deleted ${productIds.length} existing products`);
  }

  // Delete all existing collections
  logger.info("🗑️  Deleting existing collections...");
  try {
    const existingCollections =
      await productModuleService.listProductCollections({});
    if (existingCollections.length > 0) {
      const collectionIds = existingCollections.map((c) => c.id);
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
  const backendUrl = process.env.BACKEND_URL || "http://localhost:9000";
  const collectionsData = [
    {
      title: "Scandinavian Simplicity",
      handle: "scandinavian-simplicity",
      metadata: {
        image_url: `${backendUrl}/collections/image.png`,
      },
    },
    {
      title: "Modern Luxe",
      handle: "modern-luxe",
      metadata: {
        image_url: `${backendUrl}/collections/image1.png`,
      },
    },
    {
      title: "Boho Chic",
      handle: "boho-chic",
      metadata: {
        image_url: `${backendUrl}/collections/image2.png`,
      },
    },
    {
      title: "Timeless Classics",
      handle: "timeless-classics",
      metadata: {
        image_url: `${backendUrl}/collections/image3.png`,
      },
    },
  ];

  const createdCollections =
    await productModuleService.createProductCollections(collectionsData);
  logger.info(`✅ Created ${createdCollections.length} collections`);

  // Map collections by handle for easy lookup
  const scandinavianCollection = createdCollections.find(
    (c) => c.handle === "scandinavian-simplicity",
  );
  const modernLuxeCollection = createdCollections.find(
    (c) => c.handle === "modern-luxe",
  );
  const bohoChicCollection = createdCollections.find(
    (c) => c.handle === "boho-chic",
  );
  const timelessCollection = createdCollections.find(
    (c) => c.handle === "timeless-classics",
  );

  // Get or create default sales channel
  const [store] = await storeModuleService.listStores();
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannel.length) {
    const { result: salesChannelResult } = await createSalesChannelsWorkflow(
      container,
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
    logger.info(
      `Category handles: ${allCategories.map((c) => c.handle).join(", ")}`,
    );
  }

  const sofasCategory = allCategories.find((cat) => cat.handle === "sofas");
  const armChairsCategory = allCategories.find(
    (cat) => cat.handle === "arm-chairs",
  );

  if (!sofasCategory || !armChairsCategory) {
    logger.warn(
      "⚠️  Required categories not found. Using any available categories as fallback.",
    );
    logger.info(
      "This is expected if you're running seed for the first time. Categories will be created manually or through admin.",
    );
  }

  logger.info(
    `Using categories: Sofas (${sofasCategory?.id || "not found"}), Arm Chairs (${armChairsCategory?.id || "not found"})`,
  );

  // Standard colors and materials for ALL products
  const COLORS = ["Light Gray", "Dark Gray", "Black"];
  const MATERIALS = ["Velvet", "Linen", "Boucle", "Leather"];

  logger.info(
    `Using region for pricing: ${defaultRegion.name} (${defaultRegion.currency_code})`,
  );

  // Helper to create variants for multiple materials
  const createVariants = (sku: string, basePrice: number) => {
    const variants: any[] = [];
    MATERIALS.forEach((material) => {
      COLORS.forEach((color) => {
        variants.push({
          title: `${color} / ${material}`,
          sku: `${sku}-${color.replace(/\s+/g, "-").toUpperCase()}-${material.toUpperCase()}`,
          options: {
            Color: color,
            Material: material,
          },
          prices: [
            {
              amount: basePrice,
              currency_code: defaultRegion.currency_code,
              rules: { region_id: defaultRegion.id },
            },
          ],
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
          description: "Scandinavian Simplicity",
          status: ProductStatus.PUBLISHED,
          images: [{ url: `${backendUrl}/products/nordic-haven.jpg` }],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("NORDIC-HAVEN", 160000),
          collection_id: scandinavianCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Everly Estate",
          handle: "everly-estate",
          description: "Timeless Splendor",
          status: ProductStatus.PUBLISHED,
          images: [{ url: `${backendUrl}/products/everly-estate.jpg` }],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("EVERLY-ESTATE", 300000),
          collection_id: modernLuxeCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Bellaire Haven",
          handle: "bellaire-haven",
          description: "Modern Luxe",
          status: ProductStatus.PUBLISHED,
          images: [
            {
              url: `${backendUrl}/products/belime-haven-arm-chair.png`,
            },
          ],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("BELLAIRE-HAVEN", 120000),
          collection_id: modernLuxeCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Camden Retreat",
          handle: "camden-retreat",
          description: "Boho Chic",
          status: ProductStatus.PUBLISHED,
          images: [
            { url: `${backendUrl}/products/camden-retreat.jpg` },
          ],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("CAMDEN-RETREAT", 100000),
          collection_id: bohoChicCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Astrid Curve",
          handle: "astrid-curve",
          description: "Scandinavian Simplicity",
          status: ProductStatus.PUBLISHED,
          images: [{ url: `${backendUrl}/products/astrid-curve.png` }],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("ASTRID-CURVE", 180000),
          collection_id: scandinavianCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Astrid Curve Gray",
          handle: "astrid-curve-2",
          description: "Scandinavian Simplicity",
          status: ProductStatus.PUBLISHED,
          images: [
            { url: `${backendUrl}/products/astrid-curve-gray.jpg` },
          ],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("ASTRID-CURVE-2", 180000),
          collection_id: scandinavianCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Paloma Haven",
          handle: "paloma-haven",
          description: "Modern Luxe",
          status: ProductStatus.PUBLISHED,
          images: [{ url: `${backendUrl}/products/paloma-haven.jpg` }],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("PALOMA-HAVEN", 120000),
          collection_id: modernLuxeCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Paloma Haven Armchair",
          handle: "paloma-haven-armchair",
          description: "Modern Luxe",
          status: ProductStatus.PUBLISHED,
          images: [
            {
              url: `${backendUrl}/products/paloma-haven-arm-chair.jpg`,
            },
          ],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("PALOMA-HAVEN-ARMCHAIR", 120000),
          collection_id: modernLuxeCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Sutton Royale",
          handle: "sutton-royale",
          description: "Modern Luxe",
          status: ProductStatus.PUBLISHED,
          images: [{ url: `${backendUrl}/products/sutton-royale.jpg` }],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("SUTTON-ROYALE", 250000),
          collection_id: modernLuxeCollection?.id,
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
      ],
    },
  });

  logger.info("✅ Sofa Society Co. seed completed!");
  logger.info(
    "🛋️  9 products with 3 color variants each (Light Gray, Dark Gray, Black)",
  );
}
