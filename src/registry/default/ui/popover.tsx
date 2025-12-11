"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui-components/react/popover"
import { cn } from "@/lib/utils"
import { ArrowSvg } from "./icons"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return (
    <PopoverPrimitive.Root
      data-slot="popover"
      {...props}
    />
  )
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      {...props}
    />
  )
}

function PopoverPositioner({
  className,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Positioner>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        data-slot="popover-positioner"
        className={cn("z-50", className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverClose({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Close>) {
  return (
    <PopoverPrimitive.Close
      data-slot="popover-close"
      {...props}
    />
  )
}

function PopoverBackdrop({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Backdrop>) {
  return (
    <PopoverPrimitive.Backdrop
      data-slot="popover-backdrop"
      className="fixed inset-0 bg-white/70 backdrop-blur backdrop-saturate-150 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
      {...props}
    />
  )
}

function PopoverPopup({
  className,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Popup>) {
  return (
    <PopoverPrimitive.Popup
      data-slot="popover-content"
      className={cn(
        "bg-popover text-popover-foreground w-72 px-4 py-4 rounded-lg border-none outline-1 outline-border/50 shadow-lg origin-[var(--transform-origin)] transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function PopoverArrow({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Arrow>) {
  return (
    <PopoverPrimitive.Arrow
      data-slot="popover-arrow"
      className={cn(
        "text-border data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
        className
      )}
      {...props}
    >
      {children ?? <ArrowSvg />}
    </PopoverPrimitive.Arrow>
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverPositioner,
  PopoverClose,
  PopoverBackdrop,
  PopoverPopup,
  PopoverPopup as PopoverContent,
  PopoverArrow,
}
