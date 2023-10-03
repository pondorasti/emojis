import { FEATURED_OG_IMAGES } from "@/lib/constants"
import { getRandomItem } from "@/lib/utils"
import { Favicon } from "./_components/favicon"

export const runtime = "edge"

export { contentType, size } from "./_components/favicon"

export default async function Icon() {
  return Favicon({ url: getRandomItem(FEATURED_OG_IMAGES) })
}
