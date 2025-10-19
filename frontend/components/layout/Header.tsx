"use client";

import React, { useState, useCallback, useMemo, lazy, Suspense } from "react";
import { cn } from "@/lib/utils/cn";
import { SearchIcon, MenuIcon, BagIcon } from "@/components/icons";
import { CartBadge } from "@/components/ui/CartBadge";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { CONTENT } from "@/lib/constants/content";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getHref } from "@/lib/getHref";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

// Lazy load heavy components
const Search = lazy(() => import("@/components/ui/Search").then(m => ({ default: m.Search })));
const CartDrawer = lazy(() => import("@/components/ui/CartDrawer").then(m => ({ default: m.CartDrawer })));

interface HeaderProps {
  variant?: "desktop" | "mobile";
  theme?: "solid" | "transparent";
  className?: string;
}

export const Header = React.memo<HeaderProps>(({
  variant = "desktop",
  theme = "solid",
  className,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, updateQuantity, removeFromCart } = useCart();
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const handleToggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const handleCloseMenu = useCallback(() => setIsMenuOpen(false), []);
  const handleToggleSearch = useCallback(() => setIsSearchOpen((prev) => !prev), []);
  const handleCloseSearch = useCallback(() => setIsSearchOpen(false), []);
  const handleOpenCart = useCallback(() => setIsCartOpen(true), []);
  const handleCloseCart = useCallback(() => setIsCartOpen(false), []);

  const isTransparent = theme === "transparent";
  const bgClass = isTransparent ? "bg-transparent" : "bg-white";
  const textClass = isTransparent ? "text-white" : "text-black";
  const borderClass = "";
  const locale = getCurrentLocale();

  if (variant === "mobile") {
    return (
      <>
        <header className={cn(bgClass, borderClass, className)}>
          <div className="flex items-center justify-between px-8 h-16">
            <Link
              href={getHref("/", locale)}
              className={cn("text-button-big font-semibold", textClass)}
            >
              {CONTENT.brand.name}
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenCart}
                className="p-2 relative"
                aria-label={CONTENT.nav.cart}
              >
                <BagIcon className={cn("w-6 h-6", textClass)} />
                <CartBadge
                  count={totalItems}
                  variant={isTransparent ? "light" : "dark"}
                />
              </button>

              <button
                onClick={handleToggleMenu}
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
              onClick={handleCloseMenu}
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
                  href={getHref("/about", locale)}
                  className="block text-white text-big font-medium mb-6"
                  onClick={handleCloseMenu}
                >
                  {CONTENT.nav.about}
                </Link>
                <Link
                  href={getHref("/inspiration", locale)}
                  className="block text-white text-big font-medium mb-6"
                  onClick={handleCloseMenu}
                >
                  {CONTENT.nav.inspiration}
                </Link>
                <Link
                  href={getHref("/shop", locale)}
                  className="block text-white text-big font-medium"
                  onClick={handleCloseMenu}
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

        {isCartOpen && (
          <Suspense fallback={<div className="fixed inset-0 bg-black/50 z-50" />}>
            <CartDrawer
              isOpen={isCartOpen}
              onClose={handleCloseCart}
              items={items}
              onQuantityChange={updateQuantity}
              onRemoveItem={removeFromCart}
            />
          </Suspense>
        )}
      </>
    );
  }

  return (
    <header className={cn(bgClass, borderClass, className)}>
      <div className="px-5">
        <div className="mx-auto px-24 h-20 flex items-center justify-between">
          <Link
            href={getHref("/", locale)}
            className={cn("text-button-big font-semibold", textClass)}
          >
            {CONTENT.brand.name}
          </Link>

          <nav className="flex items-center gap-8">
            <Link
              href={getHref("/about", locale)}
              className={cn("text-base hover:opacity-70", textClass)}
            >
              {CONTENT.nav.about}
            </Link>
            <Link
              href={getHref("/inspiration", locale)}
              className={cn("text-base hover:opacity-70", textClass)}
            >
              {CONTENT.nav.inspiration}
            </Link>
            <Link
              href={getHref("/shop", locale)}
              className={cn("text-base hover:opacity-70", textClass)}
            >
              {CONTENT.nav.shop}
            </Link>
          </nav>

          <div className="flex items-center gap-6">
            <LanguageSwitcher variant={isTransparent ? "light" : "dark"} />

            <button
              onClick={handleToggleSearch}
              className="p-2"
              aria-label={CONTENT.common.search}
            >
              <SearchIcon className={cn("w-5 h-5", textClass)} />
            </button>

            <button
              onClick={handleOpenCart}
              className="p-2 relative"
              aria-label={CONTENT.nav.cart}
            >
              <BagIcon className={cn("w-5 h-5", textClass)} />
              <CartBadge
                count={totalItems}
                variant={isTransparent ? "light" : "dark"}
              />
            </button>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <Suspense fallback={<div className="fixed inset-0 bg-black/50 z-40" />}>
          <Search
            variant="desktop"
            isOpen={isSearchOpen}
            onClose={handleCloseSearch}
          />
        </Suspense>
      )}

      {isCartOpen && (
        <Suspense fallback={<div className="fixed inset-0 bg-black/50 z-50" />}>
          <CartDrawer
            isOpen={isCartOpen}
            onClose={handleCloseCart}
            items={items}
            onQuantityChange={updateQuantity}
            onRemoveItem={removeFromCart}
          />
        </Suspense>
      )}
    </header>
  );
});

Header.displayName = "Header";
