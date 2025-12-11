import type * as React from "react"
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock"
import { getComponentSource } from "@/lib/registry"
// import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper"
import { cn } from "@/lib/utils"

export function ComponentSource({
  name,
  src,
  title,
  language,
  collapsible = true,
  className,
}: React.ComponentProps<"div"> & {
  name?: string
  src?: string
  title?: string
  language?: string
  collapsible?: boolean
}) {
  if (!name && !src) {
    return null
  }

  let code: string | undefined
  if (name) {
    code = getComponentSource(name) ?? undefined
  }

  if (!code) {
    return null
  }

  const lang = language ?? title?.split(".").pop() ?? "tsx"

  if (!collapsible) {
    return (
      <div className={cn("relative", className)}>
        <CodeBlock
          code={code}
          language={lang}
          title={title}
        />
      </div>
    )
  }

  return (
    <div className={className}>
      <CodeBlock
        code={code}
        language={lang}
        title={title}
      />
    </div>
  )
}
