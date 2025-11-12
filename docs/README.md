# Eos Components Documentation

> 专业的 Web Components 组件库文档系统

[![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](http://localhost:6006)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Web Components](https://img.shields.io/badge/Web%20Components-29ABE2?style=for-the-badge&logo=webcomponents.org&logoColor=white)](https://www.webcomponents.org/)

## 📖 概述

Eos Components 文档系统基于 **Storybook** 构建，提供完整的组件文档、交互式演示和 API 参考。支持多框架使用（React、Vue、Angular、原生 HTML），确保开发者能够快速上手和集成。

## ✨ 特性

### 🎯 核心功能
- **📚 完整文档** - 详细的组件说明、属性列表和使用示例
- **🎨 交互演示** - 实时修改属性，即时查看效果
- **🔧 多框架支持** - React、Vue、Angular、HTML 使用示例
- **📝 MDX 支持** - Markdown + JSX 编写富文本文档
- **🌐 国际化** - 中英文双语文档支持

### 🛠️ 开发体验
- **🔍 自动生成** - 从 TypeScript 类型自动生成 API 文档
- **🎪 Playground** - 在线代码编辑器，支持实时预览
- **📱 响应式** - 适配桌面端和移动端设备
- **🔗 深度链接** - 支持直接链接到特定组件或示例

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (推荐) 或 npm >= 9.0.0

### 安装依赖

```bash
# 进入文档目录
cd docs

# 安装依赖
pnpm install
```

### 启动开发服务器

```bash
# 启动 Storybook 开发服务器
pnpm dev

# 或者使用完整命令
pnpm storybook
```

服务器启动后，访问 [http://localhost:6006](http://localhost:6006) 查看文档。

### 构建生产版本

```bash
# 构建静态文档站点
pnpm build

# 预览构建结果
pnpm preview
```

## 📁 项目结构

```
docs/
├── .storybook/              # Storybook 配置
│   ├── main.ts             # 主配置文件
│   ├── preview.ts          # 预览配置
│   └── theme.ts            # 主题配置
├── src/                    # 文档源码
│   ├── components/         # 组件文档
│   │   ├── Button.stories.tsx
│   │   ├── Image.stories.tsx
│   │   └── Carousel.stories.tsx
│   └── guides/             # 指南文档
│       ├── Introduction.mdx
│       ├── GettingStarted.mdx
│       ├── Installation.mdx
│       └── Migration.mdx
├── public/                 # 静态资源
├── package.json           # 项目配置
└── README.md              # 项目说明
```

## 📚 文档内容

### 🎯 组件文档
- **Button** - 按钮组件，支持多种类型和状态
- **Image** - 图片组件，支持 BlurHash、懒加载等高级功能
- **Carousel** - 轮播图组件，支持自动播放、手势控制

### 📖 指南文档
- **介绍** - 组件库概述和设计理念
- **快速开始** - 安装和基础使用指南
- **安装指南** - 详细的安装和配置说明
- **迁移指南** - 版本升级和迁移说明

## 🔧 开发指南

### 添加新组件文档

1. 在 `src/components/` 目录下创建 `ComponentName.stories.tsx`
2. 编写组件的 Story 和文档
3. 添加交互式控件和示例

```typescript
// src/components/NewComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { NewComponent } from '@eosjs/components';

const meta: Meta<typeof NewComponent> = {
  title: 'Components/NewComponent',
  component: NewComponent,
  parameters: {
    docs: {
      description: {
        component: '组件描述...'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // 默认属性
  }
};
```

### 添加指南文档

1. 在 `src/guides/` 目录下创建 `GuideName.mdx`
2. 使用 MDX 格式编写文档
3. 可以嵌入 React 组件和交互示例

```mdx
# 指南标题

指南内容...

<ComponentExample>
  <Button type="primary">示例按钮</Button>
</ComponentExample>
```

## 🌐 部署

### GitHub Pages

```bash
# 构建并部署到 GitHub Pages
pnpm build
pnpm deploy
```

### Netlify / Vercel

1. 连接 Git 仓库
2. 设置构建命令：`pnpm build`
3. 设置发布目录：`storybook-static`

## 🤝 贡献指南

1. Fork 项目仓库
2. 创建功能分支：`git checkout -b feature/new-docs`
3. 提交更改：`git commit -m 'Add new documentation'`
4. 推送分支：`git push origin feature/new-docs`
5. 创建 Pull Request

## 📄 许可证

本项目采用 [MIT License](../LICENSE) 许可证。

## 🔗 相关链接

- [组件库源码](../packages/components)
- [在线文档](https://your-docs-site.com)
- [GitHub 仓库](https://github.com/your-org/eos-components)
- [问题反馈](https://github.com/your-org/eos-components/issues)

---

<div align="center">
  <p>Made with ❤️ by Eos Team</p>
</div>
