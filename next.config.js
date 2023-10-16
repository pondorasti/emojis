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
  rewrites: async () => [
    {
      source: "/privacy",
      destination: "https://api.emojis.sh/assets/privacy",
      basePath: false,
    },
    {
      source: "/terms",
      destination: "https://api.emojis.sh/assets/terms",
      basePath: false,
    },
  ],
  redirects: async () => [
    {
      source: "/app",
      destination: "https://apps.apple.com/us/app/ai-emojis-generator/id6468916301",
      permanent: false,
      basePath: false,
    },
  ],
})

module.exports = nextConfig
