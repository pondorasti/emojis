import { PROD_URL, SITEMAP_PAGE_SIZE } from "@/lib/constants"
import { getEmojis } from "@/server/get-emojis"
import { z } from "zod"

const sitemapContextSchema = z.object({
  params: z.object({
    page: z.number(),
  }),
})
type SitemapContextProps = z.infer<typeof sitemapContextSchema>

export async function GET(request: Request, { params }: SitemapContextProps) {
  const page = params.page
  const emojis = await getEmojis(SITEMAP_PAGE_SIZE, page * SITEMAP_PAGE_SIZE)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${emojis
      .map(
        (emoji) => `
      <url>
        <loc>${PROD_URL}/p/${emoji.id}</loc>
        <lastmod>${emoji.updatedAt.toISOString()}</lastmod>
      </url>
    `
      )
      .join("\n")}
  </urlset>`

  return new Response(xml, {
    status: 200,
    headers: {
      // Cache for 1 day w/ swr
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  })
}
