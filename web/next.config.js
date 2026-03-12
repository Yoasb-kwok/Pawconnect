/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  // Ensure assets are loaded from same origin (fixes 404s when proxy or cache is wrong)
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
  images: {
    domains: [
      'localhost',
      'res.cloudinary.com',
      'images.unsplash.com',
      'api.dicebear.com',
    ],
    unoptimized: true, // 允許外部圖片
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001',
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname)
    return config
  },
}

module.exports = nextConfig
