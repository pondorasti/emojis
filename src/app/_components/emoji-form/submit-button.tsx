import { CornerDownLeft, Loader2 } from "lucide-react"
import React from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"

export const SubmitButton = React.forwardRef<React.ElementRef<"button">>((_, ref) => {
  const { pending } = useFormStatus()

  return (
    <button
      ref={ref}
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="text-white rounded-lg hover:bg-white/25 focus:bg-white/25 w-8 h-8 aspect-square flex items-center justify-center ring-0 outline-0"
    >
      {pending ? <Loader2 size={16} className="animate-spin" /> : <CornerDownLeft size={16} className="-ml-px" />}
    </button>
  )
})
SubmitButton.displayName = "SubmitButton"
