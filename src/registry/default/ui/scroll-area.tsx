"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui-components/react/scroll-area"
import { cn } from "@/lib/utils"

function ScrollAreaRoot(
  props: React.ComponentProps<typeof ScrollAreaPrimitive.Root>
) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      {...props}
    />
  )
}

function ScrollAreaViewport(
  props: React.ComponentProps<typeof ScrollAreaPrimitive.Viewport>
) {
  return (
    <ScrollAreaPrimitive.Viewport
      data-slot="scroll-area-viewport"
      {...props}
    />
  )
}

function ScrollAreaCorner(
  props: React.ComponentProps<typeof ScrollAreaPrimitive.Corner>
) {
  return (
    <ScrollAreaPrimitive.Corner
      data-slot="scroll-area-corner"
      {...props}
    />
  )
}

function ScrollArea({
  children,
  className,
  viewportRef,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  viewportRef?: React.RefObject<HTMLDivElement | null>
  orientation?: "vertical" | "horizontal" | "both"
}) {
  return (
    <ScrollAreaRoot
      data-slot="scroll-area"
      className={cn("relative min-h-0", className)}
      {...props}
    >
      <ScrollAreaViewport
        ref={viewportRef}
        className="overscroll-contain size-full rounded-[inherit] outline-none focus-visible:ring-ring/50 transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
        tabIndex={-1}
      >
        {children}
      </ScrollAreaViewport>
      {orientation === "both" ? (
        <>
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />
        </>
      ) : (
        <ScrollBar orientation={orientation} />
      )}
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex justify-center before:absolute before:rounded before:bg-black/5 opacity-0 transition-opacity delay-300 data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75 select-none touch-none",
        orientation === "vertical" &&
          "h-full w-1 mx-1 py-1 before:inset-x-0 before:inset-y-1",
        orientation === "horizontal" &&
          "w-full h-1 my-1 px-1 flex-col before:inset-y-0 before:inset-x-1",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className="bg-black/60 flex-1 rounded"
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export {
  ScrollArea,
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaCorner,
  ScrollBar,
}
