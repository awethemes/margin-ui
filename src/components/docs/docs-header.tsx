"use client"

import * as React from "react"
import { Menu, Github, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/default/ui/button"
import { useSidebar } from "@/registry/default/ui/sidebar"

export function DocsHeader() {
  const [scrolled, setScrolled] = React.useState(false)
  const { openMobile, setOpenMobile, isMobile } = useSidebar()

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-[var(--header-height)] items-center border-b bg-background/95 backdrop-blur-sm transition-all",
        scrolled ? "border-border" : "border-transparent"
      )}
    >
      <div className="container flex h-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpenMobile(!openMobile)}
            >
              {openMobile ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}

          <a href="/" className="flex items-center gap-2 group">
            <div className="size-3 bg-foreground group-hover:scale-110 transition-transform" />
            <span className="font-medium text-lg tracking-tight">
              margin<span className="font-light text-muted-foreground">.ui</span>
            </span>
          </a>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="/docs/introduction"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Docs
          </a>
          <a
            href="/docs/components/button"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Components
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/awethemes/margin-ui"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
