import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import mdx from "fumadocs-mdx/vite"
import { nitro } from "nitro/vite"
import { defineConfig } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    mdx(await import("./source.config")),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      // Prerendering disabled - using Nitro for SSR instead
      prerender: {
        enabled: false,
      },
      router: {
        quoteStyle: "double",
      },
    }),
    tailwindcss(),
    react(),
    // see https://tanstack.com/start/latest/docs/framework/react/guide/hosting for hosting config
    // we configured nitro by default
    nitro(),
  ],
})
