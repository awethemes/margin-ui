"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const DataListRoot = ({ className, ...props }: React.ComponentProps<"dl">) => {
  return (
    <dl
      {...props}
      className={cn(
        "grid grid-cols-1 gap-2.5 md:grid-cols-[auto_1fr]",
        className
      )}
    />
  )
}

const DataListItem = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      {...props}
      className={cn(
        "grid grid-cols-1 gap-2 text-sm md:grid-cols-subgrid md:col-[span_2] md:align-baseline md:gap-4",
        className
      )}
    />
  )
}

const DataListLabel = ({ className, ...props }: React.ComponentProps<"dt">) => {
  return (
    <dt
      {...props}
      className={cn("font-medium md:min-w-40 md:font-normal", className)}
    />
  )
}

const DataListValue = ({
  children,
  className,
  ...props
}: React.ComponentProps<"dd">) => (
  <dd
    {...props}
    className={cn(className, "min-w-0")}
  >
    {children}
  </dd>
)

export { DataListRoot, DataListItem, DataListLabel, DataListValue }
