"use client"

import * as React from "react"
import type { Root } from "fumadocs-core/page-tree"
import { DocsSidebar } from "./docs-sidebar"
import { DocsHeader } from "./docs-header"
import { Ruler } from "@/components/ruler"
import { SidebarProvider } from "@/registry/default/ui/sidebar"

interface DocsLayoutProps {
  tree: Root
  children: React.ReactNode
}

export function DocsLayout({ tree, children }: DocsLayoutProps) {
  return (
    <SidebarProvider
      className="flex min-h-screen flex-col [--header-height:3.5rem] [--sidebar-width:220px] [--top-spacing:0] lg:[--sidebar-width:240px] lg:[--top-spacing:1rem]"
      style={
        {
          "--sidebar-width": "var(--sidebar-width)",
        } as React.CSSProperties
      }
    >
      <DocsHeader />
      <div className="relative flex flex-1">
        {/* Left Ruler */}
        <Ruler
          orientation="vertical"
          className="fixed left-0 top-[var(--header-height)] z-40 hidden h-[calc(100vh-var(--header-height))] lg:flex"
        />

        <div className="container flex-1 items-start px-0 lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:pl-5">
          <DocsSidebar tree={tree} />
          <main className="relative min-h-[calc(100vh-var(--header-height))] w-full">
            {children}
          </main>
        </div>

        {/* Right Ruler */}
        <Ruler
          orientation="vertical"
          className="fixed right-0 top-[var(--header-height)] z-40 hidden h-[calc(100vh-var(--header-height))] lg:flex"
        />
      </div>
    </SidebarProvider>
  )
}
