export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Sofa Society Co. | Premium Sofas & Furniture</title>
        <meta
          name="description"
          content="Discover premium sofas and furniture for your living space. Comfort, style, and quality from Sofa Society Co."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="canonical" href="https://sofasociety.com/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sofasociety.com/" />
        <meta
          property="og:title"
          content="Sofa Society Co. | Premium Sofas & Furniture"
        />
        <meta
          property="og:description"
          content="Discover premium sofas and furniture for your living space. Comfort, style, and quality from Sofa Society Co."
        />
        <meta property="og:image" content="/thumbnail.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://sofasociety.com/" />
        <meta
          name="twitter:title"
          content="Sofa Society Co. | Premium Sofas & Furniture"
        />
        <meta
          name="twitter:description"
          content="Discover premium sofas and furniture for your living space. Comfort, style, and quality from Sofa Society Co."
        />
        <meta name="twitter:image" content="/thumbnail.jpg" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          defer
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sofa Society Co.",
              url: "https://sofasociety.com/",
              logo: "/favicon.svg",
              image: "/thumbnail.jpg",
              sameAs: [
                "https://www.instagram.com/sofasociety",
                "https://www.facebook.com/sofasociety",
                "https://www.pinterest.com/sofasociety",
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
