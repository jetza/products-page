import React from "react";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "../lib/cart-context";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("CartContext", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it("initializes with empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it("adds item to cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(
        {
          id: "1",
          title: "Test Product",
          price: 100,
          image: "/test.jpg",
        },
        2,
      );
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.totalPrice).toBe(200);
  });

  it("increments quantity when adding existing item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(
        {
          id: "1",
          title: "Test Product",
          price: 100,
          image: "/test.jpg",
        },
        1,
      );
    });

    act(() => {
      result.current.addToCart(
        {
          id: "1",
          title: "Test Product",
          price: 100,
          image: "/test.jpg",
        },
        1,
      );
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it("removes item from cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(
        {
          id: "1",
          title: "Test Product",
          price: 100,
          image: "/test.jpg",
        },
        1,
      );
    });

    act(() => {
      result.current.removeFromCart("1");
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
  });

  it("updates item quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(
        {
          id: "1",
          title: "Test Product",
          price: 100,
          image: "/test.jpg",
        },
        1,
      );
    });

    act(() => {
      result.current.updateQuantity("1", 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.totalItems).toBe(5);
    expect(result.current.totalPrice).toBe(500);
  });

  it("removes item when quantity is set to 0", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(
        {
          id: "1",
          title: "Test Product",
          price: 100,
          image: "/test.jpg",
        },
        1,
      );
    });

    act(() => {
      result.current.updateQuantity("1", 0);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it("clears cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(
        {
          id: "1",
          title: "Test Product",
          price: 100,
          image: "/test.jpg",
        },
        1,
      );
      result.current.addToCart(
        {
          id: "2",
          title: "Test Product 2",
          price: 200,
          image: "/test2.jpg",
        },
        1,
      );
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it("calculates total price correctly with multiple items", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(
        {
          id: "1",
          title: "Product 1",
          price: 100,
          image: "/test1.jpg",
        },
        2,
      );
      result.current.addToCart(
        {
          id: "2",
          title: "Product 2",
          price: 150,
          image: "/test2.jpg",
        },
        3,
      );
    });

    expect(result.current.totalPrice).toBe(650); // (100 * 2) + (150 * 3)
    expect(result.current.totalItems).toBe(5);
  });
});
