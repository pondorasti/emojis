import { Response, webhookSchema } from "@/server/constants"
import { put } from "@vercel/blob"
import { kv } from "@vercel/kv"

export async function POST(req: Request) {
  try {
    const searchParams = new URL(req.url).searchParams
    const parsedParams = webhookSchema.safeParse(Object.fromEntries(searchParams))
    if (!parsedParams.success) return Response.invalidRequest(parsedParams.error)
    const { id } = parsedParams.data

    // get output from Replicate
    const body = await req.json()
    const { output } = body
    if (!output) return Response.badRequest("Missing output")

    // convert output to a blob object
    const file = await fetch(output).then((res) => res.blob())

    // upload & store in Vercel Blob
    const { url } = await put(`${id}.png`, file, { access: "public" })

    await kv.hset(id, { image: url })

    return Response.ok()
  } catch (error) {
    console.error(error)
    return Response.internalServerError()
  }
}
