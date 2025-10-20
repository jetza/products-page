import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  experimental: {
    optimizePackageImports: ["@/components", "@/lib"],
  },

  // Prevent access to medusa-store backend files
  async headers() {
    return [
      {
        source: "/src/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
      {
        source: "/_next/internal/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/src/:path*",
          destination: "/404",
        },
        {
          source: "/_next/src/:path*",
          destination: "/404",
        },
        {
          source: "/_next/internal/:path*",
          destination: "/404",
        },
        {
          source: "/src/admin/:path*",
          destination: "/404",
        },
        {
          source: "/src/auth/:path*",
          destination: "/404",
        },
        {
          source: "/src/store/:path*",
          destination: "/404",
        },
        {
          source: "/src/client.ts",
          destination: "/404",
        },
      ],
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
  webpack: (config) => {
    // Ignore Medusa backend files that aren't needed in frontend
    config.resolve.alias = {
      ...config.resolve.alias,
      // Prevent resolution of server-only modules
      "@medusajs/framework/http": false,
      "@medusajs/framework/workflows-sdk": false,
    };

    return config;
  },
};

export default withNextIntl(nextConfig);
