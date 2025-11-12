export class ButtonDemo {
	constructor() {
		this.clickCount = 0;
		this.lastClickTime = "--:--:--";
	}

	render(container) {
		container.innerHTML = `
      <div class="demo-card">
        <div class="card-header">
          <h2 class="card-title">基础用法</h2>
          <span class="card-badge">Basic</span>
        </div>
        <p class="card-subtitle">展示基础的按钮组件用法</p>
        <div class="card-content">
          <h4>按钮类型</h4>
          <div class="button-group">
            <eos-button>默认按钮</eos-button>
            <eos-button type="primary">主要按钮</eos-button>
            <eos-button type="success">成功按钮</eos-button>
            <eos-button type="warning">警告按钮</eos-button>
            <eos-button type="danger">危险按钮</eos-button>
          </div>
          
          <h4>按钮状态</h4>
          <div class="button-group">
            <eos-button>普通状态</eos-button>
            <eos-button disabled>禁用状态</eos-button>
            <eos-button loading>加载中</eos-button>
          </div>
        </div>
      </div>

      <div class="demo-card">
        <div class="card-header">
          <h2 class="card-title">事件监听</h2>
          <span class="card-badge" style="background: #ff9800;">Events</span>
        </div>
        <p class="card-subtitle">按钮支持点击事件监听，可以获取点击的相关信息</p>
        <div class="card-content">
          <div class="event-demo">
            <eos-button id="event-btn" type="primary">点击我试试</eos-button>
            <div id="event-message" class="event-message" style="display: none;"></div>
          </div>
        </div>
      </div>

      <div class="demo-card">
        <div class="card-header">
          <h2 class="card-title">交互演示</h2>
          <span class="card-badge" style="background: #4caf50;">Interactive</span>
        </div>
        <p class="card-subtitle">完整的交互示例，展示按钮在实际场景中的应用</p>
        <div class="card-content">
          <div class="event-demo">
            <eos-button id="counter-btn" type="success">点击计数: ${this.clickCount}</eos-button>
          </div>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value" id="click-count">${this.clickCount}</div>
              <div class="stat-label">总点击次数</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="last-time">${this.lastClickTime}</div>
              <div class="stat-label">最后点击时间</div>
            </div>
          </div>
        </div>
      </div>
    `;

		this.setupEventListeners();
	}

	setupEventListeners() {
		// 事件监听演示
		const eventBtn = document.getElementById("event-btn");
		const eventMessage = document.getElementById("event-message");

		if (eventBtn) {
			eventBtn.addEventListener("e-click", (e) => {
				const message = `✓ ${e.detail.message}`;
				eventMessage.textContent = message;
				eventMessage.className = "event-message success";
				eventMessage.style.display = "block";

				setTimeout(() => {
					eventMessage.style.display = "none";
				}, 2000);
			});
		}

		// 计数器演示
		const counterBtn = document.getElementById("counter-btn");
		const clickCountEl = document.getElementById("click-count");
		const lastTimeEl = document.getElementById("last-time");

		if (counterBtn) {
			counterBtn.addEventListener("e-click", () => {
				this.clickCount++;
				this.lastClickTime = new Date().toLocaleTimeString("zh-CN");

				// 更新显示
				counterBtn.textContent = `点击计数: ${this.clickCount}`;
				clickCountEl.textContent = this.clickCount;
				lastTimeEl.textContent = this.lastClickTime;
			});
		}
	}
}
