import { cache } from "react"
import "server-only"
import { prisma } from "./db"

export const getEmoji = cache(async (id: string) =>
  prisma.emoji.findUnique({
    where: { id },
  })
)
