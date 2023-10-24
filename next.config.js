/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['tsx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'miro.medium.com',
      'hermes.dio.me',
    ],
  },
}

module.exports = nextConfig
