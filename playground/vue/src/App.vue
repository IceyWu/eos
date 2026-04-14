<template>
  <div class="demo">
    <h1>eos-carousel 演示</h1>

    <div class="section-wrap">
      <section class="section">
        <div class="section-header">
          <span class="badge badge-green">事件驱动自动播放</span>
          <h2>{{ items.length }} 条图视混合 &middot; tiktok &middot; 图片加载完才开始计时</h2>
          <p class="hint">
            通过 <code>slide-active</code> + <code>imageLoad</code> 事件回调控制轮播时机，
            组件本身不内置自动播放逻辑。
          </p>
        </div>
        <eos-carousel
          ref="carouselRef"
          loop
          indicator-style="tiktok"
          indicator-position="bottom"
          virtual-threshold="8"
          show-navigation
          :style="{ '--carousel-height': '420px' }"
          @change="onChangeBig"
          @slide-active="onSlideActive"
        >
          <div v-for="item in items" :key="item.id" class="slide">
            <!-- 视频 -->
            <video
              v-if="item.type === 'video'"
              :src="item.url"
              muted
              playsinline
              loop
              autoplay
              style="width:100%;height:100%;object-fit:cover;display:block;"
            ></video>
            <!-- 图片：eos-image 渲染，blurhash 占位，加载完成后触发计时 -->
            <eos-image
              v-else
              :src="item.url"
              :placeholder="item.blurhash ?? undefined"
              placeholder-type="blurhash"
              object-fit="cover"
              style="width:100%;height:100%;display:block;"
              @imageLoad="onImageLoad(item.id)"
            />
            <div class="overlay">
              <h3>{{ item.name }}</h3>
              <p v-if="item.address">{{ item.address }}</p>
            </div>
          </div>
        </eos-carousel>
        <p class="info">{{ idxBig + 1 }} / {{ items.length }}</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import rawData from './json/data.json';

interface MediaItem {
  id: number;
  name: string;
  type: 'image' | 'video';
  url: string;
  blurhash: string | null;
  address: string | null;
}

const items: MediaItem[] = (rawData as any[]).map((d) => ({
  id: d.id,
  name: d.name,
  type: (d.type as string).startsWith('video') ? 'video' : 'image',
  url: d.url,
  blurhash: d.blurhash ?? null,
  address: d.address ?? null,
}));

// carousel ref（Web Component 实例）
const carouselRef = ref<HTMLElement & {
  next: () => void;
  startSlideProgress: (opts?: { duration?: number; onComplete?: () => void }) => void;
  stopSlideProgress: () => void;
} | null>(null);

const idxBig = ref(0);
// 当前等待图片加载完成的 item id
const pendingImageId = ref<number | null>(null);

const onChangeBig = (e: Event) => {
  idxBig.value = (e as CustomEvent).detail.currentIndex;
};

// slide 激活时决定播放策略
const onSlideActive = (e: Event) => {
  const { index } = (e as CustomEvent).detail;
  const item = items[index];
  if (!item) return;
  const carousel = carouselRef.value;
  if (!carousel) return;

  carousel.stopSlideProgress();
  pendingImageId.value = null;

  if (item.type === 'video') {
    // 视频：直接开始计时 5s 后切换
    carousel.startSlideProgress({
      duration: 5000,
      onComplete: () => carousel.next(),
    });
  } else {
    // 图片：等 imageLoad 事件触发后再计时
    pendingImageId.value = item.id;
  }
};

// eos-image 加载完成回调
const onImageLoad = (id: number) => {
  console.log('🍭-----id-----', id);
  if (pendingImageId.value !== id) return;
  pendingImageId.value = null;
  const carousel = carouselRef.value;
  if (!carousel) return;
  carousel.startSlideProgress({
    duration: 3000,
    onComplete: () => carousel.next(),
  });
};
</script>

<style scoped>
.demo {
  max-width: 860px;
  margin: 32px auto;
  padding: 0 20px 60px;
  font-family: system-ui, sans-serif;
}
h1 { text-align: center; margin-bottom: 36px; font-size: 24px; font-weight: 700; color: #111; }
.section-wrap { display: flex; flex-direction: column; gap: 40px; }
.section {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px 24px 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,.05);
}
.section-header { margin-bottom: 14px; }
.section-header h2 { margin: 5px 0 4px; font-size: 17px; font-weight: 600; color: #1a1a1a; }
.hint { margin: 0; font-size: 13px; color: #6b7280; line-height: 1.6; }
.badge { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; }
.badge-green { background: #dcfce7; color: #15803d; }
.slide { position: relative; width: 100%; height: 100%; background: #000; overflow: hidden; }
.slide img, .slide video { width: 100%; height: 100%; object-fit: cover; display: block; }
.overlay {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(to top, rgba(0,0,0,.7), transparent);
  color: #fff; padding: 20px 24px;
}
.overlay h3 { font-size: 20px; font-weight: 600; margin: 0 0 4px; }
.overlay p  { margin: 0; font-size: 14px; opacity: .85; }
.info { text-align: center; margin-top: 12px; font-size: 14px; color: #6b7280; }
</style>
