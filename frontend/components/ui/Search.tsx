"use client";

import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from "react";
import { Notification } from "@/components/ui/Notification";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import { cn } from "@/lib/utils/cn";
import { SearchIcon } from "@/components/icons";
import { CloseButton } from "./Buttons/CloseButton";
import Link from "next/link";
import { getHref } from "@/lib/getHref";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import Image from "next/image";
import { getProducts } from "@/lib/products-service";
import type { Product } from "@/types/product";
import { CONTENT } from "@/lib/constants/content";

interface SearchProps {
  variant?: "desktop" | "mobile";
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const Search: React.FC<SearchProps> = ({
  variant = "desktop",
  isOpen,
  onClose,
  className,
}) => {
  const locale = getCurrentLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebouncedValue(searchQuery, 600);

  const handleCloseNotification = React.useCallback(() => setError(""), []);
  
  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setAllProducts([]);
      setIsProductsLoading(false);
      return;
    }
    let isMounted = true;
    setIsProductsLoading(true);
    setError("");
    const minLoading = 900; // ms
    const start = Date.now();
    const loadProducts = async () => {
      try {
        const products = await getProducts(50);
        if (isMounted) setAllProducts(products);
      } catch {
        setError("Failed to load products.");
      } finally {
        if (isMounted) {
          const elapsed = Date.now() - start;
          if (elapsed < minLoading) {
            setTimeout(() => setIsProductsLoading(false), minLoading - elapsed);
          } else {
            setIsProductsLoading(false);
          }
        }
      }
    };
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, [debouncedQuery]);

  useLayoutEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);


  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);
  const filteredResults = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const query = debouncedQuery.toLowerCase();
    return allProducts.filter((product) =>
      product.title?.toLowerCase().includes(query) ||
      product.collection?.title?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    );
  }, [debouncedQuery, allProducts]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const timeout = setTimeout(() => setIsSearching(false), 200);
    return () => clearTimeout(timeout);
  }, [debouncedQuery]);


  if (!isOpen) return null;

  if (variant === "mobile") {
    return (
      <div className={cn("px-4 pb-4 bg-black", className)}>
        <Notification message={error} isOpen={!!error} onClose={handleCloseNotification} />
        <form>
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleInputChange}
              className="w-full h-12 pl-12 pr-12 bg-black border-none text-white placeholder:text-white/60 focus:outline-none"
            />
            <CloseButton
              variant="light"
              size="sm"
              onClose={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            />
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      <Notification message={error} isOpen={!!error} onClose={handleCloseNotification} />
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-20">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4">
          <form>
            <div className="relative">
              <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder={CONTENT.common.search}
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full h-16 pl-16 pr-16 text-body border-none focus:outline-none rounded-lg"
              />
              <CloseButton
                size="sm"
                onClose={onClose}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600"
              />
            </div>
          </form>

          {isProductsLoading && debouncedQuery && !error ? (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-500">
                {CONTENT.common.loading || "Loading products..."}
              </p>
            </div>
          ) : null}

          {!isProductsLoading && debouncedQuery && !error ? (
            <div className="border-t border-gray-200 max-h-96 overflow-y-auto">
              {isSearching ? (
                <div className="p-6 text-center">
                  <p className="text-sm text-gray-500">
                    {CONTENT.common.loading || "Loading products..."}
                  </p>
                </div>
              ) : filteredResults.length > 0 ? (
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-4 px-2">
                    Found {filteredResults.length} product
                    {filteredResults.length !== 1 ? "s" : ""}
                  </p>
                  <div className="space-y-2">
                    {filteredResults.map((product) => {
                      const image =
                        product.images?.[0]?.url || product.thumbnail || "";
                      const price = product.variants?.[0]?.calculated_price
                        ?.calculated_amount
                        ? product.variants[0].calculated_price
                            .calculated_amount / 100
                        : 0;
                      return (
                        <Link
                          key={product.id}
                          href={getHref(`/shop/${product.handle}`, locale)}
                          onClick={onClose}
                          className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="w-16 h-16 bg-gray-100 flex-shrink-0 relative rounded">
                            {image && (
                              <Image
                                src={image}
                                alt={product.title || "Product"}
                                fill
                                sizes="64px"
                                className="object-cover rounded"
                                loading="lazy"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm text-gray-900 truncate">
                              {product.title}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {product.collection?.title || "Furniture"}
                            </p>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            €{price.toFixed(2)}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-sm text-gray-500">
                    No products found for &quot;{debouncedQuery}&quot;
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

Search.displayName = "Search";
