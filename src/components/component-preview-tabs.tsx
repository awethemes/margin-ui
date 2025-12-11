"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/registry/default/ui/tabs"

export function ComponentPreviewTabs({
  className,
  align = "center",
  hideCode = false,
  component,
  source,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end"
  hideCode?: boolean
  component: React.ReactNode
  source: React.ReactNode
}) {
  const [tab, setTab] = React.useState("preview")

  return (
    <div
      {...props}
      className={cn("group relative mt-4 mb-12 flex flex-col gap-2", className)}
    >
      <Tabs
        value={tab}
        onValueChange={setTab}
      >
        <div className="flex items-center justify-between">
          {!hideCode && (
            <TabsList className="bg-transparent p-0 *:data-[slot=tab-indicator]:rounded-lg *:data-[slot=tab-indicator]:bg-accent *:data-[slot=tab-indicator]:shadow-none">
              <TabsTrigger
                className="rounded-lg"
                value="preview"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                className="rounded-lg"
                value="code"
              >
                Code
              </TabsTrigger>
            </TabsList>
          )}
        </div>
      </Tabs>
      <div
        className="relative rounded-xl border data-[tab=code]:bg-code"
        data-tab={tab}
      >
        <div
          data-active={tab === "preview"}
          className="invisible data-[active=true]:visible"
        >
          <div
            className={cn(
              "flex h-[450px] w-full justify-center overflow-y-auto p-10 data-[align=start]:items-start data-[align=end]:items-end data-[align=center]:items-center max-sm:px-6"
            )}
            data-align={align}
          >
            <div data-slot="preview">{component}</div>
          </div>
        </div>
        <div
          data-slot="code"
          data-active={tab === "code"}
          className="**:[figure]:!m-0 absolute inset-0 hidden overflow-hidden data-[active=true]:block **:[pre]:h-[450px]"
        >
          {source}
        </div>
      </div>
    </div>
  )
}
