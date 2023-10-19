import { track } from "@vercel/analytics/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { APP_STORE_URL } from "./lib/constants"

export async function middleware(request: NextRequest) {
  await track("Go to App Store", {
    origin: request.nextUrl.origin,
    referrer: request.nextUrl.searchParams.get("referrer") ?? "unknown",
  })
  return NextResponse.redirect(APP_STORE_URL)
}

export const config = {
  matcher: "/app",
}
