# Eos

基于 Web Components 技术栈的跨框架组件库，使用 pnpm monorepo 结构管理。

## 特性

- ✅ **跨框架兼容**: 支持在 React、Vue、Angular 等任何前端框架中使用
- ✅ **原生支持**: 基于浏览器原生 Web Components API
- ✅ **零依赖**: 无需额外的运行时库
- ✅ **样式隔离**: 使用 Shadow DOM 实现样式封装
- ✅ **TypeScript**: 完整的类型支持
- ✅ **可配置前缀**: 组件前缀可配置，默认为 `l-`

## 项目结构

```
eos/
├── packages/
│   └── components/          # 组件库核心包 (@eosjs/components)
│       ├── src/
│       │   ├── components/
│       │   │   └── button/
│       │   ├── config.ts    # 组件配置（前缀等）
│       │   └── index.ts
│       └── package.json
├── docs/                    # 文档站点
├── playground/              # 演示环境
│   ├── html/               # 原生 HTML 演示
│   ├── vue/                # Vue 3 + TypeScript 演示
│   └── react/              # React + TypeScript 演示
├── package.json
└── pnpm-workspace.yaml
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 构建组件库

```bash
# 构建组件库
pnpm build

# 或者开发模式（watch）
pnpm dev
```

### 运行演示

```bash
# 运行文档站点 (http://localhost:3000)
pnpm dev:docs

# 运行 HTML 演示 (http://localhost:3001)
pnpm dev:html

# 运行 Vue 演示 (http://localhost:3002)
pnpm dev:vue

# 运行 React 演示 (http://localhost:3003)
pnpm dev:react

# 注意：首次运行前需要先构建组件库
pnpm build
```

## 使用示例

### 原生 HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>Eos Demo</title>
</head>
<body>
  <e-button>Click me</e-button>

  <script type="module">
    import { registerComponents } from '@eosjs/components';
    registerComponents();

    document.querySelector('e-button').addEventListener('e-click', (e) => {
      console.log(e.detail.message);
    });
  </script>
</body>
</html>
```

### Vue 3 + TypeScript

```vue
<template>
  <e-button @e-click="handleClick">Click me</e-button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { registerComponents } from '@eosjs/components';

onMounted(() => {
  registerComponents();
});

const handleClick = (e: CustomEvent) => {
  console.log(e.detail.message);
};
</script>
```

### React + TypeScript

```tsx
import { useEffect, useRef } from 'react';
import { registerComponents } from '@eosjs/components';

// 声明自定义元素类型
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'e-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

function App() {
  const buttonRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerComponents();
    
    const handleClick = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log(customEvent.detail.message);
    };
    
    buttonRef.current?.addEventListener('e-click', handleClick);
    return () => {
      buttonRef.current?.removeEventListener('e-click', handleClick);
    };
  }, []);

  return <e-button ref={buttonRef}>Click me</e-button>;
}
```

## 组件列表

### e-button

一个简单的按钮组件。

**标签名**: `e-button`

**Slots**:

- `default`: 按钮文本内容

**Events**:

- `e-click`: 按钮点击时触发
  - `detail.message`: 事件消息 (string)

## 配置

### 组件前缀

组件前缀在 `packages/components/src/config.ts` 中配置：

```typescript
export const COMPONENT_CONFIG = {
  prefix: 'l',  // 可以修改为其他前缀
  
  getTagName(componentName: string): string {
    return `${this.prefix}-${componentName}`;
  }
};
```

修改 `prefix` 后，所有组件的标签名都会相应改变。例如：

- `prefix: 'l'` → `<e-button>`
- `prefix: 'eos'` → `<eos-button>`
- `prefix: 'my'` → `<my-button>`

## 开发

### 添加新组件

1. 在 `packages/components/src/components/` 下创建新组件目录
2. 创建组件类继承 `HTMLElement`
3. 在 `packages/components/src/index.ts` 中导出并注册组件

示例：

```typescript
// packages/components/src/components/input/input.ts
export class EosInput extends HTMLElement {
  // 组件实现
}

// packages/components/src/index.ts
import { EosInput } from './components/input/input';

const COMPONENTS: ComponentRegistration[] = [
  { name: 'button', component: EosButton },
  { name: 'input', component: EosInput }  // 添加新组件
];
```

### 构建

```bash
# 构建组件库
pnpm build

# 构建文档
pnpm build:docs
```

## 技术栈

- **包管理**: pnpm workspace
- **开发语言**: TypeScript
- **构建工具**: Vite + tsc
- **组件技术**: Web Components (Custom Elements v1, Shadow DOM)

## License

MIT
