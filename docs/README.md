# EOS UI Documentation

EOS UI 的组件文档站，使用 LobeHub 的 `@lobehub/docs-kit` 构建。

## 环境

- Node.js 24
- pnpm 11

## 开发

```bash
nvm use 24
corepack pnpm install
corepack pnpm --filter @eosjs/components-docs dev
```

开发服务器默认运行在 <http://localhost:5173>。

## 构建

```bash
corepack pnpm build:docs
```

## 目录

- `docs.config.ts`：站点、导航和主题配置
- `content/**/index.mdx`：组件文档
- `content/**/demo.tsx`：交互式组件示例
- `getting-started.mdx`：入门指南
- `home/`：首页实现
