import Replicate from "replicate"
import { SITE_URL } from "./constants"

export class ReplicateClient {
  replicate: Replicate

  constructor({ auth }: { auth: string }) {
    this.replicate = new Replicate({ auth })
  }

  async createEmoji({ id, prompt }: { id: string; prompt: string }) {
    const webhook = new URL(`${SITE_URL}/api/webhook/remove-background`)
    webhook.searchParams.set("id", id)
    webhook.searchParams.set("secret", process.env.REPLICATE_WEBHOOK_SECRET as string)

    this.replicate.predictions.create({
      version: "dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
      input: {
        prompt: `A TOK emoji of a ${prompt}`,
        width: 1024,
        height: 1024,
        negative_prompt: "racist, xenophobic, antisemitic, islamophobic, bigoted",
        // prompt_strength: 0.8,
        // num_inference_steps: 50,
      },
      webhook: webhook.toString(),
      webhook_events_filter: ["completed"],
    })
  }
}

export const replicate = new ReplicateClient({
  auth: process.env.REPLICATE_API_TOKEN as string,
})
