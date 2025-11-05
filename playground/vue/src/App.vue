<template>
  <div class="app-wrapper">
    <!-- 侧边栏导航 -->
    <Sidebar :active-section="activeSection" />

    <!-- 主内容区 -->
    <main class="main-content">
      <div class="content-header">
        <h2 class="page-title">Component Showcase</h2>
        <p class="page-subtitle">探索 Eos UI 组件库的强大功能</p>
      </div>

      <!-- 使用组件化的 Demo -->
      <CarouselBasicDemo />
      <MediaCarouselDemo />
      <CarouselControlDemo />
      <ButtonDemo />
      <InteractiveDemo />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Sidebar from './components/Sidebar.vue';
import CarouselBasicDemo from './components/demos/CarouselBasicDemo.vue';
import MediaCarouselDemo from './components/demos/MediaCarouselDemo.vue';
import CarouselControlDemo from './components/demos/CarouselControlDemo.vue';
import ButtonDemo from './components/demos/ButtonDemo.vue';
import InteractiveDemo from './components/demos/InteractiveDemo.vue';

const activeSection = ref('carousel');
</script>

<style scoped>
:global(body) {
  margin: 0;
  padding: 0;
  background: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.app-wrapper {
  display: flex;
  min-height: 100vh;
}

/* 主内容区 */
.main-content {
  flex: 1;
  margin-left: 260px;
  padding: 40px 48px;
}

.content-header {
  margin-bottom: 48px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 16px;
  color: #64748b;
  margin: 0;
}
</style>
