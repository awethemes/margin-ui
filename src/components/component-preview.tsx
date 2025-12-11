import React from "react"
import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { ComponentSource } from "@/components/component-source"
import { getComponent } from "@/lib/registry"

interface ComponentPreviewProps extends Omit<
  React.ComponentProps<"div">,
  "ref"
> {
  name: string
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
}

export function ComponentPreview({
  name,
  className,
  align = "center",
  hideCode = false,
  ...props
}: ComponentPreviewProps) {
  const Component = getComponent(name)

  if (!Component) {
    return (
      <p className="text-orange-700 text-sm">
        Component{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  return (
    <ComponentPreviewTabs
      align={align}
      className={className}
      component={<Component />}
      hideCode={hideCode}
      source={
        <ComponentSource
          collapsible={false}
          name={name}
        />
      }
      {...props}
    />
  )
}
