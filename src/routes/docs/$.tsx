import { createFileRoute, notFound } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { findNeighbour, type Item, type Root } from "fumadocs-core/page-tree"
import { useFumadocsLoader } from "fumadocs-core/source/client"
import browserCollections from "fumadocs-mdx:collections/browser"
import * as React from "react"
import { getMDXComponents } from "@/components/mdx-components"
import { source } from "@/lib/source"
import { DocsLayout, DocsPage } from "@/components/docs"

interface NeighbourData {
  url: string
  name: string
}

const NeighboursContext = React.createContext<{
  previous?: NeighbourData
  next?: NeighbourData
}>({})

export const Route = createFileRoute("/docs/$")({
  component: Page,
  loader: async ({ params }) => {
    const slugs = params._splat?.split("/") ?? []
    const result = await serverLoader({ data: slugs })
    await clientLoader.preload(result.path)
    return result
  },
})

const serverLoader = createServerFn({ method: "GET" })
  .inputValidator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs)
    if (!page) throw notFound()

    const pageTree = source.getPageTree()
    const neighbours = findNeighbour(pageTree, page.url)

    const serializeNeighbour = (item?: Item): NeighbourData | undefined => {
      if (!item) return undefined
      return {
        url: item.url,
        name: typeof item.name === "string" ? item.name : String(item.name),
      }
    }

    return {
      path: page.path,
      pageTree: await source.serializePageTree(pageTree),
      neighbours: {
        previous: serializeNeighbour(neighbours.previous),
        next: serializeNeighbour(neighbours.next),
      },
    }
  })

const mdxComponents = getMDXComponents()

const clientLoader = browserCollections.docs.createClientLoader({
  component({ toc, frontmatter, default: MDX }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const neighbours = React.useContext(NeighboursContext)
    return (
      <DocsPage
        toc={toc}
        title={frontmatter.title}
        description={frontmatter.description}
        neighbours={neighbours}
      >
        <MDX components={mdxComponents} />
      </DocsPage>
    )
  },
})

function Page() {
  const loaderData = Route.useLoaderData()

  // Handle case where loaderData might be undefined
  if (!loaderData) {
    return null
  }

  const { pageTree } = useFumadocsLoader({ pageTree: loaderData.pageTree })
  const Content = clientLoader.getComponent(loaderData.path)

  return (
    <DocsLayout tree={pageTree as Root}>
      <NeighboursContext.Provider value={loaderData.neighbours}>
        <Content />
      </NeighboursContext.Provider>
    </DocsLayout>
  )
}
