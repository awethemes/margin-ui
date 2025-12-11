"use client"

import * as React from "react"
import { Separator as BaseSeparator } from "@base-ui-components/react/separator"
import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof BaseSeparator>) {
  return (
    <BaseSeparator
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "bg-border shrink-0",
        orientation === "horizontal" && "w-full h-px",
        orientation === "vertical" && "h-full w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
