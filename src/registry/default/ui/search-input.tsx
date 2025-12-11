"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SearchIcon } from "./icons"
import { Input } from "./input"
import { useControllableState } from "./internal"

export function SearchInput({
  onClear,
  onSubmit,
  defaultValue,
  value: controlledValue,
  onChange: controlledOnChange,
  ...props
}: Omit<React.ComponentProps<"input">, "type" | "onChange" | "onSubmit"> & {
  onClear?: () => void
  onSubmit?: (value: string) => void
  onChange?: (value: string) => void
}) {
  const [value, setValue] = useControllableState({
    defaultProp: (defaultValue ?? "") as string,
    prop: controlledValue as string | undefined,
    onChange: controlledOnChange,
  })

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    props?.onKeyDown?.(e)
    // If the event is already prevented, do not proceed
    if (e.defaultPrevented) {
      return
    }

    const key = e.key
    if (key === "Enter" && (props?.disabled || props?.readOnly)) {
      e.preventDefault()
    }

    if (props?.disabled || props?.readOnly) {
      return
    }

    // for backward compatibility;
    // otherwise, "Enter" on an input would trigger a form submit, the default browser behavior
    if (key === "Enter" && onSubmit) {
      e.preventDefault()
      onSubmit(value)
    }

    // Only clear if there's content
    if (key === "Escape" && e.currentTarget.value !== "") {
      // Always prevent the event from bubbling up to avoid closing modals
      e.preventDefault()
      e.stopPropagation()

      setValue("")
      onClear?.()
    }
  }

  return (
    <div
      role="search"
      className="relative"
    >
      <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />

      <Input
        {...props}
        type="search"
        value={value}
        onKeyDown={onKeyDown}
        onChange={(e) => setValue(e.target.value)}
        defaultValue={undefined} // controlled by useControllableState
        className={cn("pl-9 sm:w-72", props?.className)}
      />
    </div>
  )
}
