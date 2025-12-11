import * as tabsComponents from "fumadocs-ui/components/tabs"
import defaultComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentSource } from "@/components/component-source"
import { cn } from "@/lib/utils"

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
    ...tabsComponents,
    CodeTabs: tabsComponents.Tabs,
    TabsPanel: tabsComponents.TabsContent,
    TabsTab: tabsComponents.TabsTrigger,
    ComponentPreview,
    ComponentSource,
    Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
      <h3
        className={cn("mt-8 scroll-m-32 font-medium tracking-tight", className)}
        {...props}
      />
    ),
    Steps: ({ ...props }) => (
      <div
        className="steps [&>h3]:step *:[h3]:first:mt-0! mb-12 [counter-reset:step]"
        {...props}
      />
    ),
  }
}
