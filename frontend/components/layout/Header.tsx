"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { SearchIcon, MenuIcon, BagIcon } from "@/components/icons";
import { Search } from "@/components/ui/Search";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";

interface HeaderProps {
  variant?: "desktop" | "mobile";
  theme?: "solid" | "transparent";
  className?: string;
}

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
];

export const Header: React.FC<HeaderProps> = ({ 
  variant = "desktop",
  theme = "solid",
  className 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("HR");
  
  const { items, updateQuantity, removeFromCart } = useCart();

  // Theme classes
  const isTransparent = theme === "transparent";
  const bgClass = isTransparent ? "bg-transparent" : "bg-white";
  const textClass = isTransparent ? "text-white" : "text-black";
  const borderClass = isTransparent ? "border-white/20" : "border-gray-200";

  if (variant === "mobile") {
    return (
      <>
        <header className={cn(bgClass, "border-b", borderClass, className)}>
          <div className="flex items-center justify-between px-4 h-16">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 -ml-2"
              aria-label="Toggle menu"
            >
              <MenuIcon className={cn("w-6 h-6", textClass)} />
            </button>

            <Link href="/" className={cn("text-button-big font-semibold", textClass)}>
              SofaSocietyCo.
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 -mr-2"
              aria-label="Shopping cart"
            >
              <BagIcon className={cn("w-6 h-6", textClass)} />
            </button>
          </div>
        </header>

        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            <div className="fixed top-0 left-0 bottom-0 w-[280px] bg-black z-50 flex flex-col">
              <div className="px-4 pt-4 pb-6 border-b border-white/10">
                <div className="relative">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full h-12 pl-12 pr-4 bg-black text-white placeholder:text-white/60 focus:outline-none"
                  />
                </div>
              </div>

              <nav className="flex-1 px-6 py-8">
                <Link
                  href="/about"
                  className="block text-white text-big font-medium mb-6"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/inspiration"
                  className="block text-white text-big font-medium mb-6"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inspiration
                </Link>
                <Link
                  href="/shop"
                  className="block text-white text-big font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </Link>
              </nav>

              <div className="px-6 pb-8">
                <button
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  className="flex items-center gap-2 text-white text-base"
                >
                  <span>{selectedCountry}</span>
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    className={cn(
                      "transition-transform",
                      isCountryDropdownOpen && "rotate-180"
                    )}
                  >
                    <path
                      d="M1 1L6 6L11 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {isCountryDropdownOpen && (
                  <div className="mt-4 bg-white rounded max-h-[300px] overflow-y-auto">
                    {COUNTRIES.map((country) => (
                      <button
                        key={country}
                        onClick={() => {
                          setSelectedCountry(country.substring(0, 2).toUpperCase());
                          setIsCountryDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 text-sm text-black hover:bg-gray-50"
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={items}
          onQuantityChange={updateQuantity}
          onRemoveItem={removeFromCart}
        />
      </>
    );
  }

  return (
    <header className={cn(bgClass, "border-b", borderClass, className)}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className={cn("text-button-big font-semibold", textClass)}>
          SofaSocietyCo.
        </Link>

        <nav className="flex items-center gap-8">
          <Link href="/about" className={cn("text-base hover:opacity-70", textClass)}>
            About
          </Link>
          <Link href="/inspiration" className={cn("text-base hover:opacity-70", textClass)}>
            Inspiration
          </Link>
          <Link href="/shop" className={cn("text-base hover:opacity-70", textClass)}>
            Shop
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <div className="relative">
            <button
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              className={cn("flex items-center gap-2 text-base", textClass)}
            >
              <span>{selectedCountry}</span>
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                className={cn(
                  "transition-transform",
                  isCountryDropdownOpen && "rotate-180"
                )}
              >
                <path
                  d="M1 1L6 6L11 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {isCountryDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg w-[200px] max-h-[300px] overflow-y-auto z-50">
                {COUNTRIES.map((country) => (
                  <button
                    key={country}
                    onClick={() => {
                      setSelectedCountry(country.substring(0, 2).toUpperCase());
                      setIsCountryDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-sm text-black hover:bg-gray-50"
                  >
                    {country}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2"
            aria-label="Search"
          >
            <SearchIcon className={cn("w-5 h-5", textClass)} />
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2"
            aria-label="Shopping cart"
          >
            <BagIcon className={cn("w-5 h-5", textClass)} />
          </button>
        </div>
      </div>

      <Search
        variant="desktop"
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onQuantityChange={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </header>
  );
};

Header.displayName = "Header";
