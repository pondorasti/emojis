import { PROD_URL } from "@/lib/constants"
import { getEmojis } from "@/server/get-emojis"
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // recommended max sitemap size is 50,000 URLs
  const emojis = await getEmojis(49_999)

  return [
    {
      url: PROD_URL,
      lastModified: new Date().toISOString(),
    },
    ...emojis.map(({ id, updatedAt }) => ({
      url: `${PROD_URL}/p/${id}`,
      lastModified: updatedAt.toISOString(),
    })),
  ]
}
