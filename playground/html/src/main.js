import './style.css'
import { registerComponents } from "@eosjs/components";

// 注册 Web Components
registerComponents();

document.querySelector("#app").innerHTML = `
  <div class="container">
    <h1>🎮 HTML Demo</h1>
    <span class="badge">原生 HTML + Eos Components</span>
    
    <div class="demo-section">
      <h2>Carousel 轮播图</h2>
      <div class="demo-area">
        <e-carousel id="carousel-basic" autoplay interval="3000" loop style="--carousel-height: 300px;">
          <div class="slide" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 48px; font-weight: bold;">
            Slide 1
          </div>
          <div class="slide" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 48px; font-weight: bold;">
            Slide 2
          </div>
          <div class="slide" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 48px; font-weight: bold;">
            Slide 3
          </div>
          <div class="slide" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 48px; font-weight: bold;">
            Slide 4
          </div>
        </e-carousel>
      </div>
      <div class="output" id="carousel-output">
        当前 Slide: 0
      </div>
    </div>

    <div class="demo-section">
      <h2>手动控制轮播图</h2>
      <div class="demo-area">
        <e-carousel id="carousel-manual" style="--carousel-height: 250px;">
          <div class="slide" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 36px;">
            🎨 图片 1
          </div>
          <div class="slide" style="background: linear-gradient(135deg, #30cfd0 0%, #330867 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 36px;">
            🎭 图片 2
          </div>
          <div class="slide" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); display: flex; align-items: center; justify-content: center; color: #333; font-size: 36px;">
            🎪 图片 3
          </div>
        </e-carousel>
      </div>
    </div>
    
    <div class="demo-section">
      <h2>Button 按钮</h2>
      <div class="demo-area">
        <e-button>默认按钮</e-button>
        <e-button>提交</e-button>
        <e-button>取消</e-button>
      </div>
    </div>
    
    <div class="demo-section">
      <h2>事件监听</h2>
      <div class="demo-area">
        <e-button id="event-button">点击我</e-button>
      </div>
      <div class="output" id="output">
        👆 点击按钮查看效果
      </div>
    </div>
    
    <div class="demo-section">
      <h2>计数器演示</h2>
      <div class="demo-area">
        <e-button id="counter-button">点击计数</e-button>
      </div>
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
`;

// 事件监听演示
const eventButton = document.getElementById("event-button");
const output = document.getElementById("output");

eventButton.addEventListener("e-click", (e) => {
	output.className = "output success";
	output.textContent = `✓ ${e.detail.message}`;

	setTimeout(() => {
		output.className = "output";
		output.textContent = "👆 点击按钮查看效果";
	}, 2000);
});

// 计数器演示
const counterButton = document.getElementById("counter-button");
const clickCount = document.getElementById("click-count");
const lastTime = document.getElementById("last-time");
let count = 0;

counterButton.addEventListener("e-click", () => {
	count++;
	clickCount.textContent = count;
	lastTime.textContent = new Date().toLocaleTimeString("zh-CN");
});

// Carousel 事件监听
const carouselBasic = document.getElementById("carousel-basic");
const carouselOutput = document.getElementById("carousel-output");

carouselBasic.addEventListener("change", (e) => {
	carouselOutput.textContent = `当前 Slide: ${e.detail.currentIndex}`;
});

carouselBasic.addEventListener("slide-click", (e) => {
	console.log("Slide clicked:", e.detail.index);
});
