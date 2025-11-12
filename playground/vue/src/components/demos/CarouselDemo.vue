<template>
  <div class="component-demo">
    <div class="demo-container">
      <!-- 基础用法 -->
      <el-card class="demo-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <el-icon><Mouse /></el-icon>
              <span>基础用法</span>
            </div>
            <el-tag size="small" type="info">Basic</el-tag>
          </div>
        </template>
        <div class="demo-section">
          <div class="section-desc">
            <p>基础的轮播图用法，支持自动播放、循环等特性。</p>
          </div>
          <div class="carousel-demo">
            <eos-carousel 
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
            </eos-carousel>
            
            <div class="slide-info">
              <el-alert 
                :title="`当前索引: ${currentSlide}`" 
                type="info" 
                :closable="false"
                show-icon
              />
            </div>
          </div>
        </div>
      </el-card>

      <!-- 媒体内容轮播 -->
      <el-card class="demo-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <el-icon><Film /></el-icon>
              <span>媒体内容轮播</span>
            </div>
            <el-tag size="small" type="primary">Media</el-tag>
          </div>
        </template>
        <div class="demo-section">
          <div class="section-desc">
            <p>支持图片、视频等媒体内容的轮播展示。</p>
          </div>
          <div class="carousel-demo">
            <eos-carousel :style="{ '--carousel-height': '400px' }">
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
                  <p>现代都市的繁华</p>
                </div>
              </div>
              <div class="media-slide">
                <img src="https://picsum.photos/800/400?random=3" alt="随机图片 3" />
                <div class="media-overlay">
                  <h3>海洋世界</h3>
                  <p>深海的神秘与美丽</p>
                </div>
              </div>
            </eos-carousel>
          </div>
        </div>
      </el-card>

      <!-- 控制选项 -->
      <el-card class="demo-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <el-icon><Setting /></el-icon>
              <span>控制选项</span>
            </div>
            <el-tag size="small" type="warning">Controls</el-tag>
          </div>
        </template>
        <div class="demo-section">
          <div class="section-desc">
            <p>丰富的控制选项，支持手动控制和自动播放设置。</p>
          </div>
          <div class="control-demo">
            <el-row :gutter="24">
              <el-col :span="12">
                <div class="control-group">
                  <h4>轮播设置</h4>
                  <el-space direction="vertical" style="width: 100%" size="large">
                    <div class="control-item">
                      <el-switch 
                        v-model="autoplay" 
                        active-text="自动播放"
                        @change="updateCarousel"
                      />
                    </div>
                    <div class="control-item">
                      <el-switch 
                        v-model="loop" 
                        active-text="循环播放"
                        @change="updateCarousel"
                      />
                    </div>
                    <div class="control-item">
                      <el-form-item label="播放间隔">
                        <el-input-number 
                          v-model="interval" 
                          :min="1000" 
                          :max="10000" 
                          :step="500"
                          @change="updateCarousel"
                        />
                        <span class="unit">毫秒</span>
                      </el-form-item>
                    </div>
                  </el-space>
                </div>
              </el-col>
              
              <el-col :span="12">
                <div class="control-group">
                  <h4>手动控制</h4>
                  <el-space direction="vertical" style="width: 100%" size="large">
                    <div class="control-item">
                      <el-space>
                        <el-button @click="prevSlide">
                          <el-icon><ArrowLeft /></el-icon>
                          上一张
                        </el-button>
                        <el-button @click="nextSlide">
                          <el-icon><ArrowRight /></el-icon>
                          下一张
                        </el-button>
                      </el-space>
                    </div>
                    <div class="control-item">
                      <el-button @click="goToSlide(0)" type="primary" style="width: 100%">
                        跳转到第一张
                      </el-button>
                    </div>
                  </el-space>
                </div>
              </el-col>
            </el-row>
            
            <div class="controlled-carousel">
              <eos-carousel 
                ref="controlledCarousel"
                :autoplay="autoplay"
                :interval="interval"
                :loop="loop"
                :style="{ '--carousel-height': '250px' }"
              >
                <div class="carousel-slide" v-for="i in 5" :key="i" :class="`gradient-${i}`">
                  <h2>第 {{ i }} 张幻灯片</h2>
                  <p>可控制的轮播内容</p>
                </div>
              </eos-carousel>
            </div>
          </div>
        </div>
      </el-card>

      <!-- API 文档 -->
      <el-card class="demo-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <el-icon><Document /></el-icon>
              <span>API 文档</span>
            </div>
            <el-tag size="small" type="info">API</el-tag>
          </div>
        </template>
        <div class="demo-section">
          <el-tabs v-model="activeTab" type="border-card">
            <el-tab-pane label="Props" name="props">
              <el-table :data="propsData" stripe style="width: 100%">
                <el-table-column prop="name" label="属性名" width="200" />
                <el-table-column prop="desc" label="说明" />
                <el-table-column prop="type" label="类型" width="120" />
                <el-table-column prop="default" label="默认值" width="120" />
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="Events" name="events">
              <el-table :data="eventsData" stripe style="width: 100%">
                <el-table-column prop="name" label="事件名" width="200" />
                <el-table-column prop="desc" label="说明" />
                <el-table-column prop="params" label="参数" width="200" />
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="Methods" name="methods">
              <el-table :data="methodsData" stripe style="width: 100%">
                <el-table-column prop="name" label="方法名" width="200" />
                <el-table-column prop="desc" label="说明" />
                <el-table-column prop="params" label="参数" width="200" />
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { ref } from "vue";

