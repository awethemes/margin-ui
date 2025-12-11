"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { FocusScope, useFocusManager, useFocusRing } from "./internal"

function ListboxRoot({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <FocusScope>
      <div
        className="relative"
        {...props}
      >
        {children}
      </div>
    </FocusScope>
  )
}

function Listbox({
  className,
  children,
  ...props
}: React.ComponentProps<"ul"> & {
  asChild?: boolean
}) {
  const Comp = props.asChild ? Slot : "ul"

  return (
    <Comp
      role="listbox"
      className={cn(
        "w-full bg-background divide-y rounded-md flex flex-col outline-solid outline-transparent",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

function ListboxItem({
  className,
  children,
  asChild,
  selected,
  disabled,
  onSelect,
  ...props
}: React.ComponentProps<"li"> & {
  asChild?: boolean
  selected?: boolean
  disabled?: boolean
  onSelect?: () => void
}) {
  const Comp = asChild ? Slot : "li"

  const focusManager = useFocusManager()
  const { isFocusVisible, focusProps } = useFocusRing()

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        focusManager?.focusNext({ wrap: true })
        break
      case "ArrowUp":
        e.preventDefault()
        focusManager?.focusPrevious({ wrap: true })
        break
      case "Enter":
      case " ":
        e.preventDefault()
        onSelect?.()
        break
    }
  }

  return (
    <Comp
      role="option"
      tabIndex={0}
      aria-selected={selected || undefined}
      data-focus-visible={isFocusVisible || undefined}
      onKeyDown={handleKeyDown}
      onClick={() => {
        if (!disabled) onSelect?.()
      }}
      className={cn(
        "group relative flex items-center justify-between gap-2 px-3 py-1.5 w-ful bg-background rounded-none border border-t-0 first:border-t-1 first:rounded-t-md last:rounded-b-md outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-primary data-[focus-visible=true]:outline-offset-2 data-[hover=true]:transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-selected:bg-accent aria-selected:text-accent-foreground",
        className
      )}
      {...focusProps}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { ListboxRoot, Listbox, ListboxItem }
