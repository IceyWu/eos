<p align="center">
  <img src="./assets/eos-logo.svg" width="144" alt="EOS UI logo" />
</p>

<h1 align="center">EOS UI</h1>

<p align="center">
  Framework-agnostic Web Components for building consistent interfaces.<br />
  One component model that works across HTML, React, Vue, and Angular.
</p>

<p align="center">
  <a href="./README.zh-CN.md">简体中文</a> · English
</p>

<p align="center">
  <a href="https://github.com/IceyWu/eos"><img src="https://img.shields.io/badge/Web%20Components-Custom%20Elements-111827" alt="Web Components" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-6.0-3178C6" alt="TypeScript" /></a>
  <a href="https://pnpm.io/workspaces"><img src="https://img.shields.io/badge/pnpm-workspace-F69220" alt="pnpm workspace" /></a>
  <a href="https://github.com/IceyWu/eos"><img src="https://img.shields.io/badge/license-MIT-111827" alt="MIT license" /></a>
</p>

EOS UI is a lightweight component library built on the browser's native Web Components platform. Components are distributed as custom elements, so the same API can be used in a plain HTML page or inside a framework application.

## Features

- Framework-agnostic custom elements for HTML, React, Vue, and Angular.
- Shadow DOM encapsulation for component styles.
- TypeScript declarations and generated Custom Elements Manifest metadata.
- Explicit registration with `registerComponents()` and safe browser-side auto-registration.
- Image loading primitives with lazy loading, eager loading, progress, and BlurHash placeholders.
- A pnpm workspace containing the component package, documentation, and framework playgrounds.

## Installation

```bash
pnpm add @eosjs/ui
```

If you are working from this repository before a package release, install the workspace dependencies first and use the local package through the playgrounds or documentation app:

```bash
pnpm install
```

## Quick start

Import the package and register the elements once in your application entry point:

```ts
import { registerComponents } from "@eosjs/ui";

registerComponents();
```

Then use the custom elements directly:

```html
<eos-button>Click me</eos-button>

<eos-carousel autoplay loop interval="3000">
  <eos-image
    src="/images/one.jpg"
    alt="First image"
    loading="eager"
  ></eos-image>
  <eos-image
    src="/images/two.jpg"
    alt="Second image"
    placeholder="LEHV6nWB2y..."
    placeholder-type="blurhash"
  ></eos-image>
</eos-carousel>
```

The package also exports the component classes, `COMPONENT_CONFIG`, `registerComponents()`, and `registerComponent()` for advanced integrations.

## Frameworks

### React

```tsx
import "@eosjs/ui";

export function App() {
  return <eos-button>Click me</eos-button>;
}
```

Add `node_modules/@eosjs/ui/jsx-types.d.ts` to your `tsconfig.json` `include` list when your editor needs custom-element JSX types.

### Vue

```vue
<script setup lang="ts">
import "@eosjs/ui";
</script>

<template>
  <eos-button>Click me</eos-button>
</template>
```

Configure your Vue compiler to treat tags beginning with `eos-` as custom elements.

### Angular

```ts
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: "app-root",
  template: "<eos-button>Click me</eos-button>",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {}
```

### Plain HTML

```html
<script type="module">
  import { registerComponents } from "@eosjs/ui";
  registerComponents();
</script>

<eos-button>Click me</eos-button>
```

## Components

| Element | Purpose |
| --- | --- |
| `eos-button` | A configurable button with loading and disabled states. |
| `eos-carousel` | A responsive carousel with autoplay, navigation, touch gestures, indicators, and virtualized rendering. |
| `eos-image` | An image element with lazy loading, loading progress, and BlurHash placeholders. |
| `eos-progress-bar` | A standalone progress indicator or the progress layer used by `eos-carousel`. |
| `eos-scrollbar` | A customizable scrollbar for horizontal, vertical, and auto-hide scrolling. |

See the [component package README](./packages/ui/README.md) for API details, attributes, events, methods, and framework type configuration.

## Repository layout

```text
eos/
├── packages/
│   ├── components/          # @eosjs/ui
│   └── utils/               # Shared utilities
├── docs/                    # Storybook documentation
├── playground/
│   ├── html/                # Native HTML playground
│   ├── vue/                 # Vue 3 playground
│   ├── react/               # React playground
│   └── angular/             # Angular playground
├── assets/                  # Repository branding assets
└── pnpm-workspace.yaml
```

## Development

```bash
pnpm install
```

Start the documentation site or a framework playground:

```bash
pnpm dev:docs       # documentation dev server
pnpm dev:html       # http://localhost:3001
pnpm dev:vue        # http://localhost:3002
pnpm dev:react      # http://localhost:3003
pnpm dev:angular    # http://localhost:3004
```

Useful package commands:

```bash
pnpm build:ui
pnpm build:docs
pnpm lint
```

## License

MIT
