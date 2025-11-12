<template>
  <div class="component-demo">
    <h2>Image 图片组件</h2>

    <!-- 基础用法 -->
    <div class="demo-block">
      <h3>基础用法</h3>
      <div class="demo-content">
        <div class="image-grid">
          <div class="image-item">
            <h4>默认加载</h4>
            <e-image 
              src="https://picsum.photos/200/200?random=1" 
              alt="示例图片"
              width="200"
              height="200">
            </e-image>
          </div>
          
          <div class="image-item">
            <h4>圆形图片</h4>
            <e-image 
              src="https://picsum.photos/200/200?random=2" 
              alt="圆形图片"
              circle
              width="200"
              height="200">
            </e-image>
          </div>
          
          <div class="image-item">
            <h4>加载失败（默认提示）</h4>
            <e-image 
              src="https://invalid-url.com/image.jpg" 
              alt="加载失败"
              width="200"
              height="200">
            </e-image>
          </div>
        </div>
      </div>
    </div>

    <!-- BlurHash 支持 -->
    <div class="demo-block">
      <h3>BlurHash 支持</h3>
      <div class="demo-content">
        <div class="image-grid">
          <div class="image-item">
            <h4>BlurHash 加载预览</h4>
            <e-image 
              src="https://picsum.photos/400/300?random=blurhash1" 
              blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
              alt="BlurHash 预览"
              width="200"
              height="200">
            </e-image>
          </div>
          <div class="image-item">
            <h4>仅显示 BlurHash</h4>
            <e-image 
              blurhash="LKO2:N%2Tw=w]~RBVZRi};RPxuwH"
              blurhash-only
              alt="仅 BlurHash"
              width="200"
              height="200">
            </e-image>
          </div>
          <div class="image-item">
            <h4>带 BlurHash 的慢加载</h4>
            <e-image 
              src="https://picsum.photos/800/600?random=blurhash2" 
              blurhash="L6PZfSjE.AyE_3t7t7R**0o#DgR4"
              alt="慢速加载"
              width="200"
              height="200">
            </e-image>
          </div>
        </div>
      </div>
    </div>

    <!-- 自定义插槽 -->
    <div class="demo-block">
      <h3>自定义插槽</h3>
      <div class="demo-content">
        <div class="image-grid">
          <div class="image-item">
            <h4>自定义 Loading</h4>
            <e-image 
              :src="delayedImageSrc"
              alt="自定义loading"
              width="200"
              height="200">
              <template #loading>
                <div class="custom-loading-slot">
                  <div class="pulse-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <p>精彩即将呈现...</p>
                </div>
              </template>
            </e-image>
            <button @click="loadDelayedImage" class="action-btn mini">加载图片</button>
          </div>
          
          <div class="image-item">
            <h4>自定义 Error</h4>
            <e-image 
              src="https://invalid-custom-error.com/image.jpg" 
              alt="自定义错误"
              width="200"
              height="200">
              <template #error>
                <div class="custom-error-slot">
                  <div class="error-icon">😢</div>
                  <p>哎呀，图片走丢了</p>
                  <button class="retry-btn" @click="$event.target.closest('e-image').setAttribute('src', 'https://picsum.photos/200/200?random=retry')">
                    重试
                  </button>
                </div>
              </template>
            </e-image>
          </div>

          <div class="image-item">
            <h4>骨架屏 Loading</h4>
            <e-image 
              :src="skeletonImageSrc"
              alt="骨架屏"
              width="200"
              height="200">
              <template #loading>
                <div class="skeleton-loading"></div>
              </template>
            </e-image>
            <button @click="loadSkeletonImage" class="action-btn mini">加载图片</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Object-fit 模式 -->
    <div class="demo-block">
      <h3>Object-fit 模式</h3>
      <div class="demo-content">
        <div class="image-grid">
          <div class="image-item">
            <h4>Cover（默认）</h4>
            <e-image 
              src="https://picsum.photos/300/200?random=4" 
              alt="Cover模式"
              object-fit="cover"
              width="200"
              height="200">
            </e-image>
          </div>
          
          <div class="image-item">
            <h4>Contain</h4>
            <e-image 
              src="https://picsum.photos/300/200?random=5" 
              alt="Contain模式"
              object-fit="contain"
              width="200"
              height="200"
              style="background: #f0f0f0;">
            </e-image>
          </div>
          
          <div class="image-item">
            <h4>Fill</h4>
            <e-image 
              src="https://picsum.photos/300/200?random=6" 
              alt="Fill模式"
              object-fit="fill"
              width="200"
              height="200">
            </e-image>
          </div>
        </div>
      </div>
    </div>

    <!-- 事件处理 -->
    <div class="demo-block">
      <h3>事件处理</h3>
      <div class="demo-content">
        <div class="image-item">
          <e-image 
            ref="eventImage"
            :src="imageSrc" 
            alt="事件监听示例"
            width="200"
            height="200"
            @load="handleImageLoad"
            @error="handleImageError">
          </e-image>
        </div>
        <div class="controls">
          <button @click="changeImage" class="action-btn">更换图片</button>
          <button @click="loadInvalidImage" class="action-btn">加载无效图片</button>
        </div>
        <div v-if="imageMessage" :class="['message', imageMessageType]">
          {{ imageMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const imageSrc = ref("https://picsum.photos/200/200?random=10");
const imageMessage = ref("");
const imageMessageType = ref("");
const delayedImageSrc = ref("");
const skeletonImageSrc = ref("");
let imageCounter = 10;

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

const handleCustomErrorRetry = (event: Event) => {
	// 找到最近的 e-image 元素并重试
	const target = event.target as HTMLElement;
	const imageEl = target?.closest('e-image') as any;
	imageEl?.setAttribute('src', 'https://picsum.photos/200/200?random=retry');
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

/* 图片网格 */
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
}

.image-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.image-item h4 {
  margin: 0 0 10px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
}

/* 控制按钮 */
.controls {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  justify-content: center;
}

.action-btn {
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

.action-btn:hover {
  color: var(--primary-color-hover);
  border-color: var(--primary-color-hover);
}

.action-btn:active {
  color: var(--primary-color-active);
  border-color: var(--primary-color-active);
}

.action-btn.mini {
  padding: 6px 12px;
  font-size: 12px;
  margin-top: 10px;
}

/* 自定义 Loading 插槽样式 */
.custom-loading-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
}

.pulse-loader {
  display: flex;
  gap: 5px;
  margin-bottom: 15px;
}

.pulse-loader div {
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  animation: pulse 1.4s ease-in-out infinite;
}

.pulse-loader div:nth-child(2) {
  animation-delay: 0.2s;
}

.pulse-loader div:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%, 60%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  30% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* 自定义 Error 插槽样式 */
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
}

.error-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.retry-btn {
  padding: 6px 12px;
  background: white;
  color: #ff6b6b;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
  transition: opacity 0.2s;
}

.retry-btn:hover {
  opacity: 0.9;
}

/* 骨架屏 Loading */
.skeleton-loading {
  width: 200px;
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.message {
  margin-top: 15px;
  padding: 10px 15px;
  border-radius: 6px;
  text-align: center;
  font-size: 14px;
  animation: fadeIn 0.3s ease;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
