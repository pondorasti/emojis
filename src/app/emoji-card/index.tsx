import { prisma } from "@/server/db"
import { ButtonCard } from "./button-card"

interface EmojiCardProps {
  id: string
}

export async function EmojiCard({ id }: EmojiCardProps) {
  const data = await prisma.emoji.findUnique({ where: { id } })
  if (!data) return null

  const name = data.prompt.replace(/ /g, "-").replace(/-+/g, "-")

  return <ButtonCard name={name} src={data.noBackgroundUrl ?? ""} />
}
