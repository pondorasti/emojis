import { Response, webhookSchema } from "@/server/constants"
import { replicate } from "@/server/replicate"

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

    await replicate.removeBackground({ id, image: output[0] })

    return Response.ok()
  } catch (error) {
    console.error(error)
    return Response.internalServerError()
  }
}
