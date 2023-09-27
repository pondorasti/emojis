import { CornerDownLeft } from "lucide-react"
import React from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"
import { Loader } from "../loader"

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
      {pending ? <Loader /> : <CornerDownLeft size={16} className="-ml-px" />}
    </button>
  )
})
SubmitButton.displayName = "SubmitButton"
