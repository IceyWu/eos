# @eosjs/components

> 🎨 轻量级 Web Components 组件库

[![npm version](https://img.shields.io/npm/v/@eosjs/components.svg)](https://www.npmjs.com/package/@eosjs/components)
[![npm downloads](https://img.shields.io/npm/dm/@eosjs/components.svg)](https://www.npmjs.com/package/@eosjs/components)
[![license](https://img.shields.io/npm/l/@eosjs/components.svg)](https://github.com/IceyWu/lume/blob/main/LICENSE)

基于原生 Web Components 技术构建的轻量级组件库，支持在任何框架中使用。

## ✨ 特性

- 🚀 **框架无关** - 可在 React、Vue、Angular、原生 HTML 等任何环境中使用
- 📦 **轻量小巧** - 零框架依赖，打包体积小
- 🎯 **开箱即用** - 简单导入即可使用
- 🌈 **TypeScript 支持** - 基于 Custom Elements Manifest 自动生成类型声明，覆盖 React、Vue、Solid、Preact 等主流框架

## 📦 安装

```bash
pnpm add @eosjs/components
```

## 🚀 快速开始

### 原生 HTML

```html
<script type="module">
  import { registerComponents } from "@eosjs/components";
  registerComponents();
</script>

<eos-button>点击我</eos-button>
<eos-image src="photo.jpg" placeholder="LKO2?U%2Tw=w]~RBVZRi" placeholder-type="blurhash" />
```

### React

```tsx
import { registerComponents } from "@eosjs/components";
registerComponents();

function App() {
  return (
    <eos-carousel autoplay loop interval="3000" indicator-style="tiktok">
      <eos-image src="1.jpg" placeholder="LEHV6nWB2y..." placeholder-type="blurhash" />
      <eos-image src="2.jpg" placeholder="LGF5]+Yk^6..." placeholder-type="blurhash" />
    </eos-carousel>
  );
}
```

### Vue

```vue
<script setup>
import { registerComponents } from "@eosjs/components";
registerComponents();
</script>

<template>
  <eos-carousel autoplay loop interval="3000">
    <eos-image src="1.jpg" placeholder="LEHV6nWB2y..." placeholder-type="blurhash" />
  </eos-carousel>
</template>
```

## 🔤 TypeScript 类型支持

组件库通过 [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest) 自动生成类型声明，支持所有主流框架的 JSX/模板类型检查。

### React / Preact

在 `tsconfig.json` 的 `include` 中添加类型文件：

```json
{
  "include": ["src", "node_modules/@eosjs/components/jsx-types.d.ts"]
}
```

> **注意**：React 会将 `onChange` 映射为原生 `change` 事件，导致 `e.detail` 丢失。监听 Web Components 的自定义事件请使用 `ref` + `addEventListener`：
>
> ```tsx
> const ref = useRef<HTMLElement>(null);
> useEffect(() => {
>   const el = ref.current;
>   const handler = (e: Event) => {
>     const { currentIndex } = (e as CustomEvent).detail;
>   };
>   el?.addEventListener("change", handler);
>   return () => el?.removeEventListener("change", handler);
> }, []);
> ```

### Vue

Vue 通过 `HTMLElementTagNameMap` 自动获得类型支持，无需额外配置。在 `vite.config.ts` 中将 `eos-` 前缀标记为自定义元素：

```ts
vue({
  template: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("eos-"),
    },
  },
})
```

### Angular

Angular 在模块中添加 `CUSTOM_ELEMENTS_SCHEMA`：

```ts
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
```

## 📚 组件

### eos-button

按钮组件。

```html
<eos-button>点击我</eos-button>
```

### eos-carousel

轮播图组件，支持自动播放、触摸滑动、虚拟化渲染。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `autoplay` | `boolean` | `false` | 是否自动播放 |
| `interval` | `string` | `"2000"` | 自动播放间隔（ms），最小 1000 |
| `loop` | `boolean` | `false` | 是否循环播放 |
| `show-navigation` | `string` | `"true"` | 是否显示导航按钮 |
| `initial-index` | `string` | `"0"` | 初始 slide 索引 |
| `indicator-position` | `string` | `"bottom"` | 指示器位置：top / bottom / left / right |
| `indicator-style` | `string` | `"default"` | 指示器样式：default / dots / tiktok |
| `virtual-threshold` | `string` | `"8"` | 超过此数量自动开启虚拟渲染 |

| 事件 | 说明 |
|------|------|
| `change` | 切换时触发，`detail: { currentIndex, previousIndex }` |
| `slide-active` | 当前 slide 激活时触发 |
| `slide-click` | 点击 slide 时触发 |

| 方法 | 说明 |
|------|------|
| `prev()` | 上一张 |
| `next()` | 下一张 |
| `goTo(index)` | 跳转到指定索引 |
| `play()` | 开始自动播放 |
| `pause()` | 暂停自动播放 |

### eos-image

图片组件，支持懒加载、BlurHash 占位、加载进度。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `src` | `string` | - | 图片地址 |
| `src-type` | `string` | `"url"` | src 类型：url / blurhash |
| `alt` | `string` | - | 替代文本 |
| `width` | `string` | - | 宽度 |
| `height` | `string` | - | 高度 |
| `loading` | `string` | `"lazy"` | 加载策略：lazy / eager |
| `object-fit` | `string` | `"cover"` | 填充模式 |
| `placeholder` | `string` | - | 占位内容（URL 或 blurhash 字符串） |
| `placeholder-type` | `string` | `"url"` | 占位类型：url / blurhash |
| `placeholder-fill` | `boolean` | `false` | 占位图是否始终作为背景 |
| `show-delay` | `string` | `"0"` | 图片显示延迟（ms） |

| 事件 | 说明 |
|------|------|
| `imageLoad` | 加载成功 |
| `imageError` | 加载失败 |
| `imageProgress` | 加载进度，`detail: { loaded, total, src }` |

## 🛠 开发

```bash
# 安装依赖
pnpm install

# 开发（组件源码修改即时生效）
pnpm dev:react   # React playground :3003
pnpm dev:vue     # Vue playground :3002
pnpm dev:html    # HTML playground :3001
pnpm dev:angular # Angular playground :3004

# 构建（含类型生成）
pnpm build

# 单独生成类型
pnpm --filter @eosjs/components analyze
```

## 📄 License

MIT © [IceyWu](https://github.com/IceyWu)
