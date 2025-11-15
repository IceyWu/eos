<template>
  <div class="demo">
    <h1>eos-carousel 演示</h1>
    
    <eos-carousel 
      ref="carouselRef"
      autoplay 
      loop
      indicator-style="tiktok"
      indicator-position="bottom"
      show-navigation
      :style="{ '--carousel-height': '500px' }"
      @change="handleChange"
      @slide-active="handleSlideActive"
    >
      <div 
        v-for="item in mediaItems" 
        :key="item.id" 
        class="slide"
        :data-media-type="item.type"
      >
        <img v-if="item.type === 'image'" :src="item.url" :alt="item.title" />
        <video 
          v-else 
          :ref="el => { if (el) videoRefs[item.id] = el as HTMLVideoElement }"
          :src="item.url" 
          muted
          playsinline
        />
        <div class="overlay">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </eos-carousel>

    <p class="info">当前索引: {{ currentIndex }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';

const currentIndex = ref(0);
const carouselRef = ref<any>(null);
const videoRefs = ref<Record<number, HTMLVideoElement>>({});
let currentVideo: HTMLVideoElement | null = null;
let progressUpdateTimer: number | null = null;

// 媒体项数据数组
const mediaItems = [
  {
    id: 1,
    type: 'image',
    url: 'https://picsum.photos/800/500?random=1',
    title: '美丽的风景',
    description: '探索大自然的魅力'
  },
  {
    id: 2,
    type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: '示例视频',
    description: '支持视频播放'
  },
  {
    id: 3,
    type: 'image',
    url: 'https://picsum.photos/800/500?random=2',
    title: '城市夜景',
    description: '现代都市的繁华'
  },
  {
    id: 4,
    type: 'image',
    url: 'https://picsum.photos/800/500?random=3',
    title: '海洋世界',
    description: '深海的神秘与美丽'
  }
];

const handleChange = (event: CustomEvent) => {
  currentIndex.value = event.detail.currentIndex;
};

const handleSlideActive = (event: CustomEvent) => {
  const { index } = event.detail;
  const currentItem = mediaItems[index];
  // return
  
  if (!currentItem) return;
  
  // 清理之前的视频
  cleanupVideo();
  
  if (currentItem.type === 'video') {
    // 视频项：等待视频加载后开始进度
    const videoElement = videoRefs.value[currentItem.id];
    
    if (videoElement) {
      currentVideo = videoElement;
      
      // 重置并播放视频
      videoElement.currentTime = 0;
      
      // 等待视频可以播放后再开始进度
      const startVideoProgress = () => {
        const videoDuration = videoElement.duration * 1000; // 转换为毫秒
        
        // 开始视频进度，使用视频的实际时长
        carouselRef.value?.startSlideProgress({
          duration: videoDuration,
          onComplete: () => {
            // 视频播放完成，切换到下一张
            cleanupVideo();
            carouselRef.value?.next();
          }
        });
        
        // 同步视频进度到进度条
        const updateProgress = () => {
          if (videoElement.duration > 0 && !videoElement.paused) {
            const progress = (videoElement.currentTime / videoElement.duration) * 100;
            carouselRef.value?.updateProgress(progress);
          }
        };
        progressUpdateTimer = window.setInterval(updateProgress, 50);
      };
      
      // 监听视频可以播放事件
      videoElement.oncanplay = () => {
        startVideoProgress();
      };
      
      // 开始播放视频
      videoElement.play().catch(err => {
        console.error('视频播放失败:', err);
      });
    }
  } else {
    // 图片项：直接开始 2 秒倒计时
    carouselRef.value?.startSlideProgress({
      onComplete: () => {
        // 倒计时结束，切换到下一张
        carouselRef.value?.next();
      }
    });
  }
};

const cleanupVideo = () => {
  if (currentVideo) {
    currentVideo.pause();
    currentVideo.oncanplay = null;
    currentVideo.onended = null;
    currentVideo = null;
  }
  
  if (progressUpdateTimer) {
    clearInterval(progressUpdateTimer);
    progressUpdateTimer = null;
  }
};

onBeforeUnmount(() => {
  cleanupVideo();
});



</script>

<style scoped>
.demo {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.slide {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

.slide img,
.slide video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  padding: 30px;
  text-align: center;
}

.overlay h3 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
}

.overlay p {
  font-size: 16px;
  opacity: 0.9;
}

.info {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  font-weight: 500;
}
</style>
