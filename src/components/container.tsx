import React from "react"
import { cn } from "@/lib/utils"

export const Container = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    {...props}
    data-slot="container"
    className={cn("max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24", className)}
  />
)
