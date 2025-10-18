"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { SearchIcon, MenuIcon, BagIcon } from "@/components/icons";
import { Search } from "@/components/ui/Search";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { CartBadge } from "@/components/ui/CartBadge";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { CONTENT } from "@/lib/constants/content";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface HeaderProps {
  variant?: "desktop" | "mobile";
  theme?: "solid" | "transparent";
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  variant = "desktop",
  theme = "solid",
  className 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { items, updateQuantity, removeFromCart } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const isTransparent = theme === "transparent";
  const bgClass = isTransparent ? "bg-transparent" : "bg-white";
  const textClass = isTransparent ? "text-white" : "text-black";
  const borderClass = "";

  if (variant === "mobile") {
    return (
      <>
        <header className={cn(bgClass, borderClass, className)}>
          <div className="flex items-center justify-between px-8 h-16">
            <Link href="/" className={cn("text-button-big font-semibold", textClass)}>
              {CONTENT.brand.name}
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 relative"
                aria-label={CONTENT.nav.cart}
              >
                <BagIcon className={cn("w-6 h-6", textClass)} />
                <CartBadge count={totalItems} variant={isTransparent ? "light" : "dark"} />
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
                aria-label="Toggle menu"
              >
                <MenuIcon className={cn("w-6 h-6", textClass)} />
              </button>
            </div>
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
                    placeholder={CONTENT.common.searchPlaceholder}
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
                  {CONTENT.nav.about}
                </Link>
                <Link
                  href="/inspiration"
                  className="block text-white text-big font-medium mb-6"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {CONTENT.nav.inspiration}
                </Link>
                <Link
                  href="/shop"
                  className="block text-white text-big font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {CONTENT.nav.shop}
                </Link>
              </nav>

              <div className="px-6 pb-8">
                <LanguageSwitcher variant="light" position="top" />
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
    <header className={cn(bgClass, borderClass, className)}>
      <div className="px-5">
        <div className="mx-auto px-24 h-20 flex items-center justify-between">
          <Link href="/" className={cn("text-button-big font-semibold", textClass)}>
            {CONTENT.brand.name}
          </Link>

          <nav className="flex items-center gap-8">
          <Link href="/about" className={cn("text-base hover:opacity-70", textClass)}>
            {CONTENT.nav.about}
          </Link>
          <Link href="/inspiration" className={cn("text-base hover:opacity-70", textClass)}>
            {CONTENT.nav.inspiration}
          </Link>
          <Link href="/shop" className={cn("text-base hover:opacity-70", textClass)}>
            {CONTENT.nav.shop}
          </Link>
          </nav>

          <div className="flex items-center gap-6">
          <LanguageSwitcher variant={isTransparent ? "light" : "dark"} />

          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2"
            aria-label={CONTENT.common.search}
          >
            <SearchIcon className={cn("w-5 h-5", textClass)} />
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 relative"
            aria-label={CONTENT.nav.cart}
          >
            <BagIcon className={cn("w-5 h-5", textClass)} />
            <CartBadge count={totalItems} variant={isTransparent ? "light" : "dark"} />
          </button>
          </div>
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
