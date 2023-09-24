import { cn } from "@/lib/utils"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Emoji Generator",
  description: "Generate beautiful emojis in seconds",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased bg-gray-100")}>
        <main className="min-h-screen flex items-center flex-col py-28 px-6">
          <h1 className="font-medium text-4xl text-black mb-3">AI Emojis</h1>
          <p className="text-gray-500">1 emoji generated and counting</p>

          <div className="my-6 max-w-md space-y-4 w-full">{children}</div>
        </main>
      </body>
    </html>
  )
}
