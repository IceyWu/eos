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
    import { registerComponents } from '@eosjs/components';
    registerComponents();
  </script>
</head>
<body>
  <e-button>点击我</e-button>
</body>
</html>
```

### React

```jsx
import { useEffect } from 'react';
import { registerComponents } from '@eosjs/components';

// 在应用入口注册一次
registerComponents();

function App() {
  return <e-button>点击我</e-button>;
}
```

### Vue

```vue
<script setup>
import { registerComponents } from '@eosjs/components';

// 在应用入口注册一次
registerComponents();
</script>

<template>
  <e-button>点击我</e-button>
</template>
```

## 📚 组件列表

- **Button** (`e-button`) - 按钮组件
- **Carousel** (`e-carousel`) - 类似抖音 Web 版风格的轮播图组件，支持自动播放、手动导航、触摸滑动等功能
- _更多组件开发中..._

## 📖 文档

访问 [完整文档](https://github.com/IceyWu/lume) 查看更多示例和 API 说明。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT © [IceyWu](https://github.com/IceyWu)
