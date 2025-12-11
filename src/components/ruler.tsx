import * as React from "react"
import { cn } from "@/lib/utils"

export function Ruler({
  className = "",
  orientation = "horizontal",
}: React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
}) {
  const isHorizontal = orientation === "horizontal"

  return (
    <div
      className={cn(
        "flex overflow-hidden opacity-20 pointer-events-none select-none",
        isHorizontal
          ? "w-full h-5 border-b border-stone-500"
          : "h-full w-5 flex-col border-r border-stone-500",
        className
      )}
    >
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex-1 flex",
            isHorizontal
              ? "items-end justify-center"
              : "flex-col items-end justify-center"
          )}
        >
          <div
            className={cn(
              isHorizontal ? "h-2 w-px" : "w-2 h-px",
              i % 5 === 0 ? "bg-stone-500" : "bg-stone-300"
            )}
          />
        </div>
      ))}
    </div>
  )
}
