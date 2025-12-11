import type { Registry } from "shadcn/schema"
import { hooks } from "./registry.hooks"
import { lib } from "./registry.lib"
import { styles } from "./registry.styles"
import { ui } from "./registry.ui"

export const registry = {
  name: "margin-ui",
  homepage: "https://margin-ui.com/",
  items: [...ui, ...styles, ...lib, ...hooks],
} satisfies Registry
