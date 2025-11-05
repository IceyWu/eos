<template>
  <section class="component-section">
    <div class="section-header">
      <div class="section-title-group">
        <h3 class="section-title">手动控制</h3>
        <span class="section-badge">Control</span>
      </div>
      <p class="section-description">通过 API 控制轮播图的播放和暂停</p>
    </div>

    <div class="demo-card">
      <div class="demo-card-header">
        <h4 class="demo-title">播放控制</h4>
      </div>
      <div class="demo-preview">
        <e-carousel ref="manualCarousel" style="--carousel-height: 250px;">
          <div class="carousel-slide" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
            🎨 图片 1
          </div>
          <div class="carousel-slide" style="background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);">
            🎭 图片 2
          </div>
          <div class="carousel-slide"
            style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #333;">
            🎪 图片 3
          </div>
        </e-carousel>
      </div>
      <div class="demo-actions">
        <button class="action-btn primary" @click="playCarousel">
          <span>▶️</span> 播放
        </button>
        <button class="action-btn" @click="pauseCarousel">
          <span>⏸️</span> 暂停
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const manualCarousel = ref<any>(null);

const playCarousel = () => {
  manualCarousel.value?.play();
};

const pauseCarousel = () => {
  manualCarousel.value?.pause();
};
</script>

<style scoped>
@import './demo-styles.css';
</style>
