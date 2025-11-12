export const CarouselDemo = {
  title: 'Carousel 轮播图',
  render: () => `
    <div class="component-demo">
      <h2>Carousel 轮播图组件</h2>
      
      <div class="demo-block">
        <h3>自动播放轮播</h3>
        <div class="demo-content">
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
          <div class="output" id="carousel-output">
            当前 Slide: 0
          </div>
        </div>
      </div>
      
      <div class="demo-block">
        <h3>手动控制轮播</h3>
        <div class="demo-content">
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
          <div class="controls">
            <button id="prev-btn" class="control-btn">上一张</button>
            <button id="next-btn" class="control-btn">下一张</button>
            <button id="play-btn" class="control-btn">播放</button>
            <button id="pause-btn" class="control-btn">暂停</button>
          </div>
        </div>
      </div>
    </div>
  `,
  
  mounted: () => {
    // Carousel 事件监听
    const carouselBasic = document.getElementById("carousel-basic");
    const carouselOutput = document.getElementById("carousel-output");
    const carouselManual = document.getElementById("carousel-manual");
    
    if (carouselBasic) {
      carouselBasic.addEventListener("change", (e) => {
        carouselOutput.textContent = `当前 Slide: ${e.detail.currentIndex}`;
      });
      
      carouselBasic.addEventListener("slide-click", (e) => {
        console.log("Slide clicked:", e.detail.index);
      });
    }
    
    // 手动控制
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const playBtn = document.getElementById("play-btn");
    const pauseBtn = document.getElementById("pause-btn");
    
    if (carouselManual) {
      prevBtn?.addEventListener("click", () => carouselManual.prev());
      nextBtn?.addEventListener("click", () => carouselManual.next());
      playBtn?.addEventListener("click", () => carouselManual.play());
      pauseBtn?.addEventListener("click", () => carouselManual.pause());
    }
  },
  
  unmounted: () => {
    // 清理事件监听器
    const carouselBasic = document.getElementById("carousel-basic");
    if (carouselBasic) {
      carouselBasic.removeEventListener("change", () => {});
      carouselBasic.removeEventListener("slide-click", () => {});
    }
  }
};
