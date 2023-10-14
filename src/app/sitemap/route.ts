import { PROD_URL, SITEMAP_PAGE_SIZE } from "@/lib/constants"
import { getEmojisCount } from "@/server/get-emojis-count"

export async function GET() {
  const emojisCount = await getEmojisCount()
  const totalSitemaps = Math.ceil(emojisCount / SITEMAP_PAGE_SIZE)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
