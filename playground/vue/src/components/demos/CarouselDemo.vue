<template>
  <div class="component-demo">
    <h2>Carousel 轮播图组件</h2>

    <div class="demo-block">
      <h3>基础用法</h3>
      <div class="demo-content">
        <e-carousel 
          autoplay 
          :interval="3000" 
          loop 
          :style="{ '--carousel-height': '300px' }"
          @change="handleSlideChange"
        >
          <div class="carousel-slide gradient-1">
            <h2>第一张幻灯片</h2>
            <p>优雅的渐变背景</p>
          </div>
          <div class="carousel-slide gradient-2">
            <h2>第二张幻灯片</h2>
            <p>流畅的切换动画</p>
          </div>
          <div class="carousel-slide gradient-3">
            <h2>第三张幻灯片</h2>
            <p>自动播放功能</p>
          </div>
          <div class="carousel-slide gradient-4">
            <h2>第四张幻灯片</h2>
            <p>无限循环模式</p>
          </div>
        </e-carousel>
        <div class="output">当前索引: {{ currentSlide }}</div>
      </div>
    </div>

    <div class="demo-block">
      <h3>媒体内容轮播</h3>
      <div class="demo-content">
        <e-carousel :style="{ '--carousel-height': '400px' }">
          <div class="media-slide">
            <img src="https://picsum.photos/800/400?random=1" alt="随机图片 1" />
            <div class="media-overlay">
              <h3>美丽的风景</h3>
              <p>探索大自然的魅力</p>
            </div>
          </div>
          <div class="media-slide">
            <img src="https://picsum.photos/800/400?random=2" alt="随机图片 2" />
            <div class="media-overlay">
              <h3>城市夜景</h3>
              <p>繁华都市的灯火</p>
            </div>
          </div>
          <div class="media-slide">
            <img src="https://picsum.photos/800/400?random=3" alt="随机图片 3" />
            <div class="media-overlay">
              <h3>艺术空间</h3>
              <p>创意与灵感的碰撞</p>
            </div>
          </div>
        </e-carousel>
      </div>
    </div>

    <div class="demo-block">
      <h3>手动控制</h3>
      <div class="demo-content">
        <e-carousel 
          ref="carouselRef" 
          :style="{ '--carousel-height': '250px' }"
        >
          <div class="carousel-slide control-slide-1">
            <span class="slide-icon">🎨</span>
            <span>设计</span>
          </div>
          <div class="carousel-slide control-slide-2">
            <span class="slide-icon">💻</span>
            <span>开发</span>
          </div>
          <div class="carousel-slide control-slide-3">
            <span class="slide-icon">🚀</span>
            <span>部署</span>
          </div>
        </e-carousel>
        <div class="controls">
          <button class="control-btn" @click="prevSlide">上一张</button>
          <button class="control-btn" @click="nextSlide">下一张</button>
          <button class="control-btn" @click="playCarousel">播放</button>
          <button class="control-btn" @click="pauseCarousel">暂停</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentSlide = ref(0);
const carouselRef = ref<any>(null);

const handleSlideChange = (event: CustomEvent) => {
  currentSlide.value = event.detail.currentIndex;
};

const prevSlide = () => {
  carouselRef.value?.prev();
};

const nextSlide = () => {
  carouselRef.value?.next();
};

const playCarousel = () => {
  carouselRef.value?.play();
};

const pauseCarousel = () => {
  carouselRef.value?.pause();
};
</script>

<style scoped>
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

/* Carousel 样式 */
.carousel-slide {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 40px;
  text-align: center;
}

.carousel-slide h2 {
  font-size: 32px;
  margin-bottom: 16px;
  color: white;
}

.carousel-slide h2::after {
  display: none;
}

.carousel-slide p {
  font-size: 18px;
  opacity: 0.9;
}

.gradient-1 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.gradient-2 {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.gradient-3 {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.gradient-4 {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

/* 媒体轮播 */
.media-slide {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.media-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
}

.media-overlay h3 {
  font-size: 24px;
  margin-bottom: 8px;
  color: white;
}

.media-overlay p {
  font-size: 16px;
  opacity: 0.9;
}

/* 控制轮播 */
.control-slide-1 {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.control-slide-2 {
  background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
}

.control-slide-3 {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  color: #333;
}

.slide-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
}

/* 控制按钮 */
.controls {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.control-btn {
  padding: 8px 16px;
  margin: 0;
  background: var(--bg-container);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5714285714285714;
  transition: all var(--transition-duration) var(--transition-timing);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 400;
}

.control-btn:hover {
  color: var(--primary-color-hover);
  border-color: var(--primary-color-hover);
}

.control-btn:active {
  color: var(--primary-color-active);
  border-color: var(--primary-color-active);
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
</style>
