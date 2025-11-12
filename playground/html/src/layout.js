import { ButtonDemo } from './components/button-demo.js';
import { CarouselDemo } from './components/carousel-demo.js';
import { ImageDemo } from './components/image-demo.js';

// 组件列表
const components = [
  { id: 'button', demo: ButtonDemo, icon: '🔘' },
  { id: 'carousel', demo: CarouselDemo, icon: '🎠' },
  { id: 'image', demo: ImageDemo, icon: '🖼️' }
];

// 当前活动的 demo
let currentDemo = null;
let currentDemoId = null;

// 渲染布局
export function renderLayout() {
  const app = document.querySelector('#app');
  
  app.innerHTML = `
    <div class="layout-container">
      <!-- 侧边栏 -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <h1>Eos Components</h1>
          <span class="badge">HTML Playground</span>
        </div>
        <nav class="sidebar-nav">
          ${components.map(comp => `
            <button 
              class="nav-item" 
              data-component="${comp.id}"
            >
              <span class="nav-icon">${comp.icon}</span>
              <span class="nav-text">${comp.demo.title}</span>
            </button>
          `).join('')}
        </nav>
        <div class="sidebar-footer">
          <div class="version">v0.0.1</div>
        </div>
      </aside>
      
      <!-- 主内容区 -->
      <main class="main-content">
        <div id="demo-container">
          <div class="welcome">
            <h2>欢迎使用 Eos Components</h2>
            <p>请从左侧菜单选择一个组件查看演示</p>
          </div>
        </div>
      </main>
    </div>
  `;
  
  // 绑定导航事件
  bindNavigation();
  
  // 从 URL hash 读取初始组件
  const hash = window.location.hash.slice(1);
  if (hash && components.find(c => c.id === hash)) {
    loadDemo(hash);
  } else {
    // 默认加载第一个组件
    loadDemo(components[0].id);
  }
}

// 绑定导航事件
function bindNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const componentId = item.dataset.component;
      loadDemo(componentId);
    });
  });
  
  // 监听浏览器后退/前进
  window.addEventListener('popstate', (e) => {
    const hash = window.location.hash.slice(1);
    if (hash && components.find(c => c.id === hash)) {
      loadDemo(hash, false);
    }
  });
}

// 加载组件 demo
function loadDemo(componentId, updateHistory = true) {
  const component = components.find(c => c.id === componentId);
  if (!component) return;
  
  // 清理之前的 demo
  if (currentDemo && currentDemo.unmounted) {
    currentDemo.unmounted();
  }
  
  // 更新导航激活状态
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.dataset.component === componentId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
  
  // 渲染新的 demo
  const container = document.getElementById('demo-container');
  container.innerHTML = component.demo.render();
  
  // 执行 mounted 钩子
  if (component.demo.mounted) {
    // 使用 setTimeout 确保 DOM 已更新
    setTimeout(() => {
      component.demo.mounted();
    }, 0);
  }
  
  // 更新当前 demo
  currentDemo = component.demo;
  currentDemoId = componentId;
  
  // 更新 URL
  if (updateHistory) {
    window.location.hash = componentId;
  }
}
