<template>
  <div class="layout-container">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1>Eos Components</h1>
        <span class="badge">Vue Playground</span>
      </div>
      <nav class="sidebar-nav">
        <button
          v-for="comp in components"
          :key="comp.id"
          :class="['nav-item', { active: activeComponent === comp.id }]"
          @click="handleNavClick(comp.id)"
        >
          <span class="nav-icon">{{ comp.icon }}</span>
          <span class="nav-text">{{ comp.name }}</span>
        </button>
      </nav>
      <div class="sidebar-footer">
        <div class="version">v0.0.1</div>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content">
      <div id="demo-container">
        <component :is="activeComponentInstance" v-if="activeComponentInstance" />
        <div v-else class="welcome">
          <h2>欢迎使用 Eos Components</h2>
          <p>请从左侧菜单选择一个组件查看演示</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import ButtonDemo from './components/demos/ButtonDemo.vue';
import CarouselDemo from './components/demos/CarouselDemo.vue';
import ImageDemo from './components/demos/ImageDemo.vue';

// 组件列表
const components = [
  { id: 'button', name: 'Button 按钮', icon: '🔘', component: ButtonDemo },
  { id: 'carousel', name: 'Carousel 轮播图', icon: '🎠', component: CarouselDemo },
  { id: 'image', name: 'Image 图片', icon: '🖼️', component: ImageDemo }
];

const activeComponent = ref('button');

// 获取当前活动组件
const activeComponentInstance = computed(() => {
  const comp = components.find(c => c.id === activeComponent.value);
  return comp?.component || null;
});

// 处理导航点击
const handleNavClick = (componentId: string) => {
  activeComponent.value = componentId;
  window.location.hash = componentId;
};

// 处理 hash 变化
const handleHashChange = () => {
  const hash = window.location.hash.slice(1);
  if (hash && components.find(c => c.id === hash)) {
    activeComponent.value = hash;
  }
};

onMounted(() => {
  // 初始化时检查 hash
  const hash = window.location.hash.slice(1);
  if (hash && components.find(c => c.id === hash)) {
    activeComponent.value = hash;
  }
  
  // 监听 hash 变化
  window.addEventListener('hashchange', handleHashChange);
});

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange);
});
</script>

<style>
:root {
  /* 基于 Ant Design 的色彩系统 */
  --primary-color: #1677ff;
  --primary-color-hover: #4096ff;
  --primary-color-active: #0958d9;
  --primary-bg: #e6f4ff;
  --primary-bg-hover: #bae0ff;
  
  /* 中性色 */
  --text-primary: #000000e0;
  --text-secondary: #00000073;
  --text-tertiary: #00000045;
  --text-white: #ffffff;
  
  --bg-body: #f5f5f5;
  --bg-container: #ffffff;
  --bg-elevated: #ffffff;
  
  --border-color: #d9d9d9;
  --border-radius: 6px;
  --border-radius-lg: 8px;
  
  /* 阴影 */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  --shadow-md: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  
  /* 动画 */
  --transition-duration: 0.2s;
  --transition-timing: cubic-bezier(0.645, 0.045, 0.355, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  background: var(--bg-body);
  min-height: 100vh;
  color: var(--text-primary);
  font-size: 14px;
  line-height: 1.5714285714285714;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 布局容器 */
.layout-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* 侧边栏 */
.sidebar {
  width: 240px;
  background: var(--bg-container);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: width var(--transition-duration) var(--transition-timing);
}

.sidebar-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-header h1 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-header h1::before {
  content: "⚡";
  font-size: 20px;
}

.badge {
  display: inline-block;
  background: var(--primary-bg);
  color: var(--primary-color);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  margin-top: 8px;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 8px;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 自定义滚动条 */
.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: var(--text-tertiary);
}

.nav-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 4px;
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: all var(--transition-duration) var(--transition-timing);
  font-size: 14px;
  text-align: left;
  position: relative;
}

.nav-item:hover {
  background: var(--bg-body);
  color: var(--text-primary);
}

.nav-item.active {
  background: var(--primary-bg);
  color: var(--primary-color);
  font-weight: 500;
}

.nav-item.active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 16px;
  background: var(--primary-color);
  border-radius: 0 2px 2px 0;
}

.nav-icon {
  font-size: 16px;
  margin-right: 8px;
  width: 20px;
  text-align: center;
}

.nav-text {
  flex: 1;
}

.sidebar-footer {
  padding: 12px 20px;
  border-top: 1px solid var(--border-color);
  color: var(--text-tertiary);
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.version {
  font-size: 12px;
  color: var(--text-tertiary);
}

/* 主内容区 */
.main-content {
  flex: 1;
  overflow-y: auto;
  background: var(--bg-body);
}

#demo-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

/* 欢迎页面 */
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 48px;
}

.welcome h2 {
  font-size: 40px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-color-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome p {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.8;
}
</style>
