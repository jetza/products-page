import {
  getProductColors,
  getProductSizes,
  getProductMaterials,
  getProductPrice,
  formatPrice,
  getProductSlug,
} from "../product-utils";
import type { Product } from "@/types/product";

describe("Product Utils", () => {
  const mockProduct: Product = {
    id: "1",
    title: "Test Product",
    handle: "test-product",
    description: "Test description",
    thumbnail: "/test.jpg",
    variants: [
      {
        id: "v1",
        title: "Variant 1",
        options: [
          { id: "o1", value: "Red", option: { id: "opt1", title: "Color" } },
          { id: "o2", value: "Large", option: { id: "opt2", title: "Size" } },
          {
            id: "o3",
            value: "Cotton",
            option: { id: "opt3", title: "Material" },
          },
        ],
        calculated_price: {
          calculated_amount: 120000,
        },
        prices: [{ amount: 120000, currency_code: "eur" }],
      },
      {
        id: "v2",
        title: "Variant 2",
        options: [
          { id: "o4", value: "Blue", option: { id: "opt1", title: "Color" } },
          { id: "o5", value: "Medium", option: { id: "opt2", title: "Size" } },
          {
            id: "o6",
            value: "Velvet",
            option: { id: "opt3", title: "Material" },
          },
        ],
        calculated_price: {
          calculated_amount: 150000,
        },
      },
    ],
  } as Product;

  describe("getProductSlug", () => {
    it("returns product handle", () => {
      expect(getProductSlug(mockProduct)).toBe("test-product");
    });
  });

  describe("getProductColors", () => {
    it("extracts unique colors from variants", () => {
      const colors = getProductColors(mockProduct);
      expect(colors).toEqual(["Red", "Blue"]);
    });

    it("returns empty array for product without variants", () => {
      const product = { ...mockProduct, variants: undefined };
      expect(getProductColors(product as Product)).toEqual([]);
    });

    it("returns empty array for empty variants", () => {
      const product = { ...mockProduct, variants: [] };
      expect(getProductColors(product as Product)).toEqual([]);
    });
  });

  describe("getProductSizes", () => {
    it("extracts unique sizes from variants", () => {
      const sizes = getProductSizes(mockProduct);
      expect(sizes).toEqual(["Large", "Medium"]);
    });

    it("returns empty array for product without variants", () => {
      const product = { ...mockProduct, variants: undefined };
      expect(getProductSizes(product as Product)).toEqual([]);
    });
  });

  describe("getProductMaterials", () => {
    it("extracts unique materials from variants", () => {
      const materials = getProductMaterials(mockProduct);
      expect(materials).toEqual(["Cotton", "Velvet"]);
    });

    it("returns empty array for product without variants", () => {
      const product = { ...mockProduct, variants: undefined };
      expect(getProductMaterials(product as Product)).toEqual([]);
    });
  });

  describe("getProductPrice", () => {
    it("returns calculated_amount from first variant", () => {
      expect(getProductPrice(mockProduct)).toBe(120000);
    });

    it("falls back to prices array if no calculated_price", () => {
      const product = {
        ...mockProduct,
        variants: [
          {
            id: "v1",
            calculated_price: undefined,
            prices: [{ amount: 100000 }],
          },
        ],
      } as Product;
      expect(getProductPrice(product)).toBe(100000);
    });

    it("returns 0 for product without variants", () => {
      const product = { ...mockProduct, variants: undefined };
      expect(getProductPrice(product as Product)).toBe(0);
    });

    it("returns 0 for variant without price data", () => {
      const product = {
        ...mockProduct,
        variants: [
          {
            id: "v1",
            calculated_price: undefined,
            prices: undefined,
          },
        ],
      } as Product;
      expect(getProductPrice(product)).toBe(0);
    });
  });

  describe("formatPrice", () => {
    it("formats price with default euro currency", () => {
      expect(formatPrice(120000)).toBe("€1200.00");
    });

    it("formats price with custom currency", () => {
      expect(formatPrice(120000, "$")).toBe("$1200.00");
    });

    it("formats zero price", () => {
      expect(formatPrice(0)).toBe("€0.00");
    });

    it("formats decimal prices correctly", () => {
      expect(formatPrice(12050)).toBe("€120.50");
    });
  });
});
