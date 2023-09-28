import { EmojiCard } from "@/app/_components/emoji-card"
import { EmojiForm } from "@/app/_components/emoji-form"
import { DEFAULT_OG_IMAGE } from "@/lib/constants"
import { formatPrompt } from "@/lib/utils"
import { getEmoji } from "@/server/get-emoji"
import { EmojiContextProps } from "@/server/utils"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export async function generateMetadata({ params }: EmojiContextProps): Promise<Metadata | undefined> {
  const data = await getEmoji(params.id)
  if (!data) return

  const title = `${formatPrompt(data.prompt)} | AI Emoji Generator`
  const description = `An emoji generated from the prompt: ${data.prompt}`
  const image = data.noBackgroundUrl || data.originalUrl || DEFAULT_OG_IMAGE

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@pondorasti",
    },
  }
}

export default async function Emoji({ params }: EmojiContextProps) {
  const data = await getEmoji(params.id)
  if (!data) redirect("/")

  return (
    <>
      <EmojiForm initialPrompt={data.prompt} />
      <EmojiCard id={params.id} />
    </>
  )
}
