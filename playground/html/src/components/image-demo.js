export class ImageDemo {
	constructor() {
		this.imageCounter = 10;
	}

	render(container) {
		container.innerHTML = `
      <div class="demo-card">
        <div class="card-header">
          <h2 class="card-title">基础图片</h2>
          <span class="card-badge">Basic</span>
        </div>
        <p class="card-subtitle">展示图片组件的基础用法</p>
        <div class="card-content">
          <div class="image-grid">
            <div class="image-item">
              <h4>普通图片</h4>
              <eos-image 
                src="https://picsum.photos/300/200?random=1" 
                alt="示例图片"
                width="300px"
                height="200px"
                style="border-radius: 8px;">
              </eos-image>
            </div>
            
            <div class="image-item">
              <h4>圆形图片</h4>
              <eos-image 
                src="https://picsum.photos/150/150?random=2" 
                alt="圆形图片"
                width="150px"
                height="150px"
                circle>
              </eos-image>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-card">
        <div class="card-header">
          <h2 class="card-title">Object-fit 模式</h2>
          <span class="card-badge" style="background: #ff9800;">Modes</span>
        </div>
        <p class="card-subtitle">展示不同的图片填充模式</p>
        <div class="card-content">
          <div class="button-group" style="justify-content: center;">
            <div class="image-item">
              <eos-image 
                src="https://picsum.photos/400/300?random=3" 
                alt="cover 模式"
                width="120px"
                height="120px"
                object-fit="cover"
                style="border: 1px solid #ddd; border-radius: 8px;">
              </eos-image>
              <p style="margin-top: 8px; font-size: 14px; color: #666;">cover</p>
            </div>
            
            <div class="image-item">
              <eos-image 
                src="https://picsum.photos/400/300?random=4" 
                alt="contain 模式"
                width="120px"
                height="120px"
                object-fit="contain"
                style="border: 1px solid #ddd; border-radius: 8px;">
              </eos-image>
              <p style="margin-top: 8px; font-size: 14px; color: #666;">contain</p>
            </div>
            
            <div class="image-item">
              <eos-image 
                src="https://picsum.photos/400/300?random=5" 
                alt="fill 模式"
                width="120px"
                height="120px"
                object-fit="fill"
                style="border: 1px solid #ddd; border-radius: 8px;">
              </eos-image>
              <p style="margin-top: 8px; font-size: 14px; color: #666;">fill</p>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-card">
        <div class="card-header">
          <h2 class="card-title">事件监听</h2>
          <span class="card-badge" style="background: #4caf50;">Events</span>
        </div>
        <p class="card-subtitle">图片组件支持加载和错误事件监听</p>
        <div class="card-content">
          <div class="event-demo">
            <eos-image 
              id="event-image"
              src="https://picsum.photos/300/200?random=${this.imageCounter}"
              alt="事件测试图片"
              width="300px"
              height="200px"
              style="border: 1px solid #ddd; border-radius: 8px;">
            </eos-image>
            
            <button id="generate-btn" style="
              margin-top: 16px;
              padding: 8px 16px;
              background: #1976d2;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            ">生成新图片</button>
            
            <div id="image-message" class="event-message" style="display: none;"></div>
          </div>
        </div>
      </div>

      <div class="demo-card">
        <div class="card-header">
          <h2 class="card-title">BlurHash 支持</h2>
          <span class="card-badge" style="background: #9c27b0;">Advanced</span>
        </div>
        <p class="card-subtitle">支持 BlurHash 模糊预览，提升用户体验</p>
        <div class="card-content">
          <div class="button-group" style="justify-content: center;">
            <div class="image-item">
              <eos-image 
                src="https://picsum.photos/200/150?random=6"
                alt="BlurHash 示例"
                width="200px"
                height="150px"
                blurhash="LyIXL4xYt7j[^-xWt7j[I:oIs;j]"
                style="border-radius: 8px;">
              </eos-image>
              <p style="margin-top: 8px; font-size: 14px; color: #666;">带 BlurHash 预览</p>
            </div>
            
            <div class="image-item">
              <eos-image 
                blurhash="LyIXL4xYt7j[^-xWt7j[I:oIs;j]"
                blurhash-only
                width="200px"
                height="150px"
                style="border-radius: 8px;">
              </eos-image>
              <p style="margin-top: 8px; font-size: 14px; color: #666;">仅显示 BlurHash</p>
            </div>
          </div>
        </div>
      </div>
    `;

		this.setupEventListeners();
	}

	setupEventListeners() {
		const eventImage = document.getElementById("event-image");
		const generateBtn = document.getElementById("generate-btn");
		const imageMessage = document.getElementById("image-message");

		if (eventImage) {
			eventImage.addEventListener("load", () => {
				imageMessage.textContent = "✓ 图片加载成功";
				imageMessage.className = "event-message success";
				imageMessage.style.display = "block";

				setTimeout(() => {
					imageMessage.style.display = "none";
				}, 2000);
			});

			eventImage.addEventListener("error", () => {
				imageMessage.textContent = "✗ 图片加载失败";
				imageMessage.className = "event-message error";
				imageMessage.style.display = "block";

				setTimeout(() => {
					imageMessage.style.display = "none";
				}, 2000);
			});
		}

		if (generateBtn) {
			generateBtn.addEventListener("click", () => {
				this.imageCounter++;
				eventImage.src = `https://picsum.photos/300/200?random=${this.imageCounter}`;
				imageMessage.style.display = "none";
			});
		}
	}
}
