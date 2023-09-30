import { OpenGraphImage } from "@/app/_components/opengraph-image"
import { DEFAULT_OG_IMAGE } from "@/lib/constants"

export { contentType, size } from "@/app/_components/favicon"

export default async function Image() {
  return OpenGraphImage({ url: DEFAULT_OG_IMAGE })
}
