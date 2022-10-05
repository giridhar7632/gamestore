/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.rawg.io', 'api.multiavatar.com', 'lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
