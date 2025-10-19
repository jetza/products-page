/**
 * i18n Configuration
 * Defines supported locales and default locale for the application
 */

export type Locale = "en" | "hr";

export const locales: Locale[] = ["en", "hr"];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  hr: "Hrvatski",
};
