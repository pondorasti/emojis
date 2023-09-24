"use client"

import { useEffect, useRef } from "react"
import { createEmoji } from "./action"
import { SubmitButton } from "./submit-button"
// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom"

export function EmojiForm() {
  const [formState, formAction] = useFormState(createEmoji)
  const submitRef = useRef<React.ElementRef<"button">>(null)

  useEffect(() => {
    if (!formState) return
    console.log(formState.message)
  }, [formState])

  return (
    <form
      action={formAction}
      className="bg-black rounded-full shadow-lg h-fit flex flex-row px-1.5 items-center my-6 max-w-md w-full"
    >
      <input
        type="text"
        name="prompt"
        onKeyDown={(e) => {
          // if (e.key === "Enter" && !e.shiftKey) e.preventDefault()
          if (e.key === "Enter") {
            e.preventDefault()
            submitRef.current?.click()
          }
        }}
        placeholder="cat"
        className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
      />
      <SubmitButton ref={submitRef} />
    </form>
  )
}
