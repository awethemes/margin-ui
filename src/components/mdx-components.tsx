import React from "react"
import * as tabsComponents from "fumadocs-ui/components/tabs"
import defaultComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentSource } from "@/components/component-source"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/registry/default/ui/scroll-area"

const commonComponents: MDXComponents = {
  h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
    <h1
      className={cn("mt-2 scroll-m-20 font-heading text-3xl", className)}
      {...props}
    />
  ),
  h2: ({ className, children, ...props }: React.ComponentProps<"h2">) => {
    const id =
      (props as { id?: string }).id ||
      children
        ?.toString()
        .replace(/ /g, "-")
        .replace(/'/g, "")
        .replace(/\?/g, "")
        .toLowerCase()

    return (
      <h2
        {...props}
        className={cn(
          "[&+p]:mt-4! mt-12 scroll-m-20 font-heading text-2xl first:mt-0 lg:mt-16 *:[code]:text-2xl",
          className
        )}
        id={id}
      >
        <a
          className="no-underline underline-offset-4 hover:underline"
          href={`#${id}`}
        >
          {children}
        </a>
      </h2>
    )
  },
  h3: ({ className, children, ...props }: React.ComponentProps<"h3">) => {
    const id =
      (props as { id?: string }).id ||
      children
        ?.toString()
        .replace(/ /g, "-")
        .replace(/'/g, "")
        .replace(/\?/g, "")
        .toLowerCase()

    return (
      <h3
        {...props}
        className={cn(
          "mt-8 scroll-m-20 font-semibold text-lg *:[code]:text-lg",
          className
        )}
        id={id}
      >
        <a
          className="no-underline underline-offset-4 hover:underline"
          href={`#${id}`}
        >
          {children}
        </a>
      </h3>
    )
  },
  h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
    <h4
      className={cn("mt-8 scroll-m-20 font-medium tracking-tight", className)}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.ComponentProps<"h5">) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 font-medium text-lg tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.ComponentProps<"h6">) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 font-medium text-base tracking-tight",
        className
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.ComponentProps<"a">) => (
    <a
      className={cn(
        "font-medium text-stone-900 underline underline-offset-4",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.ComponentProps<"p">) => (
    <p
      className={cn(
        "font-light text-stone-700 leading-relaxed not-first:mt-6",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => {
    return (
      <pre
        className={cn(
          "no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 text-[.8125rem] outline-none has-data-[slot=tabs]:p-0 has-data-highlighted-line:px-0 has-data-line-numbers:px-0",
          className
        )}
        {...props}
      >
        {children}
      </pre>
    )
  },
  hr: ({ ...props }: React.ComponentProps<"hr">) => (
    <hr
      className="my-4 md:my-8"
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className={cn("mt-6 border-l-3 ps-5 italic", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul
      className={cn("my-6 ms-6 list-disc text-muted-foreground", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
    <ol
      className={cn("my-6 ms-6 list-decimal text-muted-foreground", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li
      className={cn("mt-2", className)}
      {...props}
    />
  ),
  table: ({ className, ...props }: React.ComponentProps<"table">) => (
    <ScrollArea className="my-6 w-full [&+[data-slot=scroll-area-scrollbar]]:translate-y-2.5">
      <table
        className={cn("relative w-full border-none text-sm", className)}
        {...props}
      />
    </ScrollArea>
  ),
  td: ({ className, ...props }: React.ComponentProps<"td">) => (
    <td
      className={cn(
        "whitespace-nowrap px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.ComponentProps<"th">) => (
    <th
      className={cn(
        "px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
    <tr
      className={cn("m-0 border-b last:border-b-none", className)}
      {...props}
    />
  ),
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
    ...tabsComponents,
    ...commonComponents,
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
