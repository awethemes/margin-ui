"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui-components/react/tabs"
import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground relative z-0 inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Tab>) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/20 focus-visible:outline-ring text-foreground data-selected:text-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-0 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabIndicator({
  variant = "capsule",
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Indicator> & {
  variant?: "capsule" | "underline"
}) {
  return (
    <TabsPrimitive.Indicator
      data-slot="tab-indicator"
      className={cn(
        "absolute left-0 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] -translate-y-1/2 transition-all duration-300 ease-in-out",
        variant === "underline"
          ? "bg-primary top-full z-10 h-[2px] rounded-[2px]"
          : "bg-background top-1/2 -z-[1] h-[var(--active-tab-height)] rounded-md shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Panel>) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabIndicator, TabsContent }
