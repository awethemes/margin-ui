"use client"

import { useMemo, type ComponentProps, type ReactNode } from "react"
import { Link, usePathname } from "fumadocs-core/framework"
import type * as PageTree from "fumadocs-core/page-tree"
import {
  AnchorProvider,
  useActiveAnchors,
  type TOCItemType,
} from "fumadocs-core/toc"
import { useTreeContext } from "fumadocs-ui/contexts/tree"
import { cn } from "@/lib/cn"

export interface DocsPageProps {
  toc?: TOCItemType[]
  children: ReactNode
}

export function DocsPage({ toc = [], ...props }: DocsPageProps) {
  return (
    <AnchorProvider toc={toc}>
      <main className="flex w-full min-w-0 flex-col">
        <article className="flex flex-1 flex-col w-full max-w-[860px] gap-0 px-4 py-10 md:px-6 md:mx-auto">
          {props.children}
          <DocsFooter />
        </article>
      </main>

      {toc.length > 0 && <TocContents toc={toc} />}
    </AnchorProvider>
  )
}

export function DocsBody(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(props.className)}
    >
      {props.children}
    </div>
  )
}

export function DocsDescription(props: ComponentProps<"p">) {
  if (props.children === undefined) return null

  return (
    <p
      {...props}
      className={cn("text-lg text-stone-500 font-light", props.className)}
    >
      {props.children}
    </p>
  )
}

export function DocsTitle(props: ComponentProps<"h1">) {
  return (
    <h1
      {...props}
      className={cn(
        "text-4xl md:text-5xl font-light tracking-tighter text-stone-900",
        props.className
      )}
    >
      {props.children}
    </h1>
  )
}

function TocContents({
  toc,
  ...props
}: ComponentProps<"div"> & { toc: TOCItemType[] }) {
  return (
    <div
      {...props}
      className="sticky top-[var(--site-header-height)] w-[286px] shrink-0 h-[calc(100dvh-var(--site-header-height))] py-10 pl-8 border-l border-stone-200 overflow-auto max-xl:hidden"
    >
      <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-4">
        On This Page
      </p>

      <div className="relative flex flex-col">
        {toc.map((item) => (
          <TocItem
            key={item.url}
            item={item}
          />
        ))}
      </div>
    </div>
  )
}

function TocItem({ item }: { item: TOCItemType }) {
  const isActive = useActiveAnchors().includes(item.url.slice(1))

  return (
    <a
      href={item.url}
      className={cn(
        "font-mono text-xs py-1.5 transition-colors duration-200",
        isActive
          ? "text-stone-900 font-medium"
          : "text-stone-600 hover:text-stone-900"
      )}
      style={{
        paddingLeft: Math.max(0, item.depth - 2) * 16,
      }}
    >
      {item.title}
    </a>
  )
}

function DocsFooter() {
  const { root } = useTreeContext()
  const pathname = usePathname()

  const flatten = useMemo(() => {
    const result: PageTree.Item[] = []

    function scan(items: PageTree.Node[]) {
      for (const item of items) {
        if (item.type === "page") result.push(item)
        else if (item.type === "folder") {
          if (item.index) result.push(item.index)
          scan(item.children)
        }
      }
    }

    scan(root.children)
    return result
  }, [root])

  const { previous, next } = useMemo(() => {
    const idx = flatten.findIndex((item) => item.url === pathname)

    if (idx === -1) return {}
    return {
      previous: flatten[idx - 1],
      next: flatten[idx + 1],
    }
  }, [flatten, pathname])

  return (
    <div className="flex flex-row justify-between gap-4 mt-16 pt-8 border-t border-stone-200">
      {previous ? (
        <Link
          href={previous.url}
          className="group flex items-center gap-2 px-4 py-3 border border-stone-200 hover:border-stone-900 transition-colors duration-200 flex-1"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-stone-400">
            ← Previous
          </span>
          <span className="font-medium text-sm text-stone-900">
            {previous.name}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={next.url}
          className="group flex items-center gap-2 px-4 py-3 border border-stone-200 hover:border-stone-900 transition-colors duration-200 flex-1 justify-end text-right"
        >
          <span className="font-medium text-sm text-stone-900">
            {next.name}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-stone-400">
            Next →
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}
