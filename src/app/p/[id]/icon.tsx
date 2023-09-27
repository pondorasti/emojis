import { getEmoji } from "@/server/get-emoji"
import { ImageResponse } from "next/server"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default async function Icon({ params }: { params: { id: string } }) {
  const data = await getEmoji(params.id)
  if (!data) return

  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${data.noBackgroundUrl})`,
          backgroundSize: "32px 32px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      />
    ),
    {
      ...size,
    }
  )
}
