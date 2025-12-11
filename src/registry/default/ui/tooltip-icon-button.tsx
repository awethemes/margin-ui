"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import {
  Tooltip,
  TooltipContent,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

export type TooltipIconButtonProps = React.ComponentProps<typeof Button> & {
  side?: "top" | "bottom" | "left" | "right"
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
}

export const TooltipIconButton = ({
  ref,
  children,
  tooltip,
  side = "bottom",
  className,
  ...props
}: TooltipIconButtonProps) => {
  const srOnly = typeof tooltip === "string" ? tooltip : null

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              ref={ref}
              size="icon"
              variant="ghost"
              {...props}
              className={cn("size-6 p-1", className)}
            >
              {children}
              {srOnly ? <span className="sr-only">{srOnly}</span> : null}
            </Button>
          }
        />
        <TooltipPositioner side={side}>
          <TooltipContent {...tooltip} />
        </TooltipPositioner>
      </Tooltip>
    </TooltipProvider>
  )
}
