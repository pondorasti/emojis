import { Favicon } from "@/app/_components/favicon"
import { FEATURED_OG_IMAGES } from "@/lib/constants"
import { getRandomItem } from "@/lib/utils"
import { getEmoji } from "@/server/get-emoji"
import { EmojiContextProps } from "@/server/utils"

export { contentType, size } from "@/app/_components/favicon"

export default async function Icon({ params }: EmojiContextProps) {
  const data = await getEmoji(params.id)
  if (!data) return

  return Favicon({ url: data.noBackgroundUrl ?? getRandomItem(FEATURED_OG_IMAGES) })
}
