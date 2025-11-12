<template>
  <div class="component-demo">
    <div class="demo-container">
      <!-- 基础用法 -->
      <el-card class="demo-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <el-icon><PictureRounded /></el-icon>
              <span>基础用法</span>
            </div>
            <el-tag size="small" type="info">Basic</el-tag>
          </div>
        </template>
        <div class="demo-section">
          <div class="section-desc">
            <p>基础的图片用法，支持圆形、加载状态等特性。</p>
          </div>
          <el-row :gutter="24">
            <el-col :span="8" v-for="(item, index) in basicImages" :key="index">
              <div class="image-item">
                <div class="image-title">
                  <el-text type="info">{{ item.title }}</el-text>
                </div>
                <div class="image-wrapper">
                  <eos-image 
                    :src="item.src" 
                    :alt="item.alt"
                    :circle="item.circle"
                    width="200"
                    height="200">
                  </eos-image>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <!-- BlurHash 支持 -->
      <el-card class="demo-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <el-icon><MagicStick /></el-icon>
              <span>BlurHash 支持</span>
            </div>
            <el-tag size="small" type="primary">BlurHash</el-tag>
          </div>
        </template>
        <div class="demo-section">
          <div class="section-desc">
            <p>支持 BlurHash 模糊预览，提升用户体验。</p>
          </div>
          <el-row :gutter="24">
            <el-col :span="8" v-for="(item, index) in blurhashImages" :key="index">
              <div class="image-item">
                <div class="image-title">
                  <el-text type="info">{{ item.title }}</el-text>
                </div>
                <div class="image-wrapper">
                  <eos-image 
                    :src="item.src"
                    :blurhash="item.blurhash"
                    :blurhash-only="item.blurhashOnly"
                    :alt="item.alt"
                    width="200"
                    height="200">
                  </eos-image>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <!-- 自定义插槽 -->
      <el-card class="demo-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <el-icon><Setting /></el-icon>
              <span>自定义插槽</span>
            </div>
            <el-tag size="small" type="warning">Slots</el-tag>
          </div>
        </template>
        <div class="demo-section">
          <div class="section-desc">
            <p>支持自定义加载和错误状态的插槽内容。</p>
          </div>
          <el-row :gutter="24">
            <el-col :span="8">
              <div class="image-item">
                <div class="image-title">
                  <el-text type="info">自定义 Loading</el-text>
                </div>
                <div class="image-wrapper">
                  <eos-image 
                    :src="delayedImageSrc"
                    alt="自定义loading"
                    width="200"
                    height="200">
                    <template #loading>
                      <div class="custom-loading-slot">
                        <el-loading-spinner />
                        <el-text color="white" size="small">精彩即将呈现...</el-text>
                      </div>
                    </template>
                  </eos-image>
                </div>
                <div class="image-actions">
                  <el-button 
                    @click="loadDelayedImage" 
                    size="small" 
                    type="primary">
                    加载图片
                  </el-button>
                </div>
              </div>
            </el-col>
            
            <el-col :span="8">
              <div class="image-item">
                <div class="image-title">
                  <el-text type="info">自定义 Error</el-text>
                </div>
                <div class="image-wrapper">
                  <eos-image 
                    src="https://invalid-custom-error.com/image.jpg" 
                    alt="自定义错误"
                    width="200"
                    height="200">
                    <template #error>
                      <div class="custom-error-slot">
                        <el-icon size="32" color="white"><Crying /></el-icon>
                        <el-text color="white" size="small">图片加载失败</el-text>
                      </div>
                    </template>
                  </eos-image>
                </div>
              </div>
            </el-col>

            <el-col :span="8">
              <div class="image-item">
                <div class="image-title">
                  <el-text type="info">骨架屏 Loading</el-text>
                </div>
                <div class="image-wrapper">
                  <eos-image 
                    :src="skeletonImageSrc"
                    alt="骨架屏"
                    width="200"
                    height="200">
                    <template #loading>
                      <el-skeleton :rows="5" animated />
                    </template>
                  </eos-image>
                </div>
                <div class="image-actions">
                  <el-button 
                    @click="loadSkeletonImage" 
                    size="small" 
                    type="primary">
                    加载图片
                  </el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <!-- Object-fit 模式 -->
      <el-card class="demo-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <el-icon><Crop /></el-icon>
              <span>Object-fit 模式</span>
            </div>
            <el-tag size="small" type="success">Styles</el-tag>
          </div>
        </template>
        <div class="demo-section">
          <div class="section-desc">
            <p>支持多种图片填充模式，适应不同的显示需求。</p>
          </div>
          <el-row :gutter="24">
            <el-col :span="8" v-for="(item, index) in objectFitImages" :key="index">
              <div class="image-item">
                <div class="image-title">
                  <el-text type="info">{{ item.title }}</el-text>
                </div>
                <div class="image-wrapper">
                  <eos-image 
                    :src="item.src"
                    :alt="item.alt"
                    :object-fit="item.objectFit"
                    width="200"
                    height="200"
                    :style="item.style">
                  </eos-image>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <!-- 事件处理 -->
      <el-card class="demo-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <el-icon><Bell /></el-icon>
              <span>事件处理</span>
            </div>
            <el-tag size="small" type="warning">Events</el-tag>
          </div>
        </template>
        <div class="demo-section">
          <div class="section-desc">
            <p>监听图片加载和错误事件，提供完整的交互反馈。</p>
          </div>
          <div class="event-demo">
            <div class="demo-image">
              <eos-image 
                ref="eventImage"
                :src="imageSrc" 
                alt="事件监听示例"
                width="200"
                height="200"
                @load="handleImageLoad"
                @error="handleImageError">
              </eos-image>
            </div>
            
            <div class="demo-controls">
              <el-space>
                <el-button @click="changeImage" type="primary">
                  <el-icon><Refresh /></el-icon>
                  更换图片
                </el-button>
                <el-button @click="loadInvalidImage" type="danger">
                  <el-icon><CloseBold /></el-icon>
                  加载无效图片
                </el-button>
              </el-space>
            </div>
            
            <transition name="el-fade-in">
              <el-alert
                v-if="imageMessage"
                :title="imageMessage"
                :type="imageMessageType"
                :closable="false"
                show-icon
                class="event-alert"
              />
            </transition>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 基础图片数据
