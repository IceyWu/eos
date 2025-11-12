# 🚀 Release Guide

本指南说明如何发布 Eos Components 的新版本。

## 📋 发布前检查清单

- [ ] 所有测试通过
- [ ] 代码已格式化 (`pnpm format`)
- [ ] 构建成功 (`pnpm build:all`)
- [ ] 文档已更新
- [ ] CHANGELOG.md 已准备好

## 🔢 版本管理

所有包的版本号会自动保持同步：
- `@eos/utils`
- `@eosjs/components` 
- `@eosjs/components-docs`

## 📦 发布命令

### 1. 补丁版本 (0.1.1 → 0.1.2)
```bash
pnpm version:patch
```

### 2. 次要版本 (0.1.1 → 0.2.0)  
```bash
pnpm version:minor
```

### 3. 主要版本 (0.1.1 → 1.0.0)
```bash
pnpm version:major
```

### 4. 发布到 npm
```bash
# 预览发布（不会实际发布）
pnpm release:dry

# 正式发布
pnpm release
```

## 🔄 发布流程

1. **更新版本号**
   ```bash
   pnpm version:patch  # 或 minor/major
   ```
   这会：
   - 更新根目录版本号
   - 同步所有包的版本号
   - 生成 CHANGELOG.md

2. **构建和发布**
   ```bash
   pnpm release
   ```
   这会：
   - 同步版本号
   - 构建所有包
   - 发布到 npm registry

## 📝 版本号规则

遵循 [Semantic Versioning](https://semver.org/)：

- **PATCH** (0.1.1 → 0.1.2): Bug 修复
- **MINOR** (0.1.1 → 0.2.0): 新功能，向后兼容
- **MAJOR** (0.1.1 → 1.0.0): 破坏性变更

## 🔍 验证发布

发布后验证：

1. **检查 npm 包**
   ```bash
   npm view @eos/utils version
   npm view @eosjs/components version
   ```

2. **测试安装**
   ```bash
   npm install @eosjs/components@latest
   ```

3. **检查文档**
   - 访问 Storybook 文档
   - 验证示例代码

## 🚨 回滚发布

如果需要回滚：

```bash
# 撤销 npm 发布（24小时内）
npm unpublish @eosjs/components@x.x.x
npm unpublish @eos/utils@x.x.x

# 或者发布修复版本
pnpm version:patch
pnpm release
```

## 📊 发布统计

查看发布信息：
```bash
npm info @eosjs/components
npm info @eos/utils
```
