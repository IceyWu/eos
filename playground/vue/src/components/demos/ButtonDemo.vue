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
            <p>基础的按钮用法，支持多种类型和状态。</p>
          </div>
          <div class="button-showcase">
            <div class="button-group">
              <h4>按钮类型</h4>
              <div class="button-row">
                <eos-button>默认按钮</eos-button>
                <eos-button type="primary">主要按钮</eos-button>
                <eos-button type="success">成功按钮</eos-button>
                <eos-button type="warning">警告按钮</eos-button>
                <eos-button type="danger">危险按钮</eos-button>
              </div>
            </div>
            
            <div class="button-group">
              <h4>按钮状态</h4>
              <div class="button-row">
                <eos-button>普通状态</eos-button>
                <eos-button disabled>禁用状态</eos-button>
                <eos-button loading>加载中</eos-button>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 事件监听 -->
      <el-card class="demo-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <el-icon><Bell /></el-icon>
              <span>事件监听</span>
            </div>
            <el-tag size="small" type="warning">Events</el-tag>
          </div>
        </template>
        <div class="demo-section">
          <div class="section-desc">
            <p>按钮支持点击事件监听，可以获取点击的相关信息。</p>
          </div>
          <div class="event-demo">
            <eos-button @e-click="handleClick" type="primary" size="large">
              <el-icon><Pointer /></el-icon>
              点击我试试
            </eos-button>
            
            <transition name="el-fade-in">
              <el-alert
                v-if="showSuccess"
                :title="outputMessage"
                type="success"
                :closable="false"
                show-icon
                class="event-alert"
              />
            </transition>
          </div>
        </div>
      </el-card>

      <!-- 计数器演示 -->
      <el-card class="demo-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <el-icon><DataAnalysis /></el-icon>
              <span>交互演示</span>
            </div>
            <el-tag size="small" type="success">Interactive</el-tag>
          </div>
        </template>
        <div class="demo-section">
          <div class="section-desc">
            <p>完整的交互示例，展示按钮在实际场景中的应用。</p>
          </div>
          <div class="counter-demo">
            <div class="action-area">
              <eos-button @e-click="handleCounter" type="success" size="large">
                <el-icon><Plus /></el-icon>
                点击计数
              </eos-button>
            </div>
            
            <el-row :gutter="24" class="stats-row">
              <el-col :span="12">
                <el-card shadow="hover" class="stat-card">
                  <el-statistic title="总点击次数" :value="clickCount">
                    <template #suffix>
                      <el-icon><Pointer /></el-icon>
                    </template>
                  </el-statistic>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card shadow="hover" class="stat-card">
                  <el-statistic title="最后点击时间" :value="lastClickTime">
                    <template #suffix>
                      <el-icon><Clock /></el-icon>
                    </template>
                  </el-statistic>
                </el-card>
              </el-col>
            </el-row>
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
          </el-tabs>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const outputMessage = ref("👆 点击按钮查看效果");
const showSuccess = ref(false);
const clickCount = ref(0);
const lastClickTime = ref("--:--:--");
const activeTab = ref("props");

const handleClick = (e: CustomEvent) => {
	outputMessage.value = `✓ ${e.detail.message}`;
	showSuccess.value = true;

	setTimeout(() => {
		showSuccess.value = false;
	}, 3000);
};

const handleCounter = () => {
	clickCount.value++;
	lastClickTime.value = new Date().toLocaleTimeString("zh-CN");
};

// API 数据
const propsData = [
	{
		name: "type",
		desc: "按钮类型",
		type: "string",
		default: "default",
	},
	{
		name: "size",
		desc: "按钮大小",
		type: "string",
		default: "medium",
	},
	{
		name: "disabled",
		desc: "是否禁用",
		type: "boolean",
		default: "false",
	},
	{
		name: "loading",
		desc: "是否加载中",
		type: "boolean",
		default: "false",
	},
];

const eventsData = [
	{
		name: "e-click",
		desc: "点击事件",
		params: "CustomEvent<{message: string}>",
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

.button-showcase {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.button-group h4 {
  margin: 0 0 16px;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
}

.button-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}

.event-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
}

.event-alert {
  max-width: 400px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.counter-demo {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.action-area {
  text-align: center;
  padding: 24px;
  background: var(--bg-body);
  border-radius: 8px;
  border: 1px dashed var(--border-color);
}

.stats-row {
  margin-top: 16px;
}

.stat-card {
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
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

:deep(.el-statistic__content) {
  color: var(--primary-color);
}

:deep(.el-statistic__head) {
  color: var(--text-secondary);
  margin-bottom: 8px;
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
  .button-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .stats-row .el-col {
    margin-bottom: 16px;
  }
}
</style>
