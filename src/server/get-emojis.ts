import { Prisma } from "@prisma/client"
import { cache } from "react"
import "server-only"
import { prisma } from "./db"
import { VALID_EMOJI_FILTER } from "./utils"

export const getEmojis = cache(
  async (
    {
      take,
      skip,
      orderBy,
    }: {
      take?: number
      skip?: number
      orderBy?:
        | Prisma.EmojiOrderByWithRelationAndSearchRelevanceInput
        | Prisma.EmojiOrderByWithRelationAndSearchRelevanceInput[]
    } = {
      take: 100,
      skip: undefined,
      orderBy: { createdAt: Prisma.SortOrder.desc },
    }
  ) =>
    prisma.emoji.findMany({
      select: { id: true, updatedAt: true },
      orderBy,
      where: {
        ...VALID_EMOJI_FILTER,
      },
      take,
      skip,
    })
)
