/**
 * Navigation Utilities for Internationalized Routes
 *
 * Usage examples:
 *
 * // In Server Components:
 * import { getTranslations } from 'next-intl/server';
 *
 * const t = await getTranslations('common');
 * <h1>{t('loading')}</h1>
 *
 * // In Client Components:
 * 'use client';
 * import { useTranslations } from 'next-intl';
 *
 * const t = useTranslations('common');
 * <button>{t('addToCart')}</button>
 *
 * // Dynamic values:
 * const t = useTranslations('filters');
 * t('priceRange', { min: 100, max: 500 }) // "€100 - €500"
 *
 * // Plurals (ICU format in JSON):
 * const t = useTranslations('cart');
 * t('itemsInCart', { count: 3 }) // "3 items in cart"
 */

import { type Locale } from "@/i18n/config";

/**
 * Creates a localized path
 * @param locale - The target locale
 * @param path - The path without locale prefix
 * @returns The full path with locale prefix
 *
 * @example
 * createLocalizedPath('hr', '/shop') // '/hr/shop'
 * createLocalizedPath('en', '/product/123') // '/product/123' (default locale)
 */
export function createLocalizedPath(locale: Locale, path: string): string {
  // For default locale (en), don't add prefix
  if (locale === "en") {
    return path;
  }

  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `/${locale}${normalizedPath}`;
}

/**
 * Extracts locale from pathname
 * @param pathname - The current pathname
 * @returns The locale or 'en' as default
 *
 * @example
 * getLocaleFromPathname('/hr/shop') // 'hr'
 * getLocaleFromPathname('/shop') // 'en'
 */
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split("/");
  const potentialLocale = segments[1];

  if (potentialLocale === "hr") {
    return "hr";
  }

  return "en";
}
