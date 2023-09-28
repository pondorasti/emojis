import { DEFAULT_OG_IMAGE } from "@/lib/constants"
import { Favicon } from "./_components/favicon"

export const runtime = "edge"

export { contentType, size } from "./_components/favicon"

export default async function Icon() {
  return Favicon({ url: DEFAULT_OG_IMAGE })
}
