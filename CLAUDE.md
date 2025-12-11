# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Margin-UI** is a 100% open-source UI component library similar to shadcn/ui, but built on top of [Base UI](https://base-ui.com/) instead of Radix UI. Components are designed to be copied and pasted into projects rather than installed as npm packages, giving developers full ownership and control over their code.

**Important**: Both Margin-UI and Base UI are in early development/beta, so breaking changes may occur as both projects evolve.

## Architecture

### Component Hierarchy

The project follows a layered architecture:

1. **Primitives** (`src/registry/default/ui/*.tsx`) - Unstyled, accessible building blocks powered by Base UI. These handle accessibility, focus management, and keyboard interactions without imposing design.

2. **Particles** - Pre-assembled components that combine multiple primitives into ready-to-use solutions (e.g., authentication forms, tables, date pickers). More opinionated in design but still customizable.

3. **Atoms** - API-enhanced Particles that integrate with external data and services, providing out-of-the-box behaviors for common patterns.

### Registry System

The project uses a **shadcn-compatible registry system** to enable CLI-based component installation:

- **Registry definitions**: `src/registry/registry.*.ts` files define all available components with their dependencies, files, and metadata
- **Registry build script**: `scripts/build-registry.mts` generates:
  - `src/registry/__index__.tsx` - Dynamic component index with lazy loading
  - `registry.json` - Component metadata for CLI consumption
  - `public/r/` - Built registry files for public access
- **Registry structure**: Each component is registered with:
  - `name`: Component identifier
  - `type`: `registry:ui`, `registry:lib`, `registry:hook`, or `registry:style`
  - `files`: Array of source files with path and type
  - `dependencies`: npm packages required
  - `registryDependencies`: Other registry components needed
  - `cssVars`: Optional CSS variable definitions

### Tech Stack

- **Framework**: React 19 with TanStack Start (file-based routing)
- **Build**: Vite 7 with Nitro for SSR
- **Styling**: Tailwind CSS v4 with design tokens via CSS variables
- **Documentation**: Fumadocs (MDX-based) with syntax highlighting
- **Component Base**: @base-ui-components/react v1.0.0-rc.0
- **Utilities**:
  - `clsx` + `tailwind-merge` via `cn()` helper in `src/registry/default/lib/utils.ts`
  - `class-variance-authority` for variant-based styling
  - `@radix-ui/react-slot` for polymorphic components

### Design System

Components use a CSS variable system compatible with shadcn/ui, with additional tokens:
- `--destructive-foreground`
- `--info` / `--info-foreground`
- `--success` / `--success-foreground`
- `--warning` / `--warning-foreground`

The default font is Geist Mono, defined in `src/styles/app.css`.

### Documentation Structure

- **Content**: MDX files in `content/docs/` with fumadocs processing
- **Components**: Component-specific docs in `content/docs/components/`
- **Routing**: File-based routing via TanStack Start in `src/routes/`
- **Syntax highlighting**: Shiki with custom transformers in `src/lib/highlight-code.ts`
- **AI-friendly**: Includes `/ui/llms.txt` for LLM consumption

## Common Commands

### Development
```bash
pnpm dev              # Start dev server on port 4000
pnpm build            # Build for production
pnpm start            # Start production server
```

### Type Checking
```bash
pnpm types:check      # Run fumadocs-mdx and TypeScript type checking
```

### Linting
```bash
pnpm lint             # Run oxlint
```

### Registry Management
```bash
pnpm registry:build                # Build registry index and JSON files
pnpm registry:validate-deps        # Validate registry dependencies
```

The registry build script must be run after:
- Adding new components to `src/registry/registry.*.ts`
- Modifying component files or dependencies
- Changing registry metadata

### Installation
```bash
pnpm install          # Install dependencies (runs fumadocs-mdx postinstall)
```

## Working with Components

### Adding a New UI Component

1. Create component file in `src/registry/default/ui/[name].tsx`
2. Add entry to `src/registry/registry.ui.ts`:
   ```ts
   {
     name: "component-name",
     type: "registry:ui",
     dependencies: ["@base-ui-components/react"],
     registryDependencies: ["@margin-ui/other-component"], // if needed
     files: [
       {
         path: "ui/component-name.tsx",
         type: "registry:ui",
       },
     ],
   }
   ```
3. Run `pnpm registry:build` to generate registry files
4. Create documentation in `content/docs/components/[name].mdx`

### Component Patterns

- Use `"use client"` directive for interactive components
- Export both the component and any variant functions (e.g., `buttonVariants`)
- Use `cn()` utility from `@/lib/utils` for className merging
- Include `data-slot` attributes for component identification
- Support `asChild` prop via `@radix-ui/react-slot` when appropriate
- Follow Base UI patterns for accessibility and state management

### Path Aliases

- `@/*` maps to `src/*`
- `fumadocs-mdx:collections/*` maps to `.source/*`

## Migration from Radix UI

When converting shadcn/ui components to Base UI equivalents:
- Many Base UI components have similar APIs to Radix but different import paths
- Base UI components are typically more low-level and unstyled
- Check component documentation for Radix comparison examples
- Update import statements from `@radix-ui/react-*` to `@base-ui-components/react`

## Building for Production

The project uses:
- **Vite** for bundling
- **Nitro** for SSR output (configured in vite.config.ts)
- **TanStack Start** with prerendering enabled
- Port 3000 for dev server (overridden by package.json script to port 4000)

## Notes for AI/LLM Development

Components are intentionally written to be:
- Clear and readable for both humans and language models
- Predictable in structure and naming
- Well-documented with inline comments where needed
- Consistent in patterns across the codebase

The registry system enables programmatic discovery and installation of components, making it easy for AI to understand available components and their relationships.
