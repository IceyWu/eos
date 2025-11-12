<template>
  <div class="component-demo">
    <h2>Button 按钮组件</h2>

    <div class="demo-block">
      <h3>基础用法</h3>
      <div class="demo-content">
        <e-button>默认按钮</e-button>
        <e-button>提交</e-button>
        <e-button>取消</e-button>
      </div>
    </div>

    <div class="demo-block">
      <h3>事件监听</h3>
      <div class="demo-content">
        <e-button @e-click="handleClick">点击我</e-button>
        <div class="output" :class="{ success: showSuccess }">
          {{ outputMessage }}
        </div>
      </div>
    </div>

    <div class="demo-block">
      <h3>计数器演示</h3>
      <div class="demo-content">
        <e-button @e-click="handleCounter">点击计数</e-button>
        <div class="stats">
          <div class="stat-card">
            <div class="stat-value">{{ clickCount }}</div>
            <div class="stat-label">点击次数</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ lastClickTime }}</div>
            <div class="stat-label">最后点击</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const outputMessage = ref("👆 点击按钮查看效果");
const showSuccess = ref(false);
const clickCount = ref(0);
const lastClickTime = ref("--:--:--");

const handleClick = (e: CustomEvent) => {
	outputMessage.value = `✓ ${e.detail.message}`;
	showSuccess.value = true;

	setTimeout(() => {
		outputMessage.value = "👆 点击按钮查看效果";
		showSuccess.value = false;
	}, 2000);
};

const handleCounter = () => {
	clickCount.value++;
	lastClickTime.value = new Date().toLocaleTimeString("zh-CN");
};
</script>

<style scoped>
/* 组件演示容器 */
.component-demo {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.component-demo h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 12px;
}

.component-demo h2::after {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--border-color), transparent);
}

/* Demo 块 */
.demo-block {
  background: var(--bg-container);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;
  overflow: hidden;
  transition: box-shadow var(--transition-duration) var(--transition-timing);
}

.demo-block:hover {
  box-shadow: var(--shadow-md);
}

.demo-block h3 {
  font-size: 16px;
  font-weight: 500;
  padding: 16px 24px;
  margin: 0;
  color: var(--text-primary);
  background: var(--bg-body);
  border-bottom: 1px solid var(--border-color);
}

.demo-content {
  padding: 24px;
  background: var(--bg-container);
}

.demo-content e-button {
  margin-right: 8px;
  margin-bottom: 8px;
}

/* 输出区域 */
.output {
  margin-top: 16px;
  padding: 12px 16px;
  background: var(--bg-body);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 14px;
  color: var(--text-secondary);
  transition: all var(--transition-duration) var(--transition-timing);
}

.output.success {
  background: #f6ffed;
  color: #52c41a;
  border-color: #b7eb8f;
}

/* 统计卡片 */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.stat-card {
  background: var(--bg-container);
  border: 1px solid var(--border-color);
  padding: 20px;
  border-radius: var(--border-radius-lg);
  text-align: center;
  transition: all var(--transition-duration) var(--transition-timing);
}

.stat-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 4px;
  font-feature-settings: 'tnum';
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
}
</style>
