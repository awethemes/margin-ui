"use client"

import * as React from "react"
import { useRouterState } from "@tanstack/react-router"
import type { Root, Node, Item, Folder } from "fumadocs-core/page-tree"
import { Badge } from "@/registry/default/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/registry/default/ui/sidebar"

const PAGES_NEW: string[] = []

export function DocsSidebar({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: Root }) {
  const routerState = useRouterState()
  const pathname = routerState.location.pathname

  return (
    <Sidebar
      className="sticky top-[var(--header-height)] z-30 hidden h-[calc(100svh-var(--header-height))] bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar px-4 py-2">
        <div className="h-[var(--top-spacing)] shrink-0" />
        {tree.children.map((item: Node) => (
          <SidebarGroup className="gap-1" key={item.$id}>
            {"name" in item && (
              <SidebarGroupLabel className="h-7 px-0 text-sidebar-accent-foreground">
                {item.name as React.ReactNode}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              {item.type === "folder" && (
                <SidebarMenu className="gap-0.5">
                  {(item as Folder).children.map((child: Node) => {
                    if (child.type !== "page") return null
                    const pageItem = child as Item
                    const isActive = pageItem.url === pathname
                    return (
                      <SidebarMenuItem key={pageItem.url}>
                        <SidebarMenuButton
                          className="ps-3.5 hover:bg-transparent active:bg-transparent"
                          isActive={isActive}
                          asChild
                        >
                          <a href={pageItem.url}>
                            {pageItem.name as React.ReactNode}
                            {PAGES_NEW.length > 0 &&
                              PAGES_NEW.includes(pageItem.url) && (
                                <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0">
                                  New
                                </Badge>
                              )}
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              )}
              {item.type === "page" && (
                <SidebarMenu className="gap-0.5">
                  <SidebarMenuItem key={(item as Item).url}>
                    <SidebarMenuButton
                      className="ps-3.5 hover:bg-transparent active:bg-transparent"
                      isActive={(item as Item).url === pathname}
                      asChild
                    >
                      <a href={(item as Item).url}>
                        {(item as Item).name as React.ReactNode}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
