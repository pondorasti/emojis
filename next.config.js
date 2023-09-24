/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["aaah0mnbncqtinas.public.blob.vercel-storage.com"],
  },
}

module.exports = nextConfig
