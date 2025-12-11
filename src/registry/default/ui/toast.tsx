"use client"

import * as React from "react"
import { Toaster as Sonner, toast, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      closeButton
      theme={"light"}
      className="toaster group"
      toastOptions={{
        classNames: {
          info: "bg-gradient-to-r! from-blue-100 via-white to-gray-50",
          error: "bg-gradient-to-r! from-rose-100 via-white to-gray-50",
          success: "bg-gradient-to-r! from-green-100 via-white to-gray-50",
          warning: "bg-gradient-to-r! from-orange-100 via-white to-gray-50",
        },
      }}
      style={
        {
          "--normal-bg": "hsl(var(--popover))",
          "--normal-text": "hsl(var(--popover-foreground))",
          "--normal-border": "transparent",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster, toast }
