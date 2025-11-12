export const ButtonDemo = {
  title: 'Button 按钮',
  render: () => `
    <div class="component-demo">
      <h2>Button 按钮组件</h2>
      
      <div class="demo-block">
        <h3>基础用法</h3>
        <div class="demo-content">
          <e-button>默认按钮</e-button>
          <e-button>提交</e-button>
          <e-button>取消</e-button>
        </div>
      </div>
      
      <div class="demo-block">
        <h3>事件监听</h3>
        <div class="demo-content">
          <e-button id="event-button">点击我</e-button>
          <div class="output" id="output">
            👆 点击按钮查看效果
          </div>
        </div>
      </div>
      
      <div class="demo-block">
        <h3>计数器演示</h3>
        <div class="demo-content">
          <e-button id="counter-button">点击计数</e-button>
          <div class="stats">
            <div class="stat-card">
              <div class="stat-value" id="click-count">0</div>
              <div class="stat-label">点击次数</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="last-time">--:--:--</div>
              <div class="stat-label">最后点击</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  
  mounted: () => {
    // 事件监听演示
    const eventButton = document.getElementById("event-button");
    const output = document.getElementById("output");
    
    if (eventButton) {
      eventButton.addEventListener("e-click", (e) => {
        output.className = "output success";
        output.textContent = `✓ ${e.detail.message}`;
        
        setTimeout(() => {
          output.className = "output";
          output.textContent = "👆 点击按钮查看效果";
        }, 2000);
      });
    }
    
    // 计数器演示
    const counterButton = document.getElementById("counter-button");
    const clickCount = document.getElementById("click-count");
    const lastTime = document.getElementById("last-time");
    let count = 0;
    
    if (counterButton) {
      counterButton.addEventListener("e-click", () => {
        count++;
        clickCount.textContent = count;
        lastTime.textContent = new Date().toLocaleTimeString("zh-CN");
      });
    }
  },
  
  unmounted: () => {
    // 清理事件监听器
    const eventButton = document.getElementById("event-button");
    const counterButton = document.getElementById("counter-button");
    
    if (eventButton) {
      eventButton.removeEventListener("e-click", () => {});
    }
    if (counterButton) {
      counterButton.removeEventListener("e-click", () => {});
    }
  }
};
