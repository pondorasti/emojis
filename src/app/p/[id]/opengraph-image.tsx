import { formatPrompt } from "@/lib/utils"
import { getEmoji } from "@/server/get-emoji"
import { EmojiContextProps } from "@/server/utils"
import { ImageResponse } from "next/server"

export const size = {
  width: 1200,
  height: 630,
}

const EMOJI_SIZE = 400

export const contentType = "image/png"

export default async function Image({ params }: EmojiContextProps) {
  // Font
  // const interSemiBold = fetch(new URL("./Inter-SemiBold.ttf", import.meta.url)).then((res) => res.arrayBuffer())
  const data = await getEmoji(params.id)
  if (!data) return

  const [inter] = await Promise.all([
    fetch("https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Regular.woff").then((res) =>
      res.arrayBuffer()
    ),
  ])

  const url = data.noBackgroundUrl ?? ""

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          backgroundColor: "white",
          backgroundSize: "150px 150px",
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "nowrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" height={EMOJI_SIZE} src={url} style={{ margin: "0 30px" }} width={EMOJI_SIZE} />
        </div>
        <div
          style={{
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            color: "black",
            marginTop: 12,
            padding: "0 120px",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
          }}
        >
          {`:${formatPrompt(data.prompt)}:`}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: inter,
        },
      ],
    }
  )
}
