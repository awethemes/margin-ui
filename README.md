# Margin-UI

A modern, open-source UI component library built on [Base UI](https://base-ui.com/). Built for developers and AI.

**Margin-UI** is a collection of beautifully designed, accessible, and composable components for React apps. Styled with [Tailwind CSS v4](https://tailwindcss.com/), it's designed for you to copy, paste, and own.

## Why Margin-UI?

- **Built on Base UI**: Powerful, unstyled primitives with robust accessibility
- **Copy & Paste**: Own your code - no package dependencies
- **shadcn/ui Compatible**: Similar CLI and workflow, but with Base UI instead of Radix
- **AI-Friendly**: Documentation and code structure optimized for LLMs

> **Note**: Margin-UI is in early development. Both this library and Base UI are evolving, so expect breaking changes.

## Quick Start

### Prerequisites

- React 18+ project
- Tailwind CSS v4

### Install All Components

```bash
# Install all UI components
npx shadcn@latest add @margin-ui/ui

# Recommended: with optimized color tokens
npx shadcn@latest add @margin-ui/ui @margin-ui/colors-zinc
```

### Install Individual Components

Each component page provides a command to add it individually:

```bash
npx shadcn@latest add @margin-ui/button
npx shadcn@latest add @margin-ui/dialog
npx shadcn@latest add @margin-ui/accordion
```

### Manual Installation

1. Find a component on the [documentation site](https://margin-ui.com)
2. Copy the code from the **Code** tab
3. Create a file in your project (e.g., `components/ui/button.tsx`)
4. Paste the code and install listed dependencies
5. Import and use in your app

## Development

```bash
# Install dependencies
pnpm install

# Start dev server (runs on port 4000)
pnpm dev

# Type check
pnpm types:check

# Lint
pnpm lint

# Build for production
pnpm build

# Build registry (after adding/modifying components)
pnpm registry:build
```

## Project Structure

```
margin-ui/
├── src/
│   ├── registry/          # Component registry
│   │   ├── default/
│   │   │   ├── ui/        # UI components
│   │   │   ├── lib/       # Utilities
│   │   │   └── examples/  # Component examples
│   │   ├── registry.ts    # Registry index
│   │   ├── registry.ui.ts # UI component definitions
│   │   └── __index__.tsx  # Generated registry index
│   ├── routes/            # TanStack Start routes
│   ├── components/        # Documentation components
│   └── lib/               # Shared utilities
├── content/
│   └── docs/              # MDX documentation
├── scripts/
│   └── build-registry.mts # Registry build script
└── public/
    └── r/                 # Published registry files
```

## Architecture

### Component Layers

1. **Primitives** - Low-level, unstyled Base UI components with full accessibility
2. **Particles** - Pre-assembled components combining multiple primitives
3. **Atoms** - API-enhanced particles with backend integration

### Registry System

Components are registered in `src/registry/registry.*.ts` files with:
- Dependencies (npm packages)
- Registry dependencies (other components)
- File paths and types
- CSS variable definitions

Run `pnpm registry:build` after changes to generate:
- `src/registry/__index__.tsx` - Component index
- `registry.json` - Metadata for CLI
- `public/r/` - Published registry

## Tech Stack

- **Framework**: React 19 + TanStack Start
- **Styling**: Tailwind CSS v4
- **Components**: @base-ui-components/react
- **Documentation**: Fumadocs (MDX)
- **Build**: Vite 7 + Nitro
- **Package Manager**: pnpm 10

## Contributing

We welcome contributions! Whether it's:
- Bug reports
- New components
- Documentation improvements
- Feature requests

Check our [contribution guidelines](https://github.com/awethemes/margin-ui) to get started.

## Migration from Radix UI

Coming from shadcn/ui or another Radix-based library? Many components include migration guides and API comparisons to help you transition smoothly.

## License

Open source under the MIT license. See LICENSE for details.

## Links

- [Documentation](https://margin-ui.com)
- [GitHub](https://github.com/awethemes/margin-ui)
- [Base UI](https://base-ui.com)

---

Built with ❤️ by the community
