import { PROD_URL } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { getEmojis } from "@/server/get-emojis"
import { Github } from "lucide-react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Suspense } from "react"
import { EmojiCard } from "./_components/emoji-card"
import { EmojiCount } from "./_components/emoji-count"
import { Providers } from "./_components/providers"
import "./globals.css"

/**
 * Opt out of caching for all data requests in the route segment. Based on the docs,
 * we should be **dynamically rendering** the page with **cached data**.
 *
 * With default config, the root page (/) is statically rendered and dynamic pages
 * (/p/[id]) are dynamically rendered. This means that the root page will be cached
 * and quickly start serving stale data, while the dynamic pages will be revalidated.
 *
 * From the docs:
 *
 * > If the segment is static (default), the output of the request will be cached and revalidated as part of the route segment.
 * > If the segment is dynamic, the output of the request will not be cached and will be re-fetched on every request when the segment is rendered.
 *
 * Kinda cool, but a bit too much magic for me.
 *
 * @see https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering
 */
export const dynamic = "force-dynamic"

const BODY_PADDING = "px-4 sm:px-6"

const inter = Inter({ subsets: ["latin"] })

export function generateMetadata(): Metadata {
  const title = "AI Emoji Generator"
  const description = "Turn your ideas into emojis in seconds. Generate your favorite Slack emojis with just one click."

  return {
    metadataBase: new URL(PROD_URL),
    title,
    description,
    openGraph: {
      title,
      description,
      url: PROD_URL,
      siteName: "emojis.sh",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@pondorasti",
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased bg-gray-100")}>
        <header
          className={cn(
            "top-0 sticky z-20 w-full py-3 bg-gray-100 flex flex-row flex-nowrap justify-between max-w-5xl mx-auto h-14 items-stretch animate-in fade-in slide-in-from-top-4 duration-1000 ease-in-out",
            BODY_PADDING
          )}
        >
          <Link
            className="text-black text-lg font-medium flex flex-row flex-nowrap items-center justify-center gap-x-1.5 pr-1.5 leading-none rounded-lg"
            href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
            <span>emojis</span>
          </Link>

          <Link
            href="https://github.com/pondorasti/emojis"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <span className="sr-only">Github Repository</span>
            <Github size={20} />
          </Link>
        </header>
        <main className={cn("min-h-screen flex items-stretch flex-col pb-28 max-w-5xl mx-auto", BODY_PADDING)}>
          <div className="py-[15vh] sm:py-[20vh] flex flex-col items-center justify-center">
            <h1 className="font-medium text-4xl text-black mb-3 animate-in fade-in slide-in-from-bottom-3 duration-1000 ease-in-out">
              AI Emojis
            </h1>
            <EmojiCount />

            <div className="max-w-md space-y-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
              {children}
            </div>
          </div>

          <Suspense>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
              <h2 className="font-semibold text-md text-left w-full mb-3">Recents</h2>
              <EmojiGrid />
            </div>
          </Suspense>
        </main>
        <Providers />
      </body>
    </html>
  )
}

async function EmojiGrid() {
  const emojis = await getEmojis()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-stretch w-full">
      {emojis.map((emoji) => (
        <EmojiCard key={emoji.id} id={emoji.id} />
      ))}
    </div>
  )
}
