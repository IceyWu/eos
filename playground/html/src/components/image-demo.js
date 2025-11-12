export const ImageDemo = {
  title: 'Image 图片',
  render: () => `
    <div class="component-demo">
      <h2>Image 图片组件</h2>
      
      <div class="demo-block">
        <h3>基础用法</h3>
        <div class="demo-content image-grid">
          <div class="image-item">
            <p>默认加载</p>
            <e-image 
              src="https://picsum.photos/200/200?random=1" 
              alt="示例图片"
              width="200"
              height="200">
            </e-image>
          </div>
          
          <div class="image-item">
            <p>圆形图片</p>
            <e-image 
              src="https://picsum.photos/200/200?random=2" 
              alt="圆形图片"
              circle
              width="200"
              height="200">
            </e-image>
          </div>
          
          <div class="image-item">
            <p>加载失败</p>
            <e-image 
              src="https://invalid-url.com/image.jpg" 
              alt="加载失败"
              width="200"
              height="200">
            </e-image>
          </div>
        </div>
      </div>

      <div class="demo-block">
        <h3>BlurHash 支持</h3>
        <div class="demo-content image-grid">
          <div class="image-item">
            <p>BlurHash 加载预览</p>
            <e-image 
              src="https://picsum.photos/400/300?random=blurhash1" 
              blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
              alt="BlurHash 预览"
              width="200"
              height="200">
            </e-image>
          </div>
          
          <div class="image-item">
            <p>仅显示 BlurHash</p>
            <e-image 
              blurhash="LKO2:N%2Tw=w]~RBVZRi};RPxuwH"
              blurhash-only
              alt="仅 BlurHash"
              width="200"
              height="200">
            </e-image>
          </div>
          
          <div class="image-item">
            <p>带 BlurHash 的慢加载</p>
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
      
      <div class="demo-block">
        <h3>自定义插槽</h3>
        <div class="demo-content image-grid">
          <div class="image-item">
            <p>自定义 Loading</p>
            <e-image 
              src="https://picsum.photos/200/200?random=loading" 
              alt="自定义loading"
              width="200"
              height="200">
              <div slot="loading" class="custom-loading">
                <div class="spinner"></div>
                <p>精彩即将呈现...</p>
              </div>
            </e-image>
          </div>
          
          <div class="image-item">
            <p>自定义 Error</p>
            <e-image 
              src="https://invalid-custom-error.com/image.jpg" 
              alt="自定义错误"
              width="200"
              height="200">
              <div slot="error" class="custom-error">
                <div class="error-icon">😢</div>
                <p>图片走丢了</p>
                <button class="retry-btn">重试</button>
              </div>
            </e-image>
          </div>
          
          <div class="image-item">
            <p>骨架屏 Loading</p>
            <e-image 
              src="https://picsum.photos/200/200?random=skeleton" 
              alt="骨架屏"
              width="200"
              height="200">
              <div slot="loading" class="skeleton-loading"></div>
            </e-image>
          </div>
        </div>
      </div>
      
      <div class="demo-block">
        <h3>Object-fit 模式</h3>
        <div class="demo-content image-grid">
          <div class="image-item">
            <p>Cover</p>
            <e-image 
              src="https://picsum.photos/300/200?random=3" 
              alt="Cover"
              object-fit="cover"
              width="150"
              height="150">
            </e-image>
          </div>
          
          <div class="image-item">
            <p>Contain</p>
            <e-image 
              src="https://picsum.photos/300/200?random=4" 
              alt="Contain"
              object-fit="contain"
              width="150"
              height="150"
              style="background: #f0f0f0;">
            </e-image>
          </div>
          
          <div class="image-item">
            <p>Fill</p>
            <e-image 
              src="https://picsum.photos/300/200?random=5" 
              alt="Fill"
              object-fit="fill"
              width="150"
              height="150">
            </e-image>
          </div>
        </div>
      </div>
      
      <div class="demo-block">
        <h3>事件处理</h3>
        <div class="demo-content">
          <div class="image-item">
            <e-image 
              id="event-image"
              src="https://picsum.photos/200/200?random=event" 
              alt="事件测试"
              width="200"
              height="200">
            </e-image>
            <div class="event-log" id="image-event-log">
              等待图片加载...
            </div>
          </div>
          <button id="change-image-btn" class="control-btn">切换图片</button>
          <button id="load-error-btn" class="control-btn">加载错误图片</button>
        </div>
      </div>
    </div>
  `,
  
  mounted: () => {
    const eventImage = document.getElementById("event-image");
    const eventLog = document.getElementById("image-event-log");
    const changeBtn = document.getElementById("change-image-btn");
    const errorBtn = document.getElementById("load-error-btn");
    let imageCounter = 10;
    
    if (eventImage) {
      eventImage.addEventListener("load", (e) => {
        eventLog.textContent = `✅ 图片加载成功: ${e.detail.src}`;
        eventLog.className = "event-log success";
      });
      
      eventImage.addEventListener("error", (e) => {
        eventLog.textContent = `❌ 图片加载失败: ${e.detail.src}`;
        eventLog.className = "event-log error";
      });
    }
    
    if (changeBtn) {
      changeBtn.addEventListener("click", () => {
        imageCounter++;
        eventImage.setAttribute("src", `https://picsum.photos/200/200?random=${imageCounter}`);
      });
    }
    
    if (errorBtn) {
      errorBtn.addEventListener("click", () => {
        eventImage.setAttribute("src", "https://invalid-test-url.com/image.jpg");
      });
    }
  },
  
  unmounted: () => {
    const eventImage = document.getElementById("event-image");
    if (eventImage) {
      eventImage.removeEventListener("load", () => {});
      eventImage.removeEventListener("error", () => {});
    }
  }
};
