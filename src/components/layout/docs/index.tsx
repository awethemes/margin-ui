"use client"

import React, { useMemo, type ComponentProps, type ReactNode } from "react"
import { cva } from "class-variance-authority"
import { usePathname } from "fumadocs-core/framework"
import Link from "fumadocs-core/link"
import type * as PageTree from "fumadocs-core/page-tree"
import { useSearchContext } from "fumadocs-ui/contexts/search"
import { TreeContextProvider, useTreeContext } from "fumadocs-ui/contexts/tree"
import { atom, useAtom } from "jotai"
import { Container } from "@/components/container"
import { Ruler } from "@/components/ruler"
import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/cn"

const sidebarOpenAtom = atom(false)
const useSidebarOpen = () => useAtom(sidebarOpenAtom)

export interface DocsLayoutProps {
  tree: PageTree.Root
  children: ReactNode
}

export function DocsLayout({ tree, children }: DocsLayoutProps) {
  return (
    <TreeContextProvider tree={tree}>
      <SiteHeader
        position="sticky"
        className="py-0 border-b border-stone-200"
      />

      <div className="fixed z-[-1] inset-0">
        <div className="absolute top-0 left-6 md:left-12 bottom-0 hidden lg:block opacity-50 z-0">
          <Ruler orientation="vertical" />
        </div>
      </div>

      <Container className="relative max-w-screen-2xl">
        <div className="flex flex-row gap-0">
          <Sidebar />
          {children}
        </div>
      </Container>
    </TreeContextProvider>
  )
}

function SearchToggle(props: ComponentProps<"button">) {
  const { enabled, setOpenSearch } = useSearchContext()
  if (!enabled) return

  return (
    <button
      {...props}
      className={cn("text-sm", props.className)}
      onClick={() => setOpenSearch(true)}
    >
      Search
    </button>
  )
}

function NavbarSidebarTrigger(props: ComponentProps<"button">) {
  const [open, setOpen] = useSidebarOpen()

  return (
    <button
      {...props}
      className={cn("text-sm", props.className)}
      onClick={() => setOpen(!open)}
    >
      Sidebar
    </button>
  )
}

function Sidebar() {
  const [open, setOpen] = useSidebarOpen()
  const { root } = useTreeContext()

  const children = useMemo(() => {
    function renderItems(items: PageTree.Node[]) {
      return items.map((item) => (
        <SidebarItem
          key={item.$id}
          item={item}
        >
          {item.type === "folder" ? renderItems(item.children) : null}
        </SidebarItem>
      ))
    }

    return renderItems(root.children)
  }, [root])

  return (
    <>
      {/* Mobile overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 top-14 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Desktop sidebar - positioned within Container grid */}
      <aside
        className={cn(
          "w-[280px] shrink-0 hidden md:block",
          "sticky top-[var(--site-header-height)] self-start",
          "h-[calc(100vh-var(--site-header-height))] overflow-y-auto",
          "pr-8 pt-10 pb-8 border-r border-stone-200"
        )}
      >
        <nav className="flex flex-col space-y-0.5">{children}</nav>
      </aside>

      {/* Mobile sidebar - fixed overlay */}
      <aside
        className={cn(
          "fixed top-14 left-0 bottom-0 w-[280px] z-50",
          "bg-white shadow-2xl",
          "flex flex-col p-6 overflow-y-auto",
          "md:hidden",
          "transition-transform duration-300",
          !open && "-translate-x-full"
        )}
      >
        <div className="relative">
          {/* Corner accent */}
          <div className="absolute -top-2 -left-2 size-2 bg-stone-900" />

          {/* Navigation */}
          <nav className="flex flex-col space-y-0.5 pt-4">{children}</nav>
        </div>
      </aside>
    </>
  )
}

const linkVariants = cva(
  "group relative flex items-center gap-2 w-full py-2 px-3 font-mono text-xs transition-all duration-200 border-l-2 [&_svg]:size-4",
  {
    variants: {
      active: {
        true: "text-stone-900 font-medium bg-stone-100/50 border-stone-900",
        false:
          "text-stone-600 border-transparent hover:bg-stone-100 hover:text-stone-900",
      },
    },
  }
)

function SidebarItem({
  item,
  children,
}: {
  item: PageTree.Node
  children: ReactNode
}) {
  const pathname = usePathname()

  if (item.type === "page") {
    return (
      <Link
        href={item.url}
        className={linkVariants({
          active: pathname === item.url,
        })}
      >
        {item.icon}
        {item.name}

        {/* Hover accent */}
        <div className="absolute right-1 top-1 w-1 h-1 bg-stone-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </Link>
    )
  }

  if (item.type === "separator") {
    return (
      <div className="flex items-center gap-2 mt-6 mb-2 first:mt-0">
        <div className="h-px w-4 bg-stone-300" />
        <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
          {item.icon}
          {item.name}
        </p>
      </div>
    )
  }

  return (
    <div>
      {item.index ? (
        <Link
          className={linkVariants({
            active: pathname === item.index.url,
          })}
          href={item.index.url}
        >
          {item.index.icon}
          {item.index.name}

          {/* Hover accent */}
          <div className="absolute right-1 top-1 w-1 h-1 bg-stone-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </Link>
      ) : (
        <p className={cn(linkVariants({ active: false }), "text-start")}>
          {item.icon}
          {item.name}
        </p>
      )}
      <div className="pl-4 border-l border-stone-200 flex flex-col space-y-0.5">
        {children}
      </div>
    </div>
  )
}
