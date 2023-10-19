"use client"

import { EMOJI_SIZE } from "@/lib/constants"
import { track } from "@vercel/analytics"
import { Download } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Loader } from "../loader"
import { cn } from "@/lib/utils"
import useSWR from "swr"

interface ButtonCard {
  id: string
  name: string
  src: string | null
  createdAt: Date
  alwaysShowDownloadBtn?: boolean
}

function downloadBlob(blobUrl: string, filename: string) {
  let a = document.createElement("a")
  a.download = filename
  a.href = blobUrl
  document.body.appendChild(a)
  a.click()
  a.remove()
}

async function fetcher(url: string) {
  return fetch(url)
    .then((res) => res.json())
    .then((json) => ({
      recentSrc: json.emoji.noBackgroundUrl,
      error: json.emoji.error,
    }))
}

export function ButtonCard({ id, name, src: _src, createdAt, alwaysShowDownloadBtn }: ButtonCard) {
  // revalidate image src every second while generating (max 1 minute)
  const isGenerating = new Date(createdAt).getTime() > Date.now() - 60_000
  const { data, isLoading: isLoadingEmoji } = useSWR<Awaited<ReturnType<typeof fetcher>>>(
    !_src && isGenerating ? `/api/emojis/${id}` : null,
    {
      fetcher,
      refreshInterval: (data) => (!!data?.recentSrc || !isGenerating ? 0 : 1000), // 1 second
    }
  )

  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const [isDownloadingEmoji, setIsDownloadingEmoji] = useState(false)

  const src = data?.recentSrc || _src
  const showImageTag = !!src // don't render image tag if no src
  const showImagePlaceholder = isLoadingEmoji || isLoadingImage || !showImageTag

  useEffect(() => {
    if (!showImageTag || !isLoadingImage) return
    setIsLoadingImage(true)
  }, [isLoadingImage, showImageTag])

  useEffect(() => {
    if (isLoadingEmoji || !data?.error) return
    toast.error(data.error)
  }, [isLoadingEmoji, data?.error])

  async function handleDownload() {
    if (!src) return

    track("Download Emoji")
    setIsDownloadingEmoji(true)
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
      setIsDownloadingEmoji(false)
    }
  }

  return (
    <div
      id={id}
      className="borders ring-1 ring-gray-200 flex flex-row flex-nowrap py-1 px-1.5 items-center shadow-sm rounded-xl gap-1.5 bg-white w-full relative group"
    >
      {showImageTag && (
        <Image
          alt="ai generated emoji"
          src={src}
          width={EMOJI_SIZE}
          height={EMOJI_SIZE}
          className="h-8 w-8 aspect-square"
          onLoadingComplete={() => setIsLoadingImage(false)}
        />
      )}
      {showImagePlaceholder && (
        <div
          aria-hidden
          className={cn("w-8 h-8 aspect-square bg-white", showImageTag ? "absolute left-1.5" : "relative")}
        >
          <div className="w-full h-full skeleton bg-gray-200 rounded-lg" />
        </div>
      )}

      <p className="font-mono text-sm truncate" title={name}>
        :{name}:
      </p>

      <button
        className={cn(
          "w-8 h-8 aspect-square flex items-center justify-center rounded-lg ring-1 ring-gray-200 absolute right-1 opacity-100 group-hover:opacity-100 transition-opacity duration-200 ease-out bg-white shadow focus:opacity-100",
          !alwaysShowDownloadBtn && "sm:opacity-0",
          !showImageTag && "hidden"
        )}
        onClick={handleDownload}
        disabled={isDownloadingEmoji || !showImageTag}
      >
        <span className="sr-only">Download emoji</span>
        {isDownloadingEmoji ? <Loader /> : <Download size={16} />}
      </button>
    </div>
  )
}
