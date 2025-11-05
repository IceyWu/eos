<template>
  <section id="button" class="component-section">
    <div class="section-header">
      <div class="section-title-group">
        <h3 class="section-title">Button 按钮</h3>
        <span class="section-badge">Basic</span>
      </div>
      <p class="section-description">基础按钮组件，支持事件监听和动态内容</p>
    </div>

    <div class="demo-grid">
      <div class="demo-card">
        <div class="demo-card-header">
          <h4 class="demo-title">基础用法</h4>
        </div>
        <div class="demo-preview">
          <e-button>默认按钮</e-button>
          <e-button>提交</e-button>
          <e-button>取消</e-button>
        </div>
      </div>

      <div class="demo-card">
        <div class="demo-card-header">
          <h4 class="demo-title">事件监听</h4>
        </div>
        <div class="demo-preview">
          <e-button @e-click="handleClick">点击我</e-button>
        </div>
        <div class="demo-info">
          <div class="info-message" :class="{ success: showSuccess }">
            {{ outputMessage }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const outputMessage = ref("👆 点击按钮查看效果");
const showSuccess = ref(false);

const handleClick = (e: CustomEvent) => {
  outputMessage.value = `✓ ${e.detail.message}`;
  showSuccess.value = true;

  setTimeout(() => {
    outputMessage.value = "👆 点击按钮查看效果";
    showSuccess.value = false;
  }, 2000);
};
</script>

<style scoped>
@import './demo-styles.css';
</style>
