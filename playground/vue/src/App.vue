<template>
  <el-container class="layout-container">
    <!-- 头部 -->
    <el-header height="60px" class="app-header">
      <div class="header-left">
        <el-icon size="24" color="#1677ff" class="header-logo"><Lightning /></el-icon>
        <h1 class="header-title">Eos Components</h1>
      </div>
      <div class="header-right">
        <el-tag type="primary" effect="light">Vue Playground</el-tag>
        <el-divider direction="vertical" />
        <el-text type="info" size="small">v0.0.1</el-text>
      </div>
    </el-header>

    <el-container class="main-container">
      <!-- 侧边栏 -->
      <el-aside width="280px" class="sidebar">
        <div class="sidebar-header">
          <h3 class="sidebar-title">组件列表</h3>
          <el-text type="info" size="small">Component Library</el-text>
        </div>
        
        <el-scrollbar class="sidebar-scrollbar">
          <el-menu
            :default-active="activeComponent"
            class="sidebar-menu"
            @select="handleMenuSelect"
            :collapse="false"
            :unique-opened="true"
          >
            <el-menu-item
              v-for="comp in components"
              :key="comp.id"
              :index="comp.id"
            >
              <el-icon><component :is="comp.icon" /></el-icon>
              <span>{{ comp.name }}</span>
              <el-tag size="small" class="component-tag" type="info">Demo</el-tag>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
        
        <div class="sidebar-footer">
          <el-space direction="vertical" size="small">
            <el-text type="info" size="small">基于 Web Components</el-text>
            <el-text type="info" size="small">支持 Vue 3 + TypeScript</el-text>
          </el-space>
        </div>
      </el-aside>

      <!-- 主内容区 -->
      <el-main class="main-content">
        <div class="content-wrapper">
          <transition name="fade" mode="out-in">
            <component :is="activeComponentInstance" v-if="activeComponentInstance" />
            <div v-else class="empty-state">
              <el-empty description="请从左侧菜单选择一个组件查看演示">
                <template #image>
                  <el-icon size="120" color="#d9d9d9"><Box /></el-icon>
                </template>
                <template #description>
                  <p class="empty-description">选择一个组件开始探索</p>
                  <p class="empty-subtitle">所有组件都支持完整的 TypeScript 类型定义</p>
                </template>
                <el-button type="primary" @click="selectFirstComponent">
                  开始体验
                </el-button>
              </el-empty>
            </div>
          </transition>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import ButtonDemo from "./components/demos/ButtonDemo.vue";
import CarouselDemo from "./components/demos/CarouselDemo.vue";
import ImageDemo from "./components/demos/ImageDemo.vue";

// 组件列表
const components = [
	{ id: "button", name: "Button 按钮", icon: "Pointer", component: ButtonDemo },
	{
		id: "carousel",
		name: "Carousel 轮播图",
		icon: "PictureRounded",
		component: CarouselDemo,
	},
	{ id: "image", name: "Image 图片", icon: "Picture", component: ImageDemo },
];

const activeComponent = ref("button");

// 获取当前活动组件
const activeComponentInstance = computed(() => {
	const comp = components.find((c) => c.id === activeComponent.value);
	return comp?.component || null;
});

// 处理菜单选择
const handleMenuSelect = (key: string) => {
	activeComponent.value = key;
	window.location.hash = key;
};

const selectFirstComponent = () => {
	if (components.length > 0) {
		handleMenuSelect(components[0].id);
	}
};

// 处理 hash 变化
const handleHashChange = () => {
	const hash = window.location.hash.slice(1);
	if (hash && components.find((c) => c.id === hash)) {
		activeComponent.value = hash;
	}
};

onMounted(() => {
	// 初始化时检查 hash
	const hash = window.location.hash.slice(1);
	if (hash && components.find((c) => c.id === hash)) {
		activeComponent.value = hash;
	}

	// 监听 hash 变化
	window.addEventListener("hashchange", handleHashChange);
});

onUnmounted(() => {
	window.removeEventListener("hashchange", handleHashChange);
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

/* ===== 全局样式 ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  background: #f5f7fa;
  min-height: 100vh;
  color: #333;
  font-size: 14px;
  line-height: 1.5714285714285714;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ===== 布局容器 ===== */
.layout-container {
  height: 100vh;
  background: #f5f7fa;
}

/* ===== 头部样式 ===== */
.app-header {
  background: #ffffff;
  border-bottom: 1px solid #e8eaec;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  z-index: 1000;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-logo {
  flex-shrink: 0;
}

.header-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  letter-spacing: -0.025em;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* ===== 主容器 ===== */
.main-container {
  height: calc(100vh - 60px);
}

/* ===== 侧边栏样式 ===== */
.sidebar {
  background: #ffffff;
  border-right: 1px solid #e8eaec;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.04);
}

.sidebar-header {
  padding: 20px 24px;
  border-bottom: 1px solid #f0f2f5;
  flex-shrink: 0;
  background: #fafbfc;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px;
}

.sidebar-scrollbar {
  flex: 1;
  overflow-y: auto;
}

.sidebar-menu {
  border-right: none;
  padding: 12px 16px;
  background: #ffffff;
}

.sidebar-menu .el-menu-item {
  margin-bottom: 4px;
  border-radius: 8px;
  padding: 12px 16px;
  height: auto;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
}

.sidebar-menu .el-menu-item:hover {
  background: #f8fafc;
  color: #1677ff;
  transform: translateX(2px);
}

.sidebar-menu .el-menu-item.is-active {
  background: linear-gradient(135deg, #e6f4ff 0%, #f0f8ff 100%);
  color: #1677ff;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(22, 119, 255, 0.1);
}

.sidebar-menu .el-menu-item .el-icon {
  margin-right: 8px;
}

.component-tag {
  margin-left: auto;
  font-size: 11px;
  padding: 2px 6px;
  height: auto;
  border-radius: 4px;
}

.sidebar-footer {
  padding: 16px 24px;
  border-top: 1px solid #f0f2f5;
  text-align: center;
  flex-shrink: 0;
  background: #fafbfc;
}

/* ===== 主内容区 ===== */
.main-content {
  background: #f5f7fa;
  padding: 0;
  overflow: auto;
}

.content-wrapper {
  padding: 24px;
  min-height: 100%;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
}

.empty-description {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 8px;
}

.empty-subtitle {
  font-size: 14px;
  color: #9ca3af;
  margin-bottom: 24px;
}

/* ===== 过渡动画 ===== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ===== 响应式设计 ===== */
@media (max-width: 768px) {
  .app-header {
    padding: 0 16px;
  }
  
  .header-title {
    font-size: 18px;
  }
  
  .header-right {
    gap: 12px;
  }
  
  .sidebar {
    width: 260px !important;
  }
  
  .sidebar-header {
    padding: 16px 20px;
  }
  
  .sidebar-menu {
    padding: 8px 12px;
  }
  
  .content-wrapper {
    padding: 16px;
  }
}

@media (max-width: 576px) {
  .sidebar {
    width: 240px !important;
  }
  
  .sidebar-header {
    padding: 12px 16px;
  }
  
  .sidebar-title {
    font-size: 14px;
  }
  
  .content-wrapper {
    padding: 12px;
  }
}
</style>
