<template>
  <section id="carousel" class="component-section">
    <div class="section-header">
      <div class="section-title-group">
        <h3 class="section-title">Carousel 轮播图</h3>
        <span class="section-badge">Basic</span>
      </div>
      <p class="section-description">支持自动播放、手动控制、触摸滑动等功能</p>
    </div>

    <div class="demo-card">
      <div class="demo-card-header">
        <h4 class="demo-title">自动播放模式</h4>
        <span class="demo-label">Auto Play</span>
      </div>
      <div class="demo-preview">
        <e-carousel autoplay :interval="500" loop @change="handleCarouselChange" style="--carousel-height: 300px;">
          <div v-for="(item, index) in carouselItems" :key="index" class="carousel-slide" :style="item.style">
            {{ item.title }}
          </div>
        </e-carousel>
      </div>
      <div class="demo-info">
        <div class="info-item">
          <span class="info-label">当前 Slide:</span>
          <span class="info-value">{{ currentSlide }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentSlide = ref(0);

const carouselItems = ref([
  {
    title: "Slide 1",
    style: "background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 48px; font-weight: bold;",
  },
  {
    title: "Slide 2",
    style: "background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 48px; font-weight: bold;",
  },
  {
    title: "Slide 3",
    style: "background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 48px; font-weight: bold;",
  },
  {
    title: "Slide 4",
    style: "background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 48px; font-weight: bold;",
  },
]);

const handleCarouselChange = (e: CustomEvent) => {
  currentSlide.value = e.detail.currentIndex;
};
</script>

<style scoped>
@import './demo-styles.css';
</style>
