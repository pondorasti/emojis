import { Response } from "@/server/utils"
import { Ratelimit } from "@upstash/ratelimit"
import { kv } from "@vercel/kv"
import { type NextRequest } from "next/server"

const ratelimit = new Ratelimit({
  redis: kv,
  // 500 requests from the same IP in 1 day
  limiter: Ratelimit.slidingWindow(5, "1 d"),
})

export const runtime = "edge"

export async function GET(request: NextRequest) {
  const auth = request.headers.get("Authorization")
  if (auth !== `Bearer ${process.env.API_SECRET}`) return Response.unauthorized()

  const ip = request.ip ?? "127.0.0.1"
  const { limit, reset, remaining } = await ratelimit.limit(ip)
  const headers = {
    "X-RateLimit-Limit": limit.toString(),
    "X-RateLimit-Remaining": remaining.toString(),
    "X-RateLimit-Reset": reset.toString(),
  }

  if (limit <= 0) return Response.tooManyRequests({ headers })
  return Response.success({ headers })
}
