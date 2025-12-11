"use client"

import * as React from "react"
import { CircleNotchIcon } from "@phosphor-icons/react"
import { Slottable } from "@radix-ui/react-slot"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export const SubmitButton = ({
  type = "submit",
  isSubmitting,
  children,
  ...props
}: React.ComponentProps<typeof Button> & {
  isSubmitting?: boolean
}) => {
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    let timeout: number | null = null

    if (isSubmitting) {
      // Start a 250 timer to show the loading state only if the form is still submitting
      timeout = window.setTimeout(() => setIsLoading(true), 250)
    } else {
      // Reset loading state if form submission is done before 500ms
      if (timeout) clearTimeout(timeout)
      setIsLoading(false)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [isSubmitting])

  return (
    <Button
      {...props}
      type={type}
      disabled={isLoading || props.disabled}
      className={cn("relative overflow-hidden", props.className)}
    >
      {/* Invisible content to maintain width */}
      <span
        aria-hidden="true"
        className="invisible"
      >
        <Slottable>{children}</Slottable>
      </span>

      {/* Visible animated content */}
      <span className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.span
              key={"idle"}
              exit={{
                opacity: 0,
                y: -15,
                transition: { duration: 0.3, type: "spring" },
              }}
            >
              <Slottable>{children}</Slottable>
            </motion.span>
          )}

          {isLoading && (
            <motion.span
              key={"loading"}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 100, y: 0, transition: { delay: 0 } }}
              exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
            >
              <CircleNotchIcon className={cn("size-4 animate-spin")} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </Button>
  )
}
