"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("skeleton rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
