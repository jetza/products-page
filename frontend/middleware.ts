import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale, type Locale } from "./i18n/config";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Never redirect to the default locale
  localePrefix: "as-needed",

  // Disable browser language detection, always use defaultLocale for root
  localeDetection: false,
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block requests to medusa-store backend files
  if (
    pathname.startsWith("/src/") ||
    pathname.startsWith("/_next/src/") ||
    pathname.startsWith("/_next/internal/") ||
    pathname.includes("/src/admin/") ||
    pathname.includes("/src/auth/") ||
    pathname.includes("/src/store/") ||
    pathname.endsWith("/src/client.ts")
  ) {
    return new NextResponse(null, { status: 404 });
  }

  // Get locale from cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value as
    | Locale
    | undefined;

  // Check if URL already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If there's a cookie locale preference and URL doesn't have locale or has default locale
  if (cookieLocale && cookieLocale !== defaultLocale && !pathnameHasLocale) {
    // Redirect to the preferred locale
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/${cookieLocale}${pathname}`;
    return NextResponse.redirect(newUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames including src/** to block backend requests
  matcher: [
    "/",
    "/(hr|en)/:path*",
    "/src/:path*",
    "/_next/src/:path*",
    "/_next/internal/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
