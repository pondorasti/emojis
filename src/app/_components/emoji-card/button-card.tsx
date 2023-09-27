"use client"

import { EMOJI_SIZE } from "@/lib/constants"
import { Download } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import toast from "react-hot-toast"
import { Loader } from "../loader"

interface ButtonCard {
  id: string
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

export function ButtonCard({ id, name, src }: ButtonCard) {
  const [showImagePlaceholder, setShowImagePlaceholder] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)

  async function handleDownload() {
    setIsDownloading(true)
    const toastId = toast.loading(`Downloading :${name}:`)

    try {
      const res = await fetch(src, {
        headers: new Headers({ Origin: location.origin }),
        mode: "cors",
      })
      const blob = await res.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      downloadBlob(blobUrl, `${name}.png`)
      toast.success(`Downloaded :${name}:`, { id: toastId })
    } catch (error) {
      console.error(error)
      toast.error(`Failed to download :${name}:`, { id: toastId })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div
      id={id}
      className="borders ring-1 ring-gray-200 flex flex-row flex-nowrap py-1 px-1.5 items-center shadow-sm rounded-xl gap-1.5 bg-white w-full relative group"
    >
      <Image
        alt="ai generated emoji"
        src={src}
        width={EMOJI_SIZE}
        height={EMOJI_SIZE}
        className="h-8 w-8 aspect-square"
        onLoadingComplete={() => setShowImagePlaceholder(false)}
      />
      {showImagePlaceholder && (
        <div
          aria-hidden
          className={
            "w-8 h-8 aspect-square absolute left-1.5 bg-white before:rounded-lg z-20 before:inset-0 before:absolute before:z-10 before:bg-gray-200"
          }
        />
      )}

      <p className="font-mono text-sm truncate">:{name}:</p>

      <button
        className="w-8 h-8 aspect-square flex items-center justify-center rounded-lg ring-1 ring-gray-200 absolute right-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out bg-white shadow focus:opacity-100"
        onClick={handleDownload}
        disabled={isDownloading}
      >
        <span className="sr-only">Download emoji</span>
        {isDownloading ? <Loader /> : <Download size={16} />}
      </button>
    </div>
  )
}
