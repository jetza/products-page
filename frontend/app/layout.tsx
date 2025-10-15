import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/mona-sans/400.css";
import "@fontsource/mona-sans/500.css";
import "@fontsource/mona-sans/600.css";
import "@fontsource/mona-sans/700.css";
import { CartProvider } from "@/lib/cart-context";
import { CheckoutProvider } from "@/lib/checkout-context";

export const metadata: Metadata = {
  title: "Sofa Society Co.",
  description: "Discover our amazing furniture collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen" suppressHydrationWarning>
        <CartProvider>
          <CheckoutProvider>
            {children}
          </CheckoutProvider>
        </CartProvider>
      </body>
    </html>
  );
}
