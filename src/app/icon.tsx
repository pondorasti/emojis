import { DEFAULT_OG_IMAGE } from "@/lib/constants"
import { getEmoji } from "@/server/get-emoji"
import { ImageResponse } from "next/server"

export const runtime = "edge"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${DEFAULT_OG_IMAGE})`,
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
