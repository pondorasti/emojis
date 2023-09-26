import { EmojiCard } from "@/app/_components/emoji-card"
import { EmojiForm } from "@/app/_components/emoji-form"
import { EMOJI_SIZE } from "@/lib/constants"
import { prisma } from "@/server/db"
import Image from "next/image"
import { notFound } from "next/navigation"

// export async function generateMetadata({
//   params,
// }: {
//   params: {
//     id: string;
//   };
// }): Promise<Metadata | undefined> {
//   const data = await kv.hgetall<{ prompt: string; image?: string }>(params.id);
//   if (!data) {
//     return;
//   }

//   const title = `Spirals: ${data.prompt}`;
//   const description = `A spiral generated from the prompt: ${data.prompt}`;
//   const image = data.image || "https://spirals.vercel.app/opengraph-image.png";

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       creator: "@steventey",
//     },
//   };
// }

export default async function Emoji({ params }: { params: { id: string } }) {
  const data = await prisma.emoji.findUnique({
    where: { id: params.id },
  })

  if (!data) redirect("/")

  return (
    <>
      <EmojiForm initialPrompt={data.prompt} />
      <EmojiCard id={params.id} />
    </>
  )
}
