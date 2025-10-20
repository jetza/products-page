import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";

export default async function seedSofaSocietyData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const productModuleService = container.resolve(Modules.PRODUCT);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const regionModuleService = container.resolve(Modules.REGION);
  const inventoryModuleService = container.resolve(Modules.INVENTORY);

  logger.info("🛋️  Seeding Sofa Society Co...");
  const backendUrl = process.env.BACKEND_URL || "http://localhost:9000";

  // 1. DELETE EXISTING DATA
  logger.info("🗑️  Cleaning database...");

  // Delete inventory first
  try {
    const existingInventory = await inventoryModuleService.listInventoryItems(
      {}
    );
    if (existingInventory.length > 0) {
      await inventoryModuleService.deleteInventoryItems(
        existingInventory.map((i) => i.id)
      );
      logger.info(`   Deleted ${existingInventory.length} inventory items`);
    }
  } catch (error: any) {
    logger.warn(`   Could not delete inventory: ${error.message}`);
  }

  const existingProducts = await productModuleService.listProducts();
  if (existingProducts.length > 0) {
    await productModuleService.deleteProducts(
      existingProducts.map((p) => p.id)
    );
    logger.info(`   Deleted ${existingProducts.length} products`);
  }

  const existingCollections = await productModuleService.listProductCollections(
    {}
  );
  if (existingCollections.length > 0) {
    await productModuleService.deleteProductCollections(
      existingCollections.map((c) => c.id)
    );
    logger.info(`   Deleted ${existingCollections.length} collections`);
  }

  const existingCategories = await productModuleService.listProductCategories();
  if (existingCategories.length > 0) {
    await productModuleService.deleteProductCategories(
      existingCategories.map((c) => c.id)
    );
    logger.info(`   Deleted ${existingCategories.length} categories`);
  }

  // 2. CREATE CATEGORIES
  logger.info("📁 Creating categories...");
  const categories = await productModuleService.createProductCategories([
    { name: "Sofas", handle: "sofas", is_active: true },
    { name: "Arm Chairs", handle: "arm-chairs", is_active: true },
  ]);

  const sofasCategory = categories.find((c) => c.handle === "sofas");
  const armChairsCategory = categories.find((c) => c.handle === "arm-chairs");
  logger.info(`   ✅ Sofas, Arm Chairs`);

  // 3. CREATE COLLECTIONS
  logger.info("📦 Creating collections...");
  const collections = await productModuleService.createProductCollections([
    {
      title: "Scandinavian Simplicity",
      handle: "scandinavian-simplicity",
      metadata: { image_url: `${backendUrl}/collections/image.png` },
    },
    {
      title: "Modern Luxe",
      handle: "modern-luxe",
      metadata: { image_url: `${backendUrl}/collections/image1.png` },
    },
    {
      title: "Boho Chic",
      handle: "boho-chic",
      metadata: { image_url: `${backendUrl}/collections/image2.png` },
    },
    {
      title: "Timeless Classics",
      handle: "timeless-classics",
      metadata: { image_url: `${backendUrl}/collections/image3.png` },
    },
  ]);

  const scandinavian = collections.find(
    (c) => c.handle === "scandinavian-simplicity"
  );
  const modernLuxe = collections.find((c) => c.handle === "modern-luxe");
  const bohoChic = collections.find((c) => c.handle === "boho-chic");
  const timelessClassics = collections.find(
    (c) => c.handle === "timeless-classics"
  );
  logger.info(`   ✅ Created ${collections.length} collections`);

  // 4. GET SALES CHANNEL & REGION
  const defaultSalesChannel = await salesChannelModuleService.listSalesChannels(
    {
      name: "Default Sales Channel",
    }
  );
  const allRegions = await regionModuleService.listRegions();

  if (!defaultSalesChannel.length || !allRegions.length) {
    throw new Error("Missing sales channel or region");
  }

  const defaultRegion = allRegions[0];
  logger.info(`   Using region: ${defaultRegion.name}`);

  // 5. CREATE PRODUCTS
  logger.info("🛋️  Creating products...");

  const COLORS = ["Light Gray", "Dark Gray", "Black"];
  const MATERIALS = ["Velvet", "Linen", "Boucle", "Leather"];

  const createVariants = (sku: string, basePrice: number) => {
    const variants: any[] = [];
    MATERIALS.forEach((material) => {
      COLORS.forEach((color) => {
        variants.push({
          title: `${color} / ${material}`,
          sku: `${sku}-${color
            .replace(/\s+/g, "-")
            .toUpperCase()}-${material.toUpperCase()}`,
          options: { Color: color, Material: material },
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
          collection_id: scandinavian?.id,
          category_ids: sofasCategory ? [sofasCategory.id] : [],
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
          collection_id: timelessClassics?.id,
          category_ids: sofasCategory ? [sofasCategory.id] : [],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Camden Retreat",
          handle: "camden-retreat",
          description: "Boho Chic",
          status: ProductStatus.PUBLISHED,
          images: [{ url: `${backendUrl}/products/camden-retreat.jpg` }],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("CAMDEN-RETREAT", 100000),
          collection_id: bohoChic?.id,
          category_ids: sofasCategory ? [sofasCategory.id] : [],
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
          collection_id: modernLuxe?.id,
          category_ids: sofasCategory ? [sofasCategory.id] : [],
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
          collection_id: modernLuxe?.id,
          category_ids: sofasCategory ? [sofasCategory.id] : [],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Bellaire Haven",
          handle: "bellaire-haven",
          description: "Modern Luxe",
          status: ProductStatus.PUBLISHED,
          images: [
            { url: `${backendUrl}/products/belime-haven-arm-chair.png` },
          ],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("BELLAIRE-HAVEN", 120000),
          collection_id: modernLuxe?.id,
          category_ids: armChairsCategory ? [armChairsCategory.id] : [],
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
          collection_id: scandinavian?.id,
          category_ids: armChairsCategory ? [armChairsCategory.id] : [],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Astrid Curve Gray",
          handle: "astrid-curve-2",
          description: "Scandinavian Simplicity",
          status: ProductStatus.PUBLISHED,
          images: [{ url: `${backendUrl}/products/astrid-curve-gray.jpg` }],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("ASTRID-CURVE-2", 180000),
          collection_id: scandinavian?.id,
          category_ids: sofasCategory ? [sofasCategory.id] : [],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Paloma Haven Armchair",
          handle: "paloma-haven-armchair",
          description: "Modern Luxe",
          status: ProductStatus.PUBLISHED,
          images: [
            { url: `${backendUrl}/products/paloma-haven-arm-chair.jpg` },
          ],
          options: [
            { title: "Color", values: COLORS },
            { title: "Material", values: MATERIALS },
          ],
          variants: createVariants("PALOMA-HAVEN-ARMCHAIR", 120000),
          collection_id: modernLuxe?.id,
          category_ids: sofasCategory ? [sofasCategory.id] : [],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
      ],
    },
  });

  logger.info("✅ Done! 9 products, 4 collections, 2 categories");
}
