# Eos UI 文档系统

基于 Storybook 构建的组件文档系统，支持 Vue、React 和原生 HTML 的代码示例。

## 特性

- 📚 **完整的组件文档** - 包含参数说明、使用示例和 API 文档
- 🎨 **交互式演示** - 实时修改组件属性，查看效果
- 🌐 **多框架支持** - 提供 Vue 3、React 和 HTML 的代码示例
- 📝 **MDX 文档** - 支持 Markdown 编写富文本文档
- 🔍 **自动生成文档** - 从 TypeScript 类型自动生成参数文档

## 快速开始

### 安装依赖

```bash
cd docs
npm install
```

### 启动开发服务器

```bash
npm run storybook
# 或
npm run dev
```

访问 <http://localhost:6006> 查看文档。

### 构建文档

```bash
npm run build-storybook
# 或
npm run build
```

构建产物在 `storybook-static` 目录。

## 项目结构

```
docs/
├── .storybook/
│   ├── main.ts          # Storybook 主配置
│   └── preview.ts       # 预览配置
├── stories/
│   ├── Introduction.mdx      # 介绍页面
│   ├── GettingStarted.mdx   # 快速上手指南
│   ├── Carousel.stories.tsx  # Carousel 组件文档
│   └── Button.stories.tsx    # Button 组件文档
└── package.json
```

## 编写文档

### 1. Story 文件

创建 `ComponentName.stories.tsx`：

```typescript
import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';

const meta: Meta = {
  title: 'Components/ComponentName',
  argTypes: {
    // 定义组件参数
    prop1: {
      control: 'text',
      description: '属性描述',
    },
  },
};

export default meta;

// 创建示例
export const Default: StoryObj = {
  render: (args) => ({
    setup() {
      return () => h('l-component', args);
    },
  }),
};
```

### 2. MDX 文档

创建 `Document.mdx`：

```mdx
import { Meta } from '@storybook/blocks';

<Meta title="分类/页面标题" />

# 标题

Markdown 内容...

## 代码示例

\`\`\`javascript
// 代码
\`\`\`
```

## Storybook 功能

### Controls（控制面板）

在每个组件示例下方，你可以：

- 实时修改组件属性
- 查看属性类型和默认值
- 测试不同配置组合

### Docs（文档）

自动生成的文档包含：

- 组件描述
- 属性表格（Props Table）
- 使用示例
- 源代码

### Actions（动作）

查看组件触发的事件：

- 事件名称
- 事件参数
- 触发时间

## 部署

### 部署到 GitHub Pages

1. 构建文档：

```bash
npm run build-storybook
```

2. 部署：

```bash
npx gh-pages -d storybook-static
```

### 部署到 Vercel

1. 连接 GitHub 仓库
2. 设置构建命令：`npm run build-storybook`
3. 设置输出目录：`storybook-static`

### 部署到 Netlify

1. 连接 GitHub 仓库
2. 构建设置：
   - 构建命令：`npm run build-storybook`
   - 发布目录：`storybook-static`

## 配置说明

### 添加新的框架支持

在 `.storybook/main.ts` 中配置：

```typescript
const config: StorybookConfig = {
  framework: {
    name: "@storybook/vue3-vite", // 或 @storybook/react-vite
    options: {},
  },
};
```

### 自定义主题

在 `.storybook/preview.ts` 中配置：

```typescript
import { themes } from '@storybook/theming';

export const parameters = {
  docs: {
    theme: themes.dark, // 使用暗色主题
  },
};
```

### 添加插件

在 `.storybook/main.ts` 中添加：

```typescript
const config: StorybookConfig = {
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y", // 无障碍测试
    "@storybook/addon-viewport", // 响应式测试
  ],
};
```

## 常见问题

### Q: TypeScript 报错找不到模块？

A: 运行 `npm install` 安装依赖后重启 IDE。

### Q: 如何添加新组件文档？

A: 在 `stories` 目录创建 `ComponentName.stories.tsx` 文件，参考现有组件文档结构。

### Q: 如何自定义文档样式？

A: 在 `.storybook/preview.ts` 中导入自定义 CSS 文件。

## 相关链接

- [Storybook 官方文档](https://storybook.js.org/docs)
- [MDX 文档](https://mdxjs.com/)
- [Eos UI 组件库](https://github.com/eos-ui/eos)

## License

MIT
