import { Prisma } from "@prisma/client"
import { cache } from "react"
import "server-only"
import { prisma } from "./db"

export const revalidate = 60 // revalidate the data at most every 1 minute

export const getEmojis = cache(async () =>
  prisma.emoji.findMany({
    select: { id: true },
    orderBy: { createdAt: Prisma.SortOrder.desc },
    take: 1000,
  })
)
