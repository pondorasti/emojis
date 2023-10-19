import { getEmojis } from "@/server/get-emojis"
import { EmojiCard } from "../emoji-card"

interface EmojiGridProps {
  prompt?: string
}

export async function EmojiGrid({ prompt }: EmojiGridProps) {
  const emojis = await getEmojis({
    take: 100,
    orderBy: prompt
      ? {
          _relevance: {
            fields: ["prompt"],
            sort: "desc",
            search: prompt,
          },
        }
      : undefined,
    cacheStrategy: prompt
      ? {
          swr: 86_400, // 1 day
          ttl: 7_200, // 2 hours
        }
      : undefined,
  })

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
      <h2 className="font-semibold text-md text-left w-full mb-3">{!!prompt ? "Related Emojis" : "Recent Emojis"}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-stretch w-full">
        {emojis.map((emoji) => (
          <EmojiCard key={emoji.id} id={emoji.id} />
        ))}
      </div>
    </div>
  )
}
