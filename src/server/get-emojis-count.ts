import { cache } from "react"
import "server-only"
import { prisma } from "./db"

export const revalidate = 1_800 // revalidate the data at most every 30 minute

export const getEmojisCount = cache(async () => prisma.emoji.count())
