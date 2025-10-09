/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  // Tối ưu caching cho static files
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Cache 1 năm cho static files
          },
        ],
      },
      {
        source: '/api/coins',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=300, stale-while-revalidate=600', // API caching
          },
        ],
      },
    ];
  },
  
  // Tối ưu Image Optimization
  images: {
    domains: ['s2.coinmarketcap.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400, // Cache images 24h
  },
  
  // Enable static generation cho các trang có thể
  experimental: {
    largePageDataBytes: 128 * 1000, // 128KB
    serverComponentsExternalPackages: ['@prisma/client', 'prisma']
  },
  
  // Webpack config for @ alias
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    }
    return config
  },
  async redirects() {
    return [
      // chính xác 2 biến thể có/không slash
      { source: '/landing-page-nivex',  destination: 'https://learningchain.vn/landing-page-nivex', permanent: true },
      { source: '/landing-page-nivex/', destination: 'https://learningchain.vn/landing-page-nivex', permanent: true },
    ];
  },
}

module.exports = nextConfig
