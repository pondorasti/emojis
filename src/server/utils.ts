import { NextResponse } from "next/server"
import "server-only"
import { ZodError, z } from "zod"

export class Response {
  static ok() {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  static internalServerError() {
    return NextResponse.json({ error: { message: "Internal server error" } }, { status: 500 })
  }

  static unauthorized() {
    return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 403 })
  }

  static promptNotFound() {
    return NextResponse.json({ error: { message: "Prompt not found" } }, { status: 404 })
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
