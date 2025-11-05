# Demo Components

这个目录包含了所有的演示组件，每个组件都是独立的、可复用的。

## 组件结构

```
demos/
├── CarouselBasicDemo.vue      # Carousel 基础示例
├── MediaCarouselDemo.vue      # 视频+图片混合轮播
├── CarouselControlDemo.vue    # 手动控制示例
├── ButtonDemo.vue             # Button 组件示例
├── InteractiveDemo.vue        # 交互示例（计数器、动态内容）
├── demo-styles.css            # 共享的 Demo 样式
└── media-carousel-styles.css  # 媒体轮播专用样式
```

## 样式说明

### demo-styles.css
包含所有 Demo 组件共享的样式：
- 组件区块样式（`.component-section`）
- Demo 卡片样式（`.demo-card`）
- 信息展示样式（`.info-item`, `.info-grid`）
- 按钮样式（`.action-btn`）
- 统计卡片样式（`.stat-card`）

### media-carousel-styles.css
专门用于媒体轮播的样式：
- 视频遮罩效果
- 媒体内容布局
- 视频标签样式

## 使用方式

在 `App.vue` 中导入并使用：

```vue
<script setup lang="ts">
import CarouselBasicDemo from './components/demos/CarouselBasicDemo.vue';
import MediaCarouselDemo from './components/demos/MediaCarouselDemo.vue';
// ...
</script>

<template>
  <CarouselBasicDemo />
  <MediaCarouselDemo />
</template>
```

## 优势

1. **模块化**：每个 Demo 都是独立的组件
2. **可维护**：修改某个 Demo 不影响其他部分
3. **可复用**：可以轻松在其他页面使用这些 Demo
4. **清晰**：代码结构一目了然，易于理解
