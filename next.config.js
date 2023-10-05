const { withAxiom } = require("next-axiom")

/** @type {import('next').NextConfig} */
const nextConfig = withAxiom({
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["aaah0mnbncqtinas.public.blob.vercel-storage.com"],
    unoptimized: true,
  },
})

module.exports = nextConfig
