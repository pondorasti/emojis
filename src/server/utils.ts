import { NextResponse } from "next/server"
import "server-only"
import { ZodError, z } from "zod"

export class Response {
  static success<JsonBody>(body: JsonBody = { ok: true } as JsonBody) {
    return NextResponse.json(body, { status: 200 })
  }

  static internalServerError() {
    return NextResponse.json({ error: { message: "Internal server error" } }, { status: 500 })
  }

  static unauthorized() {
    return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 403 })
  }

  static emojiNotFound() {
    return NextResponse.json({ error: { message: "Emoji not found" } }, { status: 404 })
  }

  static badRequest(message: string) {
    return NextResponse.json({ error: { message } }, { status: 400 })
  }

  static invalidRequest(zodError: ZodError) {
    return NextResponse.json({ error: { message: "Invalid request", details: zodError } }, { status: 400 })
  }
}

export const webhookSchema = z.object({
  id: z.string().length(7),
  secret: z.string().refine((data) => data === process.env.WEBHOOK_SECRET, {
    message: "Invalid secret",
  }),
})

export const emojiContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})
export type EmojiContextProps = z.infer<typeof emojiContextSchema>
