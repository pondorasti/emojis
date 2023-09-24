"use client"

import { EMOJI_SIZE } from "@/lib/constants"
import Image from "next/image"

interface ButtonCard {
  name: string
  src: string
}

function downloadBlob(blobUrl: string, filename: string) {
  let a = document.createElement("a")
  a.download = filename
  a.href = blobUrl
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export function ButtonCard({ name, src }: ButtonCard) {
  async function handleDownload() {
    try {
      // setDownloading(true)

      const res = await fetch(src, {
        headers: new Headers({ Origin: location.origin }),
        mode: "cors",
      })
      const blob = await res.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      downloadBlob(blobUrl, `${name}.png`)
    } catch (error) {
      console.error(error)
    } finally {
      // setDownloading(false)
    }
  }

  return (
    <button
      className="border flex flex-row flex-nowrap py-1 px-3 items-center shadow-sm rounded-xl gap-2 bg-white"
      onClick={handleDownload}
    >
      <Image
        alt="ai generated emoji"
        src={src}
        width={EMOJI_SIZE}
        height={EMOJI_SIZE}
        className="h-8 w-8 aspect-square"
      />

      <p className="font-mono text-sm">:{name}:</p>
    </button>
  )
}
