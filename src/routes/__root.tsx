import * as React from "react"
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router"
import { RootProvider } from "fumadocs-ui/provider/tanstack"
import appCss from "@/styles/app.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title:
          "Margin-UI - base-ui based, high quality UI components for React",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans font-light flex flex-col min-h-screen bg-white text-stone-900 selection:bg-stone-900 selection:text-white">
        <RootProvider>{children}</RootProvider>
        <Scripts />
      </body>
    </html>
  )
}
