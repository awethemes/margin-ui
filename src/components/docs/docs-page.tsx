"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Item } from "fumadocs-core/page-tree"
import { Button } from "@/registry/default/ui/button"
import { DocsTableOfContents } from "@/components/docs-toc"

interface TOCItem {
  title: React.ReactNode
  url: string
  depth: number
}

interface NeighbourItem {
  url?: string
  name?: React.ReactNode
}

interface DocsPageProps {
  children: React.ReactNode
  toc?: TOCItem[]
  title?: string
  description?: string
  neighbours?: {
    previous?: Item | NeighbourItem
    next?: Item | NeighbourItem
  }
}

export function DocsPage({
  children,
  toc,
  title,
  description,
  neighbours,
}: DocsPageProps) {
  return (
    <div className="flex items-stretch xl:w-full" data-slot="docs">
      <div className="relative flex min-w-0 flex-1 flex-col bg-muted/30 lg:mt-4 lg:mr-4 lg:mb-8 lg:rounded-xl lg:border">
        <article className="border-b bg-background px-4 py-6 sm:px-6 lg:rounded-t-xl lg:p-8">
          <div className="mx-auto w-full max-w-3xl">
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              {(title || description) && (
                <div className="flex flex-col gap-2">
                  {title && (
                    <h1 className="scroll-m-20 font-heading text-3xl font-bold tracking-tight xl:text-4xl">
                      {title}
                    </h1>
                  )}
                  {description && (
                    <p className="text-muted-foreground text-lg">
                      {description}
                    </p>
                  )}
                </div>
              )}
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {children}
              </div>
            </div>

            {neighbours && (neighbours.previous || neighbours.next) && (
              <div className="flex items-center gap-2 pt-8 mt-8 border-t">
                {neighbours.previous && "url" in neighbours.previous && neighbours.previous.url && (
                  <Button variant="outline" className="shadow-none" asChild>
                    <a href={neighbours.previous.url}>
                      <ChevronLeft className="size-4" />
                      {neighbours.previous.name as React.ReactNode}
                    </a>
                  </Button>
                )}
                {neighbours.next && "url" in neighbours.next && neighbours.next.url && (
                  <Button variant="outline" className="ms-auto shadow-none" asChild>
                    <a href={neighbours.next.url}>
                      {neighbours.next.name as React.ReactNode}
                      <ChevronRight className="size-4" />
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </article>
      </div>

      <div className="sticky top-[var(--header-height)] z-30 ms-auto hidden h-[calc(100svh-var(--header-height))] w-64 flex-col overflow-hidden xl:flex">
        <div className="no-scrollbar flex min-h-0 flex-col gap-2 overflow-y-auto py-2">
          <div className="h-[var(--top-spacing)] shrink-0" />
          {toc && toc.length > 0 && <DocsTableOfContents toc={toc} />}
        </div>
      </div>
    </div>
  )
}

export function DocsTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="scroll-m-20 font-heading text-3xl font-bold tracking-tight xl:text-4xl">
      {children}
    </h1>
  )
}

export function DocsDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground text-lg">{children}</p>
}

export function DocsBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {children}
    </div>
  )
}
