<p align="center">
  <img src="./assets/eos-logo.svg" width="144" alt="EOS UI 徽标" />
</p>

<h1 align="center">EOS UI</h1>

<p align="center">
  面向多框架的 Web Components 组件库。<br />
  同一套组件模型，同时适用于 HTML、React、Vue 和 Angular。
</p>

<p align="center">
  <a href="./README.md">English</a> · 简体中文
</p>

<p align="center">
  <a href="https://github.com/IceyWu/eos"><img src="https://img.shields.io/badge/Web%20Components-Custom%20Elements-111827" alt="Web Components" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-6.0-3178C6" alt="TypeScript" /></a>
  <a href="https://pnpm.io/workspaces"><img src="https://img.shields.io/badge/pnpm-workspace-F69220" alt="pnpm workspace" /></a>
  <a href="https://github.com/IceyWu/eos"><img src="https://img.shields.io/badge/license-MIT-111827" alt="MIT 许可证" /></a>
</p>

EOS UI 基于浏览器原生 Web Components 技术构建。组件以自定义元素的形式提供，因此同一套 API 既可以用于原生 HTML 页面，也可以直接用于 React、Vue 和 Angular 应用。

## 特性

- 面向 HTML、React、Vue 和 Angular 的框架无关自定义元素。
- 使用 Shadow DOM 封装组件样式。
- 提供 TypeScript 类型声明，并生成 Custom Elements Manifest 元数据。
- 支持通过 `registerComponents()` 显式注册，也支持浏览器环境安全自动注册。
- 图片组件支持懒加载、立即加载、加载进度和 BlurHash 占位图。
- 使用 pnpm workspace 管理组件包、文档站点和多框架 playground。

## 安装

```bash
pnpm add @eosjs/ui
```

如果当前还在仓库内开发、尚未发布 npm 包，请先安装 workspace 依赖，再通过 playground 或文档应用使用本地组件包：

```bash
pnpm install
```

## 快速开始

在应用入口导入组件包，并注册一次自定义元素：

```ts
import { registerComponents } from "@eosjs/ui";

registerComponents();
```

之后即可直接使用自定义元素：

```html
<eos-button>点击我</eos-button>

<eos-carousel autoplay loop interval="3000">
  <eos-image
    src="/images/one.jpg"
    alt="第一张图片"
    loading="eager"
  ></eos-image>
  <eos-image
    src="/images/two.jpg"
    alt="第二张图片"
    placeholder="LEHV6nWB2y..."
    placeholder-type="blurhash"
  ></eos-image>
</eos-carousel>
```

组件包同时导出组件类、`COMPONENT_CONFIG`、`registerComponents()` 和 `registerComponent()`，可用于更复杂的集成场景。

## 框架支持

### React

```tsx
import "@eosjs/ui";

export function App() {
  return <eos-button>点击我</eos-button>;
}
```

如果编辑器需要 JSX 自定义元素类型，请把 `node_modules/@eosjs/ui/jsx-types.d.ts` 加入 `tsconfig.json` 的 `include` 配置。

### Vue

```vue
<script setup lang="ts">
import "@eosjs/ui";
</script>

<template>
  <eos-button>点击我</eos-button>
</template>
```

请在 Vue 编译器中将 `eos-` 开头的标签配置为自定义元素。

### Angular

```ts
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: "app-root",
  template: "<eos-button>点击我</eos-button>",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {}
```

### 原生 HTML

```html
<script type="module">
  import { registerComponents } from "@eosjs/ui";
  registerComponents();
</script>

<eos-button>点击我</eos-button>
```

## 组件

| 元素 | 用途 |
| --- | --- |
| `eos-button` | 支持加载中和禁用状态的可配置按钮。 |
| `eos-carousel` | 支持自动播放、导航、触摸手势、指示器和虚拟化渲染的响应式轮播图。 |
| `eos-image` | 支持懒加载、加载进度和 BlurHash 占位图的图片元素。 |
| `eos-progress-bar` | 独立进度指示器，也可作为 `eos-carousel` 的进度层。 |
| `eos-scrollbar` | 支持横向、纵向和自动隐藏的可定制滚动条。 |

API 细节、属性、事件、方法和各框架类型配置请查看[组件包 README](./packages/ui/README.md)。

## 项目结构

```text
eos/
├── packages/
│   ├── components/          # @eosjs/ui
│   └── utils/               # 共用工具
├── docs/                    # Storybook 文档站点
├── playground/
│   ├── html/                # 原生 HTML playground
│   ├── vue/                 # Vue 3 playground
│   ├── react/               # React playground
│   └── angular/             # Angular playground
├── assets/                  # 仓库品牌素材
└── pnpm-workspace.yaml
```

## 开发

```bash
pnpm install
```

启动文档站点或各框架 playground：

```bash
pnpm dev:docs       # 文档开发服务器
pnpm dev:html       # http://localhost:3001
pnpm dev:vue        # http://localhost:3002
pnpm dev:react      # http://localhost:3003
pnpm dev:angular    # http://localhost:3004
```

常用包命令：

```bash
pnpm build:ui
pnpm build:docs
pnpm lint
```

## 许可证

MIT
