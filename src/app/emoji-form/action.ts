"use server"

import { redirect } from "next/navigation"

interface FormState {
  message: string
}

export async function createEmoji(prevFormState: FormState | undefined, formData: FormData): Promise<FormState | void> {
  console.log({ prevFormState })
  const prompt = formData.get("prompt")
  if (!prompt) return { message: "Please enter a prompt" }

  // 5s timeout
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // redirect("/post")
}
