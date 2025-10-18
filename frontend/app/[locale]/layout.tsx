import type { Metadata } from "next";
import "../globals.css";
import "@fontsource/mona-sans/400.css";
import "@fontsource/mona-sans/500.css";
import "@fontsource/mona-sans/600.css";
import "@fontsource/mona-sans/700.css";
import { CartProvider } from "@/lib/cart-context";
import { CheckoutProvider } from "@/lib/checkout-context";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';

export const metadata: Metadata = {
  title: "Sofa Society Co.",
  description: "Discover our amazing furniture collection",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased flex flex-col min-h-screen" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <CheckoutProvider>
              {children}
            </CheckoutProvider>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
