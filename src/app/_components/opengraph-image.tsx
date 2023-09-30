import { ImageResponse } from "next/server"

const EMOJI_SIZE = 570
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

interface OpenGraphImageProps {
  url: string
}

export function OpenGraphImage({ url }: OpenGraphImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "white",
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" height={EMOJI_SIZE} src={url} width={EMOJI_SIZE} />
      </div>
    )
  )
}