const basicImages = [
	{
		title: "默认加载",
		src: "https://picsum.photos/200/200?random=1",
		alt: "示例图片",
		circle: false,
	},
	{
		title: "圆形图片",
		src: "https://picsum.photos/200/200?random=2",
		alt: "圆形图片",
		circle: true,
	},
	{
		title: "加载失败",
		src: "https://invalid-url.com/image.jpg",
		alt: "加载失败",
		circle: false,
	},
];

// BlurHash 图片数据
const blurhashImages = [
	{
		title: "BlurHash 预览",
		src: "https://picsum.photos/400/300?random=blurhash1",
		blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
		blurhashOnly: false,
		alt: "BlurHash 预览",
	},
	{
		title: "仅显示 BlurHash",
		src: "",
		blurhash: "LKO2:N%2Tw=w]~RBVZRi};RPxuwH",
		blurhashOnly: true,
		alt: "仅 BlurHash",
	},
	{
		title: "慢加载 BlurHash",
		src: "https://picsum.photos/800/600?random=blurhash2",
		blurhash: "L6PZfSjE.AyE_3t7t7R**0o#DgR4",
		blurhashOnly: false,
		alt: "慢速加载",
	},
];

// Object-fit 图片数据
const objectFitImages = [
	{
		title: "Cover（默认）",
		src: "https://picsum.photos/300/200?random=4",
		alt: "Cover模式",
		objectFit: "cover",
		style: {},
	},
	{
		title: "Contain",
		src: "https://picsum.photos/300/200?random=5",
		alt: "Contain模式",
		objectFit: "contain",
		style: { background: "#f0f0f0" },
	},
	{
		title: "Fill",
		src: "https://picsum.photos/300/200?random=6",
		alt: "Fill模式",
		objectFit: "fill",
		style: {},
	},
];

// 响应式数据
const imageSrc = ref("https://picsum.photos/200/200?random=10");
const imageMessage = ref("");
const imageMessageType = ref<"success" | "error" | "warning" | "info">("info");
const delayedImageSrc = ref("");
const skeletonImageSrc = ref("");
let imageCounter = 10;

// 事件处理函数
const handleImageLoad = (event: CustomEvent) => {
	imageMessage.value = `✅ 图片加载成功: ${event.detail.src}`;
	imageMessageType.value = "success";
	setTimeout(() => {
		imageMessage.value = "";
	}, 3000);
};

const handleImageError = (event: CustomEvent) => {
	imageMessage.value = `❌ 图片加载失败: ${event.detail.src}`;
	imageMessageType.value = "error";
	setTimeout(() => {
		imageMessage.value = "";
	}, 3000);
};

const changeImage = () => {
	imageCounter++;
	imageSrc.value = `https://picsum.photos/200/200?random=${imageCounter}`;
};

const loadInvalidImage = () => {
	imageSrc.value = "https://invalid-test-url.com/image.jpg";
};

const loadDelayedImage = () => {
	delayedImageSrc.value = "";
	setTimeout(() => {
		delayedImageSrc.value = `https://picsum.photos/200/200?random=delayed${Date.now()}`;
	}, 2000);
};

const loadSkeletonImage = () => {
	skeletonImageSrc.value = "";
	setTimeout(() => {
		skeletonImageSrc.value = `https://picsum.photos/200/200?random=skeleton${Date.now()}`;
	}, 3000);
};
</script>

<style scoped>
.component-demo {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.demo-container {
  margin-top: 0;
}

.demo-card {
  margin-bottom: 24px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.demo-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-left .el-icon {
  color: var(--primary-color);
}

.demo-section {
  padding: 8px 0;
}

.section-desc {
  margin-bottom: 24px;
  padding: 16px;
  background: var(--bg-body);
  border-radius: 6px;
  border-left: 4px solid var(--primary-color);
}

.section-desc p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
}

.image-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: var(--bg-body);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.image-item:hover {
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.image-title {
  font-weight: 500;
  text-align: center;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.image-actions {
  display: flex;
  justify-content: center;
}

.event-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.demo-image {
  padding: 20px;
  background: var(--bg-body);
  border: 1px dashed var(--border-color);
  border-radius: 8px;
}

.demo-controls {
  display: flex;
  justify-content: center;
}

.event-alert {
  max-width: 500px;
  width: 100%;
}

/* 自定义插槽样式 */
.custom-loading-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  gap: 12px;
}

.custom-error-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background: #ff6b6b;
  color: white;
  border-radius: 8px;
  padding: 20px;
  gap: 8px;
}

/* Element Plus 组件自定义样式 */
:deep(.el-card__header) {
  background: var(--bg-body);
  border-bottom: 1px solid var(--border-color);
  padding: 16px 20px;
}

:deep(.el-card__body) {
  padding: 20px;
}

:deep(.el-loading-spinner) {
  margin-bottom: 8px;
}

:deep(.el-skeleton) {
  width: 200px;
  height: 200px;
  padding: 16px;
}

:deep(.el-skeleton__item) {
  border-radius: 4px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .image-item {
    margin-bottom: 16px;
  }
  
  .event-demo {
    padding: 16px;
  }
}
</style>
