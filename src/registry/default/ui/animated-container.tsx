"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

function useResizeObserver(
  elementRef: React.RefObject<Element | null>
): ResizeObserverEntry | undefined {
  const [entry, setEntry] = React.useState<ResizeObserverEntry>()

  React.useEffect(() => {
    const node = elementRef?.current
    if (!node) return

    const observer = new ResizeObserver(([entry]) => setEntry(entry))
    observer.observe(node)

    return () => observer.disconnect()
  }, [elementRef])

  return entry
}

type AnimatedContainerProps = Omit<
  React.ComponentProps<typeof motion.div>,
  "animate" | "children"
> & {
  width?: boolean
  height?: boolean
  children?: React.ReactNode
  containerClassName?: string
}

const AnimatedContainer = ({
  width = false,
  height = false,
  transition = { duration: 0.3 },
  children,
  className,
  containerClassName,
  ...props
}: AnimatedContainerProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const resizeObserverEntry = useResizeObserver(containerRef)

  return (
    <motion.div
      animate={{
        width: width
          ? (resizeObserverEntry?.contentRect?.width ?? "auto")
          : "auto",
        height: height
          ? (resizeObserverEntry?.contentRect?.height ?? "auto")
          : "auto",
      }}
      transition={transition}
      className={cn(
        width && "overflow-x-hidden",
        height && "overflow-y-hidden",
        width && height ? "overflow-hidden" : "",
        className
      )}
      {...props}
    >
      <div
        ref={containerRef}
        className={cn(height && "h-max", width && "w-max", containerClassName)}
      >
        {children}
      </div>
    </motion.div>
  )
}

export { AnimatedContainer }
