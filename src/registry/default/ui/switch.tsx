"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "@base-ui-components/react/switch"
import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "relative flex h-6 w-10 rounded-full p-px  data-[checked]:bg-primary data-[unchecked]:bg-input shadow-[inset_0_1.5px_2px] shadow-black/10 outline-1 -outline-offset-1 outline-border data-checked:outline-primary before:absolute before:rounded-full before:outline-offset-3 before:outline-ring focus-visible:before:inset-0 focus-visible:before:outline-2 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "aspect-square h-full rounded-full bg-white transition-transform duration-150 data-[checked]:translate-x-4"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
