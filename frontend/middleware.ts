import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/config";

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Never redirect to the default locale
  localePrefix: "as-needed",

  // Disable browser language detection, always use defaultLocale for root
  localeDetection: false,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(hr|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
