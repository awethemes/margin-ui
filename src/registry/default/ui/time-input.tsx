"use client"

import * as React from "react"
import {
  useDateSegment,
  useTimeField,
  type AriaTimeFieldProps,
  type TimeValue,
} from "@react-aria/datepicker"
import {
  useTimeFieldState,
  type DateSegment,
  type TimeFieldState,
} from "@react-stately/datepicker"
import { cn } from "@/lib/utils"
import { useFocusRing } from "./internal"

const dateInputStyle =
  "relative inline-flex h-9 w-full px-2.5 py-2 items-center overflow-hidden whitespace-nowrap rounded-md border border-input bg-background text-sm shadow-xs transition-[color,box-shadow] outline-none data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:ring-[3px] data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive"

type TimeSegmentProps = {
  state: TimeFieldState
  segment: DateSegment
}

function TimeSegment({ state, segment }: TimeSegmentProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const { segmentProps } = useDateSegment(segment, state, ref)

  const { focusProps, isFocused, isFocusVisible } = useFocusRing()

  return (
    <span
      ref={ref}
      {...segmentProps}
      {...focusProps}
      className={cn(
        "tabular-nums block p-0.5 rounded-[7px] text-foreground data-focused:bg-secondary data-focused:text-secondary-foreground data-invalid:data-focused:bg-destructive data-focused:data-placeholder:text-foreground data-invalid:data-placeholder:text-destructive data-invalid:text-destructive data-placeholder:text-muted-foreground data-[type=literal]:text-muted-foreground caret-transparent outline-hidden data-disabled:cursor-not-allowed data-disabled:opacity-50 data-invalid:data-focused:text-white data-invalid:data-focused:data-placeholder:text-white",
        !segment.isEditable ? "text-muted-foreground" : ""
      )}
      style={{
        ...segmentProps.style,
        minWidth:
          segment.maxValue != null
            ? String(segment.maxValue).length + "ch"
            : undefined,
      }}
      inputMode="numeric"
      data-type={segment.type}
      data-invalid={state.isInvalid || undefined}
      data-readonly={!segment.isEditable || undefined}
      data-disabled={state.isDisabled || undefined}
      data-focused={isFocused || undefined}
      data-focus-visible={isFocusVisible || undefined}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        className="block w-full text-center italic"
        style={{
          visibility: segment.isPlaceholder ? undefined : "hidden",
          height: segment.isPlaceholder ? "" : 0,
          pointerEvents: "none",
        }}
      >
        {segment.placeholder}
      </span>

      {/* Display the segment text, but only if it's not a placeholder. */}
      {/* This prevents the placeholder from being read by screen readers. */}
      {segment.isPlaceholder ? "" : segment.text}
    </span>
  )
}

type TimeInputProps = Omit<
  AriaTimeFieldProps<TimeValue>,
  | "label"
  | "description"
  | "errorMessage"
  | "validationState"
  | "validationBehavior"
> & {
  className?: string
}

function TimeInput({ className, ...props }: TimeInputProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const state = useTimeFieldState({
    ...props,
    locale: "en-US", // Force locale to 'en-US' for time-input
    validationBehavior: "aria",
  })

  const { focusProps, isFocused } = useFocusRing({ within: true })
  const { fieldProps, inputProps } = useTimeField(
    { ...props, inputRef },
    state,
    ref
  )

  return (
    <div
      ref={ref}
      {...fieldProps}
      {...focusProps}
      className={cn(dateInputStyle, className)}
      data-slot="time-input"
      data-invalid={state.isInvalid || undefined}
      data-disabled={state.isDisabled || undefined}
      data-readonly={state.isReadOnly || undefined}
      data-focus-within={isFocused || undefined}
    >
      {state.segments.map((segment, i) => (
        <TimeSegment
          key={i}
          state={state}
          segment={segment}
        />
      ))}
      <input
        ref={inputRef}
        type="text"
        className="hidden"
        {...inputProps}
      />
    </div>
  )
}

export { TimeInput }
