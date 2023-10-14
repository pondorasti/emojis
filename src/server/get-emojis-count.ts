import { cache } from "react"
import "server-only"
import { prisma } from "./db"

export const getEmojisCount = cache(async () => prisma.emoji.count({ cacheStrategy: { swr: 60 } }))
