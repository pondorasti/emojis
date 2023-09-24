"use client"
import { EmojiForm } from "./emoji-form"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center flex-col py-28 px-6">
      <h1 className="font-medium text-4xl text-black mb-3">AI Emojis</h1>
      <p className="text-gray-500">1 emoji generated and counting</p>

      <EmojiForm />
    </main>
  )
}
