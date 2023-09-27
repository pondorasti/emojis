import { PROD_URL } from "@/lib/constants"
import { prisma } from "@/server/db"
import { Prisma } from "@prisma/client"
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const emojis = await prisma.emoji.findMany({
    select: { id: true, updatedAt: true },
    orderBy: { createdAt: Prisma.SortOrder.desc },
    where: { isFlagged: false },
    // recommended max sitemap size is 50,000 URLs
    take: 50_000,
  })

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