const currentSlide = ref(0);
const autoplay = ref(true);
const loop = ref(true);
const interval = ref(3000);
const activeTab = ref("props");
const controlledCarousel = ref();

const handleSlideChange = (event: CustomEvent) => {
	currentSlide.value = event.detail.index;
};

const updateCarousel = () => {
	// 轮播图会自动响应属性变化
};

const prevSlide = () => {
	controlledCarousel.value?.prev();
};

const nextSlide = () => {
	controlledCarousel.value?.next();
};

const goToSlide = (index: number) => {
	controlledCarousel.value?.goTo(index);
};

// API 数据
const propsData = [
	{
		name: "autoplay",
		desc: "是否自动播放",
		type: "boolean",
		default: "false",
	},
	{
		name: "interval",
		desc: "自动播放间隔时间",
		type: "number",
		default: "3000",
	},
	{
		name: "loop",
		desc: "是否循环播放",
		type: "boolean",
		default: "true",
	},
	{
		name: "height",
		desc: "轮播图高度",
		type: "string",
		default: "300px",
	},
];

const eventsData = [
	{
		name: "change",
		desc: "幻灯片切换时触发",
		params: "CustomEvent<{index: number}>",
	},
];

const methodsData = [
	{
		name: "prev()",
		desc: "切换到上一张幻灯片",
		params: "-",
	},
	{
		name: "next()",
		desc: "切换到下一张幻灯片",
		params: "-",
	},
	{
		name: "goTo(index)",
		desc: "切换到指定索引的幻灯片",
		params: "index: number",
	},
];
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

.carousel-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.slide-info {
  max-width: 200px;
}

/* 轮播图样式 */
.carousel-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  border-radius: 8px;
}

.carousel-slide h2 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 12px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.carousel-slide p {
  font-size: 18px;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

/* 渐变背景 */
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

.gradient-5 {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

/* 媒体轮播样式 */
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
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  padding: 30px;
  text-align: center;
}

.media-overlay h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}

.media-overlay p {
  font-size: 16px;
  opacity: 0.9;
}

/* 控制演示样式 */
.control-demo {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.control-group {
  background: var(--bg-body);
  padding: 24px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.control-group h4 {
  margin: 0 0 20px;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.unit {
  color: var(--text-secondary);
  font-size: 14px;
}

.controlled-carousel {
  margin-top: 20px;
  padding: 24px;
  background: var(--bg-body);
  border-radius: 8px;
  border: 1px solid var(--border-color);
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

:deep(.el-form-item__label) {
  color: var(--text-secondary);
}

:deep(.el-switch__label) {
  color: var(--text-primary);
}

:deep(.el-tabs__header) {
  margin-bottom: 20px;
}

:deep(.el-table th) {
  background: var(--bg-body);
  color: var(--text-primary);
  font-weight: 500;
}

:deep(.el-table td) {
  color: var(--text-secondary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .control-demo .el-col {
    margin-bottom: 16px;
  }
  
  .carousel-slide h2 {
    font-size: 24px;
  }
  
  .carousel-slide p {
    font-size: 14px;
  }
}
</style>
