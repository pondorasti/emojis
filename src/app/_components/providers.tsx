"use client"

import { Analytics } from "@vercel/analytics/react"
import { AxiomWebVitals } from "next-axiom"

export function Providers() {
  return (
    <>
      <Analytics />
      <AxiomWebVitals />
      {/* <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#131A2B", // tremor dark bg custom
            border: "1px solid #1f2937", // gray-200
            color: "#e5e7eb", // gray-200
          },
        }}
      /> */}
    </>
  )
}
