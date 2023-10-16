export const PROD_URL = "https://emojis.sh"
export const SITE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NGROK_URL
export const APP_STORE_URL = "https://apps.apple.com/us/app/ai-emojis-generator/id6468916301"

export const SITEMAP_PAGE_SIZE = 50_000

export const EMOJI_SIZE = 768
export const DEFAULT_OG_IMAGE =
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/R8kNkB6-no-background-21MudH10pBTUrDtoi3EueKPZj5wnbd.png"
export const FEATURED_OG_IMAGES = [
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/1p0Dvak-no-background-c8Xh7JPh6KwLVmCNzQe5fbVot7BGu4.png",
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/6OPocbt-no-background-lfz6ZZnjrcpcxmj8tKfd9VWxgGfQm0.png",
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/8r1k7Lm-no-background-sUp0wfRv2hsjQKdwioPcNISxpAV9tg.png",
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/Dqi6fup-no-background-IZ7vr2h8CxlnmNYbODeNmRWiGG5Bru.png",
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/iXPtuwp-no-background-vdg9dJJ7nLEbvwGZErZJ5x5bfvbSjW.png",
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/LoamQpr-no-background-WBqjMr4PW0SSgCp3pPSjG861W8nkcq.png",
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/mLL2hOV-no-background-Vd2t8vK3EZdt74D4kcD94QAX3wDUFh.png",
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/nK79lj7-no-background-qshuu3fJvn4pAc8iDvZUzEVOk59dZ7.png",
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/Nw6XAGn-no-background-drJSHfjbtRsjotfErYeFWhQQpyBJ6G.png",
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/p1PhU9o-no-background-SCOmR6J7XwB5fl1g9YHKH2RnrPgupx.png",
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/QiwPrGE-no-background-OqOXBjMoOXdNMqG7PgzWppP6O9VeF2.png",
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/R274YsW-no-background-q3QM6t1ZLrsPQUlV0z8Hh5yKcBjzrv.png",
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/R8kNkB6-no-background-21MudH10pBTUrDtoi3EueKPZj5wnbd.png",
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/t7HNaDZ-no-background-8K5sz3rSybkZ0wHQFDOdazFE9R9Bux.png",
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/W6Sxe2F-no-background-NDa3Pa5xlMZiQehmi18SwyCCegaTXw.png",
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/wMUSzgi-no-background-PNouROiiYoLxSOls0Gy7K3JouuOQZQ.png",
  "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/xRlqqoQ-no-background-xQEeyhNpuSDLyuJudbmgxDQBsUhIkE.png",
]
