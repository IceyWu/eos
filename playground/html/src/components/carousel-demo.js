export class CarouselDemo {
	constructor() {
		this.currentSlide = 0;
		this.autoplay = true;
		this.loop = true;
		this.interval = 3000;
	}

	render(container) {
		container.innerHTML = `
      <div class="demo-card">
        <div class="card-header">
          <h2 class="card-title">基础轮播</h2>
          <span class="card-badge">Basic</span>
        </div>
        <p class="card-subtitle">展示轮播图组件的基础用法</p>
        <div class="card-content">
          <eos-carousel
            id="basic-carousel"
            autoplay
            interval="3000"
            loop
            style="--carousel-height: 300px; border-radius: 8px; overflow: hidden;">
            <div style="
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              height: 300px;
            ">
              <div style="text-align: center;">
                <h2 style="margin: 0 0 8px 0; font-size: 24px;">第一张幻灯片</h2>
                <p style="margin: 0; font-size: 16px; opacity: 0.9;">自动播放内容</p>
              </div>
            </div>
            <div style="
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              height: 300px;
            ">
              <div style="text-align: center;">
                <h2 style="margin: 0 0 8px 0; font-size: 24px;">第二张幻灯片</h2>
                <p style="margin: 0; font-size: 16px; opacity: 0.9;">支持自定义内容</p>
              </div>
            </div>
            <div style="
              background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              height: 300px;
            ">
              <div style="text-align: center;">
                <h2 style="margin: 0 0 8px 0; font-size: 24px;">第三张幻灯片</h2>
                <p style="margin: 0; font-size: 16px; opacity: 0.9;">响应式设计</p>
              </div>
            </div>
          </eos-carousel>
          
          <div style="text-align: center; margin-top: 12px; color: #666; font-size: 14px;">
            当前幻灯片: <span id="slide-info">1</span>
          </div>
        </div>
      </div>

      <div class="demo-card">
        <div class="card-header">
          <h2 class="card-title">控制选项</h2>
          <span class="card-badge" style="background: #ff9800;">Controls</span>
        </div>
        <p class="card-subtitle">动态控制轮播图的各种参数和行为</p>
        <div class="card-content">
          <div class="controls-panel">
            <div class="control-section">
              <h4>参数设置</h4>
              <div class="control-group">
                <div class="control-item">
                  <label>自动播放</label>
                  <input type="checkbox" id="autoplay-toggle" checked>
                </div>
                <div class="control-item">
                  <label>循环播放</label>
                  <input type="checkbox" id="loop-toggle" checked>
                </div>
                <div class="control-item">
                  <label>间隔时间 (ms)</label>
                  <input type="number" id="interval-input" value="3000" min="1000" max="10000" step="500" style="
                    padding: 4px 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    width: 100px;
                  ">
                </div>
              </div>
            </div>
            
            <div class="control-section">
              <h4>手动控制</h4>
              <div class="control-buttons">
                <button id="prev-btn" style="
                  padding: 8px 16px;
                  background: #1976d2;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  margin-right: 8px;
                ">上一张</button>
                <button id="next-btn" style="
                  padding: 8px 16px;
                  background: #1976d2;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  margin-right: 8px;
                ">下一张</button>
                <button id="goto-first-btn" style="
                  padding: 8px 16px;
                  background: #4caf50;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                ">跳转到第一张</button>
              </div>
            </div>
          </div>

          <div style="border-top: 1px solid #e0e0e0; padding-top: 24px; margin-top: 24px;">
            <h4>受控轮播</h4>
            <eos-carousel 
              id="controlled-carousel"
              autoplay
              interval="3000"
              loop
              style="--carousel-height: 250px; border-radius: 8px; overflow: hidden;">
              <div style="
                background: linear-gradient(135deg, hsl(0, 70%, 60%) 0%, hsl(30, 70%, 50%) 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                height: 250px;
              ">
                <div style="text-align: center;">
                  <h2 style="margin: 0 0 8px 0; font-size: 20px;">第 1 张幻灯片</h2>
                  <p style="margin: 0; font-size: 14px; opacity: 0.9;">可控制的轮播内容</p>
                </div>
              </div>
              <div style="
                background: linear-gradient(135deg, hsl(60, 70%, 60%) 0%, hsl(90, 70%, 50%) 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                height: 250px;
              ">
                <div style="text-align: center;">
                  <h2 style="margin: 0 0 8px 0; font-size: 20px;">第 2 张幻灯片</h2>
                  <p style="margin: 0; font-size: 14px; opacity: 0.9;">可控制的轮播内容</p>
                </div>
              </div>
              <div style="
                background: linear-gradient(135deg, hsl(120, 70%, 60%) 0%, hsl(150, 70%, 50%) 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                height: 250px;
              ">
                <div style="text-align: center;">
                  <h2 style="margin: 0 0 8px 0; font-size: 20px;">第 3 张幻灯片</h2>
                  <p style="margin: 0; font-size: 14px; opacity: 0.9;">可控制的轮播内容</p>
                </div>
              </div>
            </eos-carousel>
          </div>
        </div>
      </div>
    `;

		this.setupEventListeners();
	}

	setupEventListeners() {
		const basicCarousel = document.getElementById("basic-carousel");
		const controlledCarousel = document.getElementById("controlled-carousel");
		const slideInfo = document.getElementById("slide-info");

		// 监听轮播变化
		if (basicCarousel) {
			basicCarousel.addEventListener("change", (e) => {
				this.currentSlide = e.detail.currentIndex;
				slideInfo.textContent = this.currentSlide + 1;
			});
		}

		// 控制选项
		const autoplayToggle = document.getElementById("autoplay-toggle");
		const loopToggle = document.getElementById("loop-toggle");
		const intervalInput = document.getElementById("interval-input");

		if (autoplayToggle) {
			autoplayToggle.addEventListener("change", (e) => {
				this.autoplay = e.target.checked;
				this.updateCarouselSettings();
			});
		}

		if (loopToggle) {
			loopToggle.addEventListener("change", (e) => {
				this.loop = e.target.checked;
				this.updateCarouselSettings();
			});
		}

		if (intervalInput) {
			intervalInput.addEventListener("change", (e) => {
				this.interval = parseInt(e.target.value, 10);
				this.updateCarouselSettings();
			});
		}

		// 手动控制按钮
		const prevBtn = document.getElementById("prev-btn");
		const nextBtn = document.getElementById("next-btn");
		const gotoFirstBtn = document.getElementById("goto-first-btn");

		if (prevBtn && controlledCarousel) {
			prevBtn.addEventListener("click", () => {
				controlledCarousel.prev();
			});
		}

		if (nextBtn && controlledCarousel) {
			nextBtn.addEventListener("click", () => {
				controlledCarousel.next();
			});
		}

		if (gotoFirstBtn && controlledCarousel) {
			gotoFirstBtn.addEventListener("click", () => {
				controlledCarousel.goTo(0);
			});
		}
	}

	updateCarouselSettings() {
		const controlledCarousel = document.getElementById("controlled-carousel");
		if (controlledCarousel) {
			controlledCarousel.autoplay = this.autoplay;
			controlledCarousel.loop = this.loop;
			controlledCarousel.interval = this.interval.toString();
		}
	}
}
