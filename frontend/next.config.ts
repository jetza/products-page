import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/src/:path*',
        destination: '/404',
      },
      {
        source: '/_next/src/:path*',
        destination: '/404',
      },
      {
        source: '/_next/internal/:path*',
        destination: '/404',
      },
      {
        source: '/src/admin/:path*',
        destination: '/404',
      },
      {
        source: '/src/auth/:path*',
        destination: '/404',
      },
      {
        source: '/src/store/:path*',
        destination: '/404',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
    qualities: [100],
  },
  webpack: (config) => {
    // Ignore Medusa backend files that aren't needed in frontend
    config.resolve.alias = {
      ...config.resolve.alias,
      // Prevent resolution of server-only modules
      '@medusajs/framework/http': false,
      '@medusajs/framework/workflows-sdk': false,
      // Prevent resolution of unwanted src modules
      'src/admin': false,
      'src/auth': false,
      'src/store': false,
    };
    
    return config;
  },
};

export default withNextIntl(nextConfig);
