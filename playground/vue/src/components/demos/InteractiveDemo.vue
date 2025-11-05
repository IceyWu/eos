<template>
  <section id="interactive" class="component-section">
    <div class="section-header">
      <div class="section-title-group">
        <h3 class="section-title">交互示例</h3>
        <span class="section-badge">Interactive</span>
      </div>
      <p class="section-description">展示组件的交互功能和动态数据绑定</p>
    </div>

    <div class="demo-grid">
      <div class="demo-card">
        <div class="demo-card-header">
          <h4 class="demo-title">计数器</h4>
        </div>
        <div class="demo-preview">
          <e-button @e-click="incrementCounter">点击计数</e-button>
        </div>
        <div class="stats-grid">
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

      <div class="demo-card">
        <div class="demo-card-header">
          <h4 class="demo-title">动态内容</h4>
        </div>
        <div class="demo-preview">
          <e-button @e-click="handleClick">{{ buttonText }}</e-button>
        </div>
        <div class="demo-actions">
          <button class="action-btn" @click="changeButtonText">更改文本</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const clickCount = ref(0);
const lastClickTime = ref("--:--:--");
const buttonText = ref("动态按钮");

const incrementCounter = () => {
  clickCount.value++;
  lastClickTime.value = new Date().toLocaleTimeString("zh-CN");
};

const handleClick = (e: CustomEvent) => {
  console.log('Button clicked:', e.detail.message);
};

const buttonTexts = ["动态按钮", "已更改", "再次更改", "Vue 响应式"];
let textIndex = 0;

const changeButtonText = () => {
  textIndex = (textIndex + 1) % buttonTexts.length;
  buttonText.value = buttonTexts[textIndex];
};
</script>

<style scoped>
@import './demo-styles.css';
</style>
