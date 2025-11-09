/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  async headers() {
    return [
      // Cache file tĩnh của bạn nằm dưới /assets (1 năm, immutable)
      {
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // (Tùy chọn) Nếu muốn set header cho API bằng headers():
      // nhớ thêm wildcard :path* để áp cho mọi nhánh con
      {
        source: '/api/coins/:path*',
        headers: [{ key: 'Cache-Control', value: 's-maxage=300, stale-while-revalidate=600' }],
      },
    ]
  },

  images: {
    domains: ['s2.coinmarketcap.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400, // 24h cache ảnh remote
  },

  experimental: { largePageDataBytes: 128 * 1000 },

  webpack: (config) => {
    config.resolve.alias = { ...config.resolve.alias, '@': path.resolve(__dirname) }
    return config
  },
}

module.exports = nextConfig
