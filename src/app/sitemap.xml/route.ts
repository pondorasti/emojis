import { PROD_URL, SITEMAP_PAGE_SIZE } from "@/lib/constants"
import { prisma } from "@/server/db"
import { VALID_EMOJI_FILTER } from "@/server/utils"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  const emojisCount = await prisma.emoji.count({ where: VALID_EMOJI_FILTER })
  const totalSitemaps = Math.ceil(emojisCount / SITEMAP_PAGE_SIZE)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${PROD_URL}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      ${Array.from({ length: totalSitemaps })
        .map(
          (_, index) => `
        <sitemap>
          <loc>${PROD_URL}/api/sitemaps/${index}</loc>
        </sitemap>
      `
        )
        .join("\n")}
    </sitemapindex>
  `

  return new Response(xml, {
    status: 200,
    headers: {
      // Cache for 1 day w/ swr
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  })
}
