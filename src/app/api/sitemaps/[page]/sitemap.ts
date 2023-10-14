import { PROD_URL, SITEMAP_PAGE_SIZE } from "@/lib/constants"
import { getEmojis } from "@/server/get-emojis"
import { MetadataRoute } from "next"
import { headers } from "next/headers"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = headers()
  const path = headersList.get("x-invoke-path") ?? ""
  const page = parseInt(path.split("/")[3])

  console.log({ page, path })

  if (isNaN(page)) return []
  const emojis = await getEmojis(SITEMAP_PAGE_SIZE, page * SITEMAP_PAGE_SIZE)

  return [
    ...emojis.map(({ id, updatedAt }) => ({
      url: `${PROD_URL}/p/${id}`,
      lastModified: updatedAt.toISOString(),
    })),
  ]
}
