import type { NextConfig } from 'next';
import path from 'node:path';

const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: { root: path.resolve('.') },
  outputFileTracingRoot: path.resolve('.'),
  async redirects() {
    return [
      'index',
      'services',
      'industries',
      'how-we-work',
      'pricing',
      'contact',
    ].map((page) => ({
      source: `/${page}.html`,
      destination: page === 'index' ? '/' : `/${page}`,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};
export default config;
