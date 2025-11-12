<template>
  <section id="media-carousel" class="component-section featured">
    <div class="section-header">
      <div class="section-title-group">
        <h3 class="section-title">视频+图片混合轮播</h3>
        <span class="section-badge featured">Featured</span>
      </div>
      <p class="section-description">智能识别媒体类型，图片匀速轮播，视频跟随播放进度</p>
    </div>

    <div class="demo-card large">
      <div class="demo-card-header">
        <h4 class="demo-title">媒体轮播示例</h4>
        <span class="demo-label">Media Mix</span>
      </div>
      <div class="demo-preview">
        <e-carousel ref="mediaCarousel" loop @slide-active="handleSlideActive" style="--carousel-height: 500px;">
          <template v-for="(item, index) in mediaList" :key="index">
            <!-- 图片类型 -->
            <div v-if="item.type === 'image'" class="carousel-slide" :data-media-type="item.type" :style="item.style">
              <div class="media-content">
                <div class="media-label">{{ item.label }}</div>
                <div class="media-description">{{ item.description }}</div>
              </div>
            </div>

            <!-- 视频类型 -->
            <div v-else-if="item.type === 'video'" class="carousel-slide video-slide" :data-media-type="item.type">
              <video class="carousel-video" :src="item.src" @timeupdate="handleVideoProgress" @ended="handleVideoEnded"
                muted playsinline>
              </video>
              <div class="video-overlay">
                <span class="media-label">{{ item.label }}</span>
              </div>
            </div>
          </template>
        </e-carousel>
      </div>
      <div class="demo-info">
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">媒体类型:</span>
            <span class="info-value" :class="currentMediaType">
              {{ currentMediaType === 'video' ? '🎬 视频' : '🖼️ 图片' }}
            </span>
          </div>
          <div class="info-item">
            <span class="info-label">当前索引:</span>
            <span class="info-value">{{ currentMediaIndex + 1 }} / {{ mediaList.length }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from "vue";

const mediaCarousel = ref<any>(null);
const currentMediaType = ref("image");
const currentMediaIndex = ref(0);
let currentVideo: HTMLVideoElement | null = null;
const IMAGE_DURATION = 3000;

const mediaList = ref([
	{
		type: "image",
		label: "夏日海滩",
		description: "阳光、沙滩与海浪",
		style:
			"background: linear-gradient(135deg, rgba(255,107,107,0.9) 0%, rgba(254,202,87,0.9) 100%), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800') center/cover; background-blend-mode: overlay;",
	},
	{
		type: "video",
		label: "精彩视频",
		description: "Big Buck Bunny",
		src: "https://www.w3schools.com/html/mov_bbb.mp4",
	},
	{
		type: "image",
		label: "城市夜景",
		description: "霓虹灯下的都市",
		style:
			"background: linear-gradient(135deg, rgba(99,102,241,0.85) 0%, rgba(168,85,247,0.85) 100%), url('https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800') center/cover; background-blend-mode: overlay;",
	},
	{
		type: "video",
		label: "短片欣赏",
		description: "Sample Movie",
		src: "https://www.w3schools.com/html/movie.mp4",
	},
	{
		type: "image",
		label: "自然风光",
		description: "山川湖泊之美",
		style:
			"background: linear-gradient(135deg, rgba(34,197,94,0.85) 0%, rgba(59,130,246,0.85) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800') center/cover; background-blend-mode: overlay;",
	},
]);

const handleSlideActive = (e: CustomEvent) => {
	const { index, mediaType, slide } = e.detail;
	currentMediaIndex.value = index;
	currentMediaType.value = mediaType;

	if (currentVideo) {
		currentVideo.pause();
		currentVideo.currentTime = 0;
	}

	if (mediaType === "video") {
		mediaCarousel.value?.enableCustomProgress();
		const videoElement = slide.querySelector("video") as HTMLVideoElement;
		if (videoElement) {
			currentVideo = videoElement;
			videoElement.currentTime = 0;
			videoElement.play().catch((err) => {
				console.warn("视频自动播放失败:", err);
			});
		}
	} else {
		mediaCarousel.value?.enableCustomProgress();
		currentVideo = null;

		const startTime = Date.now();
		const updateImageProgress = () => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min((elapsed / IMAGE_DURATION) * 100, 100);
			mediaCarousel.value?.updateProgress(progress);

			if (progress < 100) {
				requestAnimationFrame(updateImageProgress);
			}
		};
		requestAnimationFrame(updateImageProgress);
	}
};

const handleVideoProgress = (e: Event) => {
	const video = e.target as HTMLVideoElement;
	if (video === currentVideo && currentMediaType.value === "video") {
		const progress = (video.currentTime / video.duration) * 100;
		mediaCarousel.value?.updateProgress(progress);
	}
};

const handleVideoEnded = () => {
	// 视频播放完毕，updateProgress 会自动触发切换到下一个
};

onUnmounted(() => {
	if (currentVideo) {
		currentVideo.pause();
	}
});
</script>

<style scoped>
@import './demo-styles.css';
@import './media-carousel-styles.css';
</style>
