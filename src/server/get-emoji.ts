import "server-only"
import { prisma } from "./db"

export const getEmoji = async (id: string) =>
  prisma.emoji.findUnique({
    where: { id },
  })
