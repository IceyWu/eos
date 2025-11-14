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

      <!-- 懒加载演示 -->
      <el-card class="demo-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <el-icon><View /></el-icon>
              <span>懒加载</span>
            </div>
            <el-tag size="small" type="success">Lazy Loading</el-tag>
          </div>
        </template>
        <div class="demo-section">
          <div class="section-desc">
            <p>图片懒加载功能，只有当图片进入视口时才开始加载，优化页面性能。</p>
          </div>
          <el-row :gutter="24">
            <el-col :span="8" v-for="(item, index) in lazyImages" :key="index">
              <div class="image-item">
                <div class="image-title">
                  <el-text type="info">{{ item.title }}</el-text>
                </div>
                <div class="image-wrapper" :style="{ marginBottom: item.spacing }">
                  <eos-image 
                    :src="item.src"
                    :alt="item.alt"
                    :loading="item.loading"
                    :placeholder="item.placeholder"
                    :placeholder-type="item.placeholderType"
                    width="200"
                    height="200">
                  </eos-image>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <!-- Placeholder Fill 演示 -->
      <el-card class="demo-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <el-icon><FullScreen /></el-icon>
              <span>Placeholder Fill</span>
            </div>
            <el-tag size="small" type="primary">Fill Mode</el-tag>
          </div>
        </template>
        <div class="demo-section">
          <div class="section-desc">
            <p>placeholder-fill 模式对比：控制占位符是否作为背景填充，避免图片留白。</p>
          </div>
          <el-row :gutter="24">
            <el-col :span="12" v-for="(item, index) in fillImages" :key="index">
              <div class="image-item">
                <div class="image-title">
                  <el-text type="info">{{ item.title }}</el-text>
                  <el-tag size="small" :type="item.placeholderFill ? 'success' : 'info'">
                    {{ item.placeholderFill ? 'Fill 开启' : 'Fill 关闭' }}
                  </el-tag>
                </div>
                <div class="image-wrapper">
                  <eos-image 
                    :src="item.src"
                    :alt="item.alt"
                    :placeholder="item.placeholder"
                    :placeholder-type="item.placeholderType"
                    :placeholder-fill="item.placeholderFill"
                    :object-fit="item.objectFit"
                    width="400"
                    height="200">
                  </eos-image>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <!-- BlurHash 占位符 -->
      <el-card class="demo-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <el-icon><MagicStick /></el-icon>
              <span>BlurHash 占位符</span>
            </div>
            <el-tag size="small" type="primary">Placeholder</el-tag>
          </div>
        </template>
        <div class="demo-section">
          <div class="section-desc">
            <p>使用 BlurHash 作为占位符，在图片加载时显示模糊预览。</p>
          </div>
          <el-row :gutter="24">
            <el-col :span="8" v-for="(item, index) in placeholderImages" :key="index">
              <div class="image-item">
                <div class="image-title">
                  <el-text type="info">{{ item.title }}</el-text>
                </div>
                <div class="image-wrapper">
                  <eos-image 
                    :src="item.src"
                    :src-type="item.srcType"
                    :placeholder="item.placeholder"
                    :placeholder-type="item.placeholderType"
                    :show-delay="item.showDelay"
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

      <!-- BlurHash 直接显示 -->
      <el-card class="demo-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <el-icon><Picture /></el-icon>
              <span>BlurHash 直接显示</span>
            </div>
            <el-tag size="small" type="success">Direct</el-tag>
          </div>
        </template>
        <div class="demo-section">
          <div class="section-desc">
            <p>直接显示 BlurHash 解码后的图片，无需加载过程，适合纯装饰性图片。</p>
          </div>
          <el-row :gutter="24">
            <el-col :span="8" v-for="(item, index) in blurhashDirectImages" :key="index">
              <div class="image-item">
                <div class="image-title">
                  <el-text type="info">{{ item.title }}</el-text>
                </div>
                <div class="image-wrapper">
                  <eos-image 
                    :src="item.blurhash"
                    src-type="blurhash"
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

      <!-- 综合示例 -->
      <el-card class="demo-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <el-icon><Tools /></el-icon>
              <span>综合示例</span>
            </div>
            <el-tag size="small" type="danger">Advanced</el-tag>
          </div>
        </template>
        <div class="demo-section">
          <div class="section-desc">
            <p>展示多种参数组合的实际应用场景。</p>
          </div>
          <el-row :gutter="24">
            <el-col :span="8">
              <div class="image-item">
                <div class="image-title">
                  <el-text type="info">头像加载</el-text>
                </div>
                <div class="image-wrapper">
                  <eos-image 
                    src="https://i.pravatar.cc/200?img=3"
                    src-type="url"
                    placeholder="L4SPj[4n00_3?b%MD$Rj~q%MM{of"
                    placeholder-type="blurhash"
                    alt="用户头像"
                    circle
                    width="120"
                    height="120"
                    object-fit="cover">
                  </eos-image>
                </div>
              </div>
            </el-col>
            
            <el-col :span="8">
              <div class="image-item">
                <div class="image-title">
                  <el-text type="info">Banner 图</el-text>
                </div>
                <div class="image-wrapper">
                  <eos-image 
                    src="https://picsum.photos/400/150?random=banner"
                    src-type="url"
                    placeholder="LGF5]+Yk^6#M@-5c,1J5@[or[Q6."
                    placeholder-type="blurhash"
                    alt="Banner"
                    width="300"
                    height="120"
                    object-fit="cover">
                  </eos-image>
                </div>
              </div>
            </el-col>

            <el-col :span="8">
              <div class="image-item">
                <div class="image-title">
                  <el-text type="info">装饰图案</el-text>
                </div>
                <div class="image-wrapper">
                  <eos-image 
                    src="L~I#+9xuRjj[_4t7aej[xvWBofae"
                    src-type="blurhash"
                    alt="装饰图案"
                    width="120"
                    height="120">
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
		src: "https://lpalette.oss-accelerate.aliyuncs.com/nestTest/1/1761482348818.jpg?x-oss-process=image/resize,l_300",
		alt: "示例图片",
		circle: false,
	},
	{
		title: "圆形图片",
		src: "https://lpalette.oss-accelerate.aliyuncs.com/nestTest/1/1761482347927.jpg?x-oss-process=image/resize,l_300",
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

// 懒加载图片数据
const lazyImages = [
	{
		title: "立即加载",
		src: "https://lpalette.oss-accelerate.aliyuncs.com/nestTest/1/1761482348818.jpg?x-oss-process=image/resize,l_400",
		alt: "立即加载",
		loading: "",
		placeholder: "LTI6A^?wayRPyGD$j[t8oMj?WBay",
		placeholderType: "blurhash",
		spacing: "0",
	},
	{
		title: "懒加载 - 向下滚动查看",
		src: "https://lpalette.oss-accelerate.aliyuncs.com/nestTest/1/1761482347927.jpg?x-oss-process=image/resize,l_400",
		alt: "懒加载图片",
		loading: "lazy",
		placeholder: "LDKeAr8^4oxu0-8_V?xu~W%g%MtR",
		placeholderType: "blurhash",
		spacing: "150vh",
	},
	{
		title: "更多懒加载",
		src: "https://lpalette.oss-accelerate.aliyuncs.com/nestTest/1/1761482348818.jpg?x-oss-process=image/resize,l_400",
		alt: "更多懒加载",
		loading: "lazy",
		placeholder: "LTI6A^?wayRPyGD$j[t8oMj?WBay",
		placeholderType: "blurhash",
		spacing: "100vh",
	},
];

// Placeholder Fill 对比数据
const fillImages = [
	{
		title: "关闭 Placeholder Fill",
		src: "https://lpalette.oss-accelerate.aliyuncs.com/nestTest/1/1761482347927.jpg?x-oss-process=image/resize,l_400",
		alt: "关闭填充",
		placeholder: "LDKeAr8^4oxu0-8_V?xu~W%g%MtR",
		placeholderType: "blurhash",
		placeholderFill: false,
		objectFit: "contain",
	},
	{
		title: "开启 Placeholder Fill",
		src: "https://lpalette.oss-accelerate.aliyuncs.com/nestTest/1/1761482347927.jpg?x-oss-process=image/resize,l_400",
		alt: "开启填充",
		placeholder: "LDKeAr8^4oxu0-8_V?xu~W%g%MtR",
		placeholderType: "blurhash",
		placeholderFill: true,
		objectFit: "contain",
	},
];

// 占位符图片数据  
const placeholderImages = [
	{
		title: "BlurHash 占位符",
		src: "https://lpalette.oss-accelerate.aliyuncs.com/nestTest/1/1761482348818.jpg?x-oss-process=image/resize,l_400",
		srcType: "url",
		placeholder: "LTI6A^?wayRPyGD$j[t8oMj?WBay",
		placeholderType: "blurhash",
		alt: "BlurHash 占位符",
	},
	{
		title: "延迟加载效果",
		src: "https://lpalette.oss-accelerate.aliyuncs.com/nestTest/1/1761482347927.jpg?x-oss-process=image/resize,l_400",
		srcType: "url",
		placeholder: "LDKeAr8^4oxu0-8_V?xu~W%g%MtR",
		placeholderType: "blurhash",
		alt: "延迟加载",
		showDelay: 2000,
	},
	{
		title: "快速加载",
		src: "https://lpalette.oss-accelerate.aliyuncs.com/nestTest/1/1761482348818.jpg?x-oss-process=image/resize,l_400",
		srcType: "url", 
		placeholder: "LTI6A^?wayRPyGD$j[t8oMj?WBay",
		placeholderType: "blurhash",
		alt: "快速加载",
	},
];

// BlurHash 直接显示数据
const blurhashDirectImages = [
	{
		title: "紫色渐变",
		blurhash: "LKO2:N%2Tw=w]~RBVZRi};RPxuwH",
		alt: "紫色渐变",
		circle: false,
	},
	{
		title: "橙色渐变（圆形）",
		blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
		alt: "橙色渐变",
		circle: true,
	},
	{
		title: "蓝绿渐变",
		blurhash: "L6PZfSjE.AyE_3t7t7R**0o#DgR4",
		alt: "蓝绿渐变",
		circle: false,
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
const imageSrc = ref("https://lpalette.oss-accelerate.aliyuncs.com/nestTest/1/1761482348818.jpg?x-oss-process=image/resize,l_300");
const imageMessage = ref("");
const imageMessageType = ref<"success" | "error" | "warning" | "info">("info");
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
	imageSrc.value = `https://lpalette.oss-accelerate.aliyuncs.com/nestTest/1/1761482348818.jpg?x-oss-process=image/resize,l_300&random=${imageCounter}`;
};

const loadInvalidImage = () => {
	imageSrc.value = "https://invalid-test-url.com/image.jpg";
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

/* Element Plus 组件自定义样式 */
:deep(.el-card__header) {
  background: var(--bg-body);
  border-bottom: 1px solid var(--border-color);
  padding: 16px 20px;
}

:deep(.el-card__body) {
  padding: 20px;
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
