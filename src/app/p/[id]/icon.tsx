import { Favicon } from "@/app/_components/favicon"
import { getEmoji } from "@/server/get-emoji"
import { EmojiContextProps } from "@/server/utils"

export { contentType, size } from "@/app/_components/favicon"

export default async function Icon({ params }: EmojiContextProps) {
  const data = await getEmoji(params.id)
  if (!data) return

  return Favicon({ url: data.noBackgroundUrl ?? "" })
}
