"use server"

import { replicate } from "@/server/replicate"
import { nanoid } from "@/lib/utils"
import { kv } from "@vercel/kv"
import { redirect } from "next/navigation"

interface FormState {
  message: string
}

export async function createEmoji(prevFormState: FormState | undefined, formData: FormData): Promise<FormState | void> {
  const prompt = formData.get("prompt") as string | null
  if (!prompt) return { message: "Please enter a prompt" }

  const id = nanoid()
  await Promise.all([kv.hset(id, { prompt }), replicate.createEmoji({ id, prompt })])

  redirect(`/p/${id}`)
}
