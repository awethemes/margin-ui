"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

type ButtonProps = React.ComponentProps<typeof Button>
interface CopyButtonProps extends ButtonProps {
  value: string
}

export function copyToClipboardWithMeta(value: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    void navigator.clipboard.writeText(value)
  }
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        "shrink-0 relative z-10 p-0 h-6 w-6 [&_svg]:h-3.5 [&_svg]:w-3.5 [&_svg]:stroke-black",
        className
      )}
      onClick={() => {
        copyToClipboardWithMeta(value)
        setHasCopied(true)
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  )
}
