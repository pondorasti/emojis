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
      searchQuery,
    }: { take?: number; skip?: number; orderBy?: Prisma.EmojiOrderByWithAggregationInput; searchQuery?: string } = {
      take: 100,
      skip: undefined,
      orderBy: { createdAt: Prisma.SortOrder.desc },
      searchQuery: undefined,
    }
  ) =>
    prisma.emoji.findMany({
      select: { id: true, updatedAt: true },
      orderBy,
      where: {
        ...VALID_EMOJI_FILTER,
        prompt: searchQuery ? { search: `${searchQuery}*` } : undefined,
      },
      take,
      skip,
    })
)
