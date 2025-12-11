"use client"

import * as React from "react"
import { NumberField as BaseNumberField } from "@base-ui-components/react/number-field"
import { ArrowsLeftRightIcon, MinusIcon, PlusIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
import { useFocusRing } from "./internal"

const NumberInputContext = React.createContext<{ id: string } | null>(null)

const useNumberInput = () => {
  const context = React.useContext(NumberInputContext)

  if (!context) {
    throw new Error("useNumberInput must be used within a NumberField")
  }

  return context
}

function NumberInput({
  id,
  children,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Root>) {
  let fieldId = React.useId()
  if (id) {
    fieldId = id
  }

  const { focusProps, isFocused } = useFocusRing({ within: true })

  return (
    <NumberInputContext.Provider value={{ id: fieldId }}>
      <BaseNumberField.Root
        {...props}
        id={fieldId}
        data-slot="number-input"
        className={cn("flex flex-col items-start gap-1", props?.className)}
      >
        {children}
        <BaseNumberField.Group
          {...focusProps}
          data-slot="number-input-group"
          data-focus-within={isFocused || undefined}
          className="group flex items-center px-1.5 rounded-md text-base md:text-sm font-semibold border border-input h-9 transition-[box-shadow] data-focus-within:border-ring data-focus-within:ring-ring/30 data-focus-within:ring-[2px] data-disabled:opacity-60 data-disabled:cursor-not-allowed"
        >
          <BaseNumberField.Decrement
            data-slot="number-input-decrement"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "p-0 size-5 rounded-md"
            )}
          >
            <MinusIcon />
          </BaseNumberField.Decrement>

          <BaseNumberField.Input
            data-slot="number-input-input"
            className={cn(
              "w-[3.5em] bg-transparent py-2 text-center outline-none"
            )}
          />

          <BaseNumberField.Increment
            data-slot="number-input-increment"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "p-0 size-5 rounded-md"
            )}
          >
            <PlusIcon className="size-4" />
          </BaseNumberField.Increment>
        </BaseNumberField.Group>
      </BaseNumberField.Root>
    </NumberInputContext.Provider>
  )
}

function NumberInputScrubArea({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.ScrubArea>) {
  const { id: fieldId } = useNumberInput()

  return (
    <BaseNumberField.ScrubArea
      className={cn("cursor-ew-resize", className)}
      data-slot="number-input-scrub-area"
      {...props}
    >
      <label
        htmlFor={fieldId}
        className="text-foreground cursor-ew-resize text-sm font-medium"
        data-slot="number-input-label"
      >
        Amount
      </label>
      <BaseNumberField.ScrubAreaCursor
        className="drop-shadow-sm filter"
        data-slot="number-input-scrub-area-cursor"
      >
        <ArrowsLeftRightIcon className="size-4.5" />
      </BaseNumberField.ScrubAreaCursor>
    </BaseNumberField.ScrubArea>
  )
}

export { NumberInput, NumberInputScrubArea }
