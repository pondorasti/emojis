import { prisma } from "@/server/db"
import { ButtonCard } from "./button-card"
import { formatPrompt } from "@/lib/utils"

interface EmojiCardProps {
  id: string
  alwaysShowDownloadBtn?: boolean
}

export async function EmojiCard({ id, alwaysShowDownloadBtn }: EmojiCardProps) {
  const data = await prisma.emoji.findUnique({ where: { id } })
  if (!data) return null

  return (
    <ButtonCard
      id={id}
      name={formatPrompt(data.prompt)}
      src={data.noBackgroundUrl}
      createdAt={data.createdAt}
      alwaysShowDownloadBtn={alwaysShowDownloadBtn}
    />
  )
}
