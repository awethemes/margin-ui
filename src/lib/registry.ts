import { lazy, type ComponentType } from "react"

const componentModules = import.meta.glob<{ default: ComponentType }>(
  "../registry/default/examples/**/*.tsx",
  { eager: true }
)

const sourceModules = import.meta.glob<string>(
  "../registry/default/examples/**/*.tsx",
  {
    query: "?raw",
    import: "default",
    eager: true,
  }
)

const normalizeName = (path: string) =>
  path.replace("../registry/default/examples/", "").replace(".tsx", "")

export const components: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(componentModules).map(([path, module]) => [
    normalizeName(path),
    module.default,
  ])
)

export const componentSources: Record<string, string> = Object.fromEntries(
  Object.entries(sourceModules).map(([path, source]) => [
    normalizeName(path),
    source,
  ])
)

export function getComponent(name: string) {
  return components[name] || null
}

export function getComponentSource(name: string): string | null {
  return componentSources[name] ? fixImport(componentSources[name]) : null
}

export function fixImport(content: string) {
  const regex = /@\/(.+?)\/((?:.*?\/)?(?:components|ui|hooks|lib))\/([\w-]+)/g

  const replacement = (
    match: string,
    _path: string,
    type: string,
    component: string
  ) => {
    if (type.endsWith("components")) {
      return `@/components/${component}`
    }
    if (type.endsWith("ui")) {
      return `@/components/ui/${component}`
    }
    if (type.endsWith("hooks")) {
      return `@/hooks/${component}`
    }
    if (type.endsWith("lib")) {
      return `@/lib/${component}`
    }

    return match
  }

  return content.replace(regex, replacement)
}

export type FileTree = {
  name: string
  path?: string
  children?: FileTree[]
}

export function createFileTreeForRegistryItemFiles(
  files: Array<{ path: string; target?: string }>
) {
  const root: FileTree[] = []

  for (const file of files) {
    const path = file.target ?? file.path
    const parts = path.split("/")
    let currentLevel = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isFile = i === parts.length - 1
      const existingNode = currentLevel.find((node) => node.name === part)

      if (existingNode) {
        if (isFile) {
          // Update existing file node with full path
          existingNode.path = path
        } else if (existingNode.children) {
          // Move to next level in the tree
          currentLevel = existingNode.children
        }
      } else if (part) {
        const newNode: FileTree = isFile
          ? { name: part, path }
          : { children: [], name: part }

        currentLevel.push(newNode)

        if (!isFile && newNode.children) {
          currentLevel = newNode.children
        }
      }
    }
  }

  return root
}
