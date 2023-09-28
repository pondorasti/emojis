import { ImageResponse } from "next/server"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

interface FaviconProps {
  url: string
}

export function Favicon({ url }: FaviconProps) {
  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${url})`,
          backgroundSize: `${size.width}px ${size.height}px`,
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
