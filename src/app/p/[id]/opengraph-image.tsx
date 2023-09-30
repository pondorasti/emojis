import { OpenGraphImage } from "@/app/_components/opengraph-image"
import { DEFAULT_OG_IMAGE } from "@/lib/constants"
import { getEmoji } from "@/server/get-emoji"
import { EmojiContextProps } from "@/server/utils"

export { contentType, size } from "@/app/_components/favicon"

export default async function Image({ params }: EmojiContextProps) {
  const data = await getEmoji(params.id)
  if (!data) return

  const image = data.noBackgroundUrl || data.originalUrl || DEFAULT_OG_IMAGE
  return OpenGraphImage({ url: image })
}
