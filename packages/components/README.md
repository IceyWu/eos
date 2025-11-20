# @eosjs/components

> 🎨 轻量级 Web Components 组件库

[![npm version](https://img.shields.io/npm/v/@eosjs/components.svg)](https://www.npmjs.com/package/@eosjs/components)
[![npm downloads](https://img.shields.io/npm/dm/@eosjs/components.svg)](https://www.npmjs.com/package/@eosjs/components)
[![license](https://img.shields.io/npm/l/@eosjs/components.svg)](https://github.com/IceyWu/lume/blob/main/LICENSE)

基于原生 Web Components 技术构建的轻量级组件库，支持在任何框架中使用。

## ✨ 特性

- 🚀 **框架无关** - 可在 React、Vue、原生 HTML 等任何环境中使用
- 📦 **轻量小巧** - 零依赖，打包体积小
- 🎯 **开箱即用** - 简单导入即可使用
- 🌈 **TypeScript 支持** - 完整的类型定义

## 📦 安装

```bash
npm install @eosjs/components
```

```bash
yarn add @eosjs/components
```

```bash
pnpm add @eosjs/components
```

## 🚀 快速开始

### 原生 HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import { registerComponents } from "@eosjs/components";
      registerComponents();
    </script>
  </head>
  <body>
    <eos-button>点击我</eos-button>
  </body>
</html>
```

### React

```jsx
import { useEffect } from "react";
import { registerComponents } from "@eosjs/components";

// 在应用入口注册一次
registerComponents();

function App() {
  return <eos-button>点击我</eos-button>;
}
```

### Vue

```vue
<script setup>
import { registerComponents } from "@eosjs/components";

// 在应用入口注册一次
registerComponents();
</script>

<template>
  <eos-button>点击我</eos-button>
</template>
```

## 📚 组件列表

- **Button** (`eos-button`) - 按钮组件
- **Carousel** (`eos-carousel`) - 类似抖音 Web 版风格的轮播图组件，支持自动播放、手动导航、触摸滑动等功能
- **Image** (`eos-image`) - 功能强大的图片组件，支持懒加载、BlurHash 占位符、多种加载策略等
- _更多组件开发中..._

## 📖 文档

访问 [完整文档](https://github.com/IceyWu/lume) 查看更多示例和 API 说明。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT © [IceyWu](https://github.com/IceyWu)
