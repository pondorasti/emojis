export const PROD_URL = "https://emojis.alexandru.so"
export const SITE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NGROK_URL

export const EMOJI_SIZE = 768
export const DEFAULT_OG_IMAGE =
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/R8kNkB6-no-background-21MudH10pBTUrDtoi3EueKPZj5wnbd.png"
