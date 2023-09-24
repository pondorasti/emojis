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
      <body className={cn(inter.className, "antialiased")}>{children}</body>
    </html>
  )
}
