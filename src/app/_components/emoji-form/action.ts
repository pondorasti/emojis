"use server"

import { nanoid } from "@/lib/utils"
import { prisma } from "@/server/db"
import { replicate } from "@/server/replicate"
import { Ratelimit } from "@upstash/ratelimit"
import { kv } from "@vercel/kv"
import { jwtVerify } from "jose"
import { redirect } from "next/navigation"

const ratelimit = new Ratelimit({
  redis: kv,
  // 500 requests from the same IP in 1 day
  limiter: Ratelimit.slidingWindow(500, "1 d"),
})

interface FormState {
  message: string
}

export async function createEmoji(prevFormState: FormState | undefined, formData: FormData): Promise<FormState | void> {
  const prompt = (formData.get("prompt") as string | null)?.trim().replaceAll(":", "")
  const token = formData.get("token") as string | null

  if (!prompt) return // no need to display an error message for blank prompts
  const id = nanoid()

  try {
    const verified = await jwtVerify(token ?? "", new TextEncoder().encode(process.env.API_SECRET ?? ""))
    const ip = verified.payload.ip
    if (typeof ip !== "string") throw new Error("IP not found in token payload")

    const { remaining } = await ratelimit.limit(ip)
    if (remaining <= 0) return { message: "Too many requests, please try again later." }

    const safetyRating = await replicate.classifyPrompt({ prompt })
    const data = { id, prompt, safetyRating }

    if (safetyRating >= 9) {
      await prisma.emoji.create({ data: { ...data, isFlagged: true } })
      return { message: "Nice try! Your prompt is inappropriate, let's keep it PG." }
    }

    await Promise.all([prisma.emoji.create({ data }), replicate.createEmoji(data)])
  } catch (error) {
    console.error(error)
    // @ts-expect-error
    if (error.code === "ERR_JWS_INVALID") return { message: "Unauthorized" }

    return { message: "Too many requests, please try again later." }
  }

  redirect(`/p/${id}`)
}
