import "server-only"
import { prisma } from "./db"

export const getEmojisCount = async () => prisma.emoji.count()
