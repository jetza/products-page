"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { SearchIcon } from "@/components/icons";
import { CloseButton } from "./Buttons/CloseButton";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/products-service";
import type { Product } from "@/types/product";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load all products when component mounts
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await getProducts(50);
        setAllProducts(products);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    // Clear search when modal closes
    if (!isOpen) {
      setSearchQuery("");
      setSearchResults([]);
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

  // Perform search when query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const query = searchQuery.toLowerCase();
    
    const filtered = allProducts.filter((product) => {
      return (
        product.title?.toLowerCase().includes(query) ||
        product.collection?.title?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    });

    setSearchResults(filtered);
    setIsSearching(false);
  }, [searchQuery, allProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  if (!isOpen) return null;

  if (variant === "mobile") {
    return (
      <div className={cn("px-4 pb-4 bg-black", className)}>
        <form onSubmit={handleSearch}>
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-20">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 pl-16 pr-16 text-body border-none focus:outline-none rounded-lg"
              />
              <CloseButton
                size="sm"
                onClose={onClose}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600"
              />
            </div>
          </form>

          {searchQuery && (
            <div className="border-t border-gray-200 max-h-96 overflow-y-auto">
              {isSearching ? (
                <div className="p-6 text-center">
                  <p className="text-sm text-gray-500">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-4 px-2">
                    Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''}
                  </p>
                  <div className="space-y-2">
                    {searchResults.map((product) => {
                      const image = product.images?.[0]?.url || product.thumbnail || "";
                      const price = product.variants?.[0]?.calculated_price?.calculated_amount 
                        ? product.variants[0].calculated_price.calculated_amount / 100 
                        : 0;
                      
                      return (
                        <Link
                          key={product.id}
                          href={`/shop/${product.handle}`}
                          onClick={onClose}
                          className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="w-16 h-16 bg-gray-100 flex-shrink-0 relative rounded">
                            {image && (
                              <Image
                                src={image}
                                alt={product.title || "Product"}
                                fill
                                className="object-cover rounded"
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
                    No products found for &quot;{searchQuery}&quot;
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Search.displayName = "Search";
