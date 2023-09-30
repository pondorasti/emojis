"use server"

import { nanoid } from "@/lib/utils"
import { prisma } from "@/server/db"
import { replicate } from "@/server/replicate"
import { redirect } from "next/navigation"

interface FormState {
  message: string
}

export async function createEmoji(prevFormState: FormState | undefined, formData: FormData): Promise<FormState | void> {
  const prompt = (formData.get("prompt") as string | null)?.trim()
  if (!prompt) return { message: "Please enter a prompt" }

  const id = nanoid()
  const data = { id, prompt }
  await Promise.all([prisma.emoji.create({ data }), replicate.createEmoji(data)])

  redirect(`/p/${id}`)
}
