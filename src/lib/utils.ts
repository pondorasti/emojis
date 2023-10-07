import { clsx, type ClassValue } from "clsx"
import { customAlphabet } from "nanoid"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 10)

export const formatPrompt = (prompt: string) => prompt.replace(/ /g, "-").replace(/-+/g, "-").toLocaleLowerCase()

export const getRandomItem = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)]
