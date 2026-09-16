<template>
  <div class="playground">
    <header class="topbar"><div class="brand-mark">EOS UI</div><span class="topbar-context">Playground</span></header>
    <main class="content">
      <section class="intro" aria-labelledby="page-title"><p class="eyebrow">Components</p><h1 id="page-title">Playground</h1><p class="lede">A compact view of the EOS Web Components.</p></section>
      <section class="component-grid" aria-label="EOS components">
        <article class="demo-card demo-card--button">
          <header class="demo-card-header"><div><p class="card-kicker">Action</p><h2>Button</h2></div><span class="card-tag">4 states</span></header>
          <div class="demo-body button-demo"><div class="button-row"><eos-button @click="buttonClicks++">Primary</eos-button><eos-button variant="secondary">Secondary</eos-button><eos-button variant="outline">Outline</eos-button><eos-button color="danger">Danger</eos-button></div><span class="demo-feedback" aria-live="polite">{{ buttonClicks }} activations</span></div>
        </article>
        <article class="demo-card demo-card--image">
          <header class="demo-card-header"><div><p class="card-kicker">Media</p><h2>Image</h2></div><span class="card-tag">BlurHash</span></header>
          <div class="demo-body image-demo"><eos-image :src="imageItem.url" :alt="imageItem.name" :placeholder="imageItem.blurhash ?? undefined" placeholder-type="blurhash" object-fit="cover" /></div>
        </article>
        <article class="demo-card demo-card--carousel">
          <header class="demo-card-header"><div><p class="card-kicker">Media</p><h2>Carousel</h2></div><span class="card-tag">{{ String(idx + 1).padStart(2, '0') }} / {{ String(items.length).padStart(2, '0') }}</span></header>
          <div class="demo-body carousel-demo"><eos-carousel ref="carouselRef" loop indicator-style="tiktok" indicator-position="bottom" virtual-threshold="8" show-navigation :style="{ '--carousel-height': 'min(42vw, 360px)' }" @change="onChange" @slide-active="onSlideActive"><div v-for="item in items" :key="item.id" class="slide"><video v-if="item.type === 'video'" :src="item.url" :aria-label="item.name" muted playsinline loop autoplay></video><eos-image v-else :src="item.url" :alt="item.name" :placeholder="item.blurhash ?? undefined" placeholder-type="blurhash" object-fit="cover" @load="onImageLoad(item.id)" /><span class="slide-label">{{ item.name }}</span></div></eos-carousel><div class="carousel-controls"><button type="button" class="pause-button" @click="togglePlayback">{{ isPaused ? 'Resume' : 'Pause' }}</button><span class="demo-feedback" aria-live="polite">{{ isProgressing ? 'Progressing' : 'Ready' }}</span></div></div>
        </article>
        <article class="demo-card demo-card--progress">
          <header class="demo-card-header"><div><p class="card-kicker">Feedback</p><h2>ProgressBar</h2></div><span class="card-tag">3 variants</span></header>
          <div class="demo-body progress-demo"><div class="progress-row"><span>Default</span><eos-progress-bar total="5" current="2" variant="default"></eos-progress-bar></div><div class="progress-row"><span>Dots</span><eos-progress-bar total="5" current="2" variant="dots"></eos-progress-bar></div><div class="progress-row"><span>TikTok</span><eos-progress-bar total="5" current="2" variant="tiktok"></eos-progress-bar></div></div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import rawData from './json/data.json';

interface MediaItem { id: number; name: string; type: 'image' | 'video'; url: string; blurhash: string | null; }
const items: MediaItem[] = (rawData as any[]).map((data) => ({ id: data.id, name: data.name, type: (data.type as string).startsWith('video') ? 'video' : 'image', url: data.url, blurhash: data.blurhash ?? null }));
const imageItem = items.find((item) => item.type === 'image') ?? items[0] ?? { id: 0, name: 'Image', type: 'image' as const, url: '', blurhash: null };
const carouselRef = ref<HTMLElement & { next: () => void; pause: () => void; startSlideProgress: (options?: { duration?: number; onComplete?: () => void }) => void; stopSlideProgress: () => void; } | null>(null);
const idx = ref(0); const pendingImageId = ref<number | null>(null); const isProgressing = ref(false); const isPaused = ref(false); const buttonClicks = ref(0);
const currentSlide = computed(() => items[idx.value]);
const startProgress = (duration: number) => { const carousel = carouselRef.value; if (!carousel) return; isProgressing.value = true; carousel.startSlideProgress({ duration, onComplete: () => { isProgressing.value = false; carousel.next(); } }); };
const onChange = (event: Event) => { idx.value = (event as CustomEvent).detail.currentIndex; };
const onSlideActive = (event: Event) => { const item = items[(event as CustomEvent).detail.index]; const carousel = carouselRef.value; if (!item || !carousel) return; carousel.stopSlideProgress(); isProgressing.value = false; pendingImageId.value = null; if (isPaused.value) return; if (item.type === 'video') startProgress(5000); else pendingImageId.value = item.id; };
const onImageLoad = (id: number) => { if (pendingImageId.value !== id) return; pendingImageId.value = null; startProgress(3000); };
const togglePlayback = () => { const carousel = carouselRef.value; if (!carousel) return; isPaused.value = !isPaused.value; if (isPaused.value) { carousel.pause(); isProgressing.value = false; pendingImageId.value = null; return; } if (currentSlide.value?.type === 'video') startProgress(5000); else startProgress(3000); };
</script>

<style scoped>
.playground { --eos-color-background: var(--background-background, #f5f5f5); --eos-color-background-secondary: var(--background-background-secondary, #ebebeb); --eos-color-background-tertiary: var(--background-background-tertiary, #e1e1e1); --eos-color-surface: var(--surface-surface, #fff); --eos-color-surface-secondary: var(--surface-surface-secondary, #efeff0); --eos-color-separator: var(--separator-separator, #e4e4e7); --eos-color-border: var(--border, #dedee0); --eos-color-foreground: var(--foreground-foreground, #18181b); --eos-color-foreground-muted: var(--foreground-muted, #71717a); --eos-color-accent: var(--accent-accent, #006fee); --eos-shadow-field: var(--field-shadow, rgb(0 0 0 / 4%)); min-height:100vh; color:var(--eos-color-foreground); background:var(--eos-color-background); }
.topbar { display:flex; align-items:center; gap:16px; max-width:1200px; margin:0 auto; padding:20px 32px; border-bottom:1px solid var(--eos-color-separator); }.brand-mark { font-size:14px; font-weight:500; letter-spacing:0; }.topbar-context { color:var(--eos-color-foreground-muted); font:12px "SFMono-Regular",Consolas,monospace; }
.content { max-width:1200px; margin:0 auto; padding:64px 32px 80px; }.intro { margin-bottom:40px; }.eyebrow,.card-kicker { margin:0 0 8px; color:var(--eos-color-foreground-muted); font:500 11px/1.2 "SFMono-Regular",Consolas,monospace; letter-spacing:.08em; text-transform:uppercase; }.intro h1 { margin:0; font-size:clamp(40px,5vw,64px); line-height:1; letter-spacing:-.02em; font-weight:700; }.lede { margin:16px 0 0; color:var(--eos-color-foreground-muted); font-size:16px; line-height:24px; }
.component-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:16px; }.demo-card { overflow:hidden; border:1px solid var(--eos-color-border); border-radius:24px; background:var(--eos-color-surface); box-shadow:0 2px 4px var(--eos-shadow-field),0 1px 2px var(--eos-shadow-field); }.demo-card--carousel { grid-column:span 2; }.demo-card-header { display:flex; align-items:center; justify-content:space-between; min-height:72px; padding:16px 20px; border-bottom:1px solid var(--eos-color-separator); }.demo-card-header h2 { margin:0; font-size:18px; line-height:28px; letter-spacing:0; }.card-kicker { margin-bottom:4px; }.card-tag,.demo-feedback { color:var(--eos-color-foreground-muted); font:11px "SFMono-Regular",Consolas,monospace; }.demo-body { padding:24px; }.button-demo { display:flex; flex-direction:column; justify-content:center; min-height:168px; gap:20px; }.button-row { display:flex; flex-wrap:wrap; align-items:center; gap:12px; }.demo-feedback { color:var(--eos-color-foreground-muted); }
.image-demo { padding:16px; background:var(--eos-color-background-secondary); }.image-demo eos-image { display:block; width:100%; height:240px; border-radius:12px; }.carousel-demo { padding:16px; }.slide { position:relative; width:100%; height:100%; overflow:hidden; border-radius:20px; background:var(--eos-color-background-tertiary); }.slide :deep(img),.slide video { display:block; width:100%; height:100%; object-fit:cover; }.slide-label { position:absolute; right:16px; bottom:14px; left:16px; color:var(--eos-color-foreground-inverse, #fff); font-size:14px; font-weight:500; text-shadow:0 1px 2px var(--eos-shadow-field); }.carousel-controls { display:flex; align-items:center; justify-content:space-between; padding-top:16px; }.pause-button { padding:6px 12px; border:1px solid var(--eos-color-border); border-radius:12px; color:var(--eos-color-foreground); background:var(--eos-color-surface); font-size:14px; font-family:inherit; cursor:pointer; }.pause-button:hover { border-color:var(--eos-color-accent); }.pause-button:focus-visible { outline:2px solid var(--eos-color-accent); outline-offset:2px; }
.progress-demo { display:flex; flex-direction:column; gap:24px; padding-block:28px; }.progress-row { display:grid; grid-template-columns:72px minmax(0,1fr); align-items:center; gap:16px; color:var(--eos-color-foreground-muted); font-size:12px; }.progress-row eos-progress-bar { min-width:0; width:100%; }
@media (max-width:700px) { .topbar,.content { padding-right:20px; padding-left:20px; }.content { padding-top:44px; }.component-grid { grid-template-columns:1fr; }.demo-card--carousel { grid-column:auto; }.demo-card-header { padding-inline:16px; }.demo-body,.carousel-demo { padding:16px; }.button-demo { min-height:140px; }.image-demo eos-image { height:200px; }.progress-row { grid-template-columns:64px minmax(0,1fr); gap:12px; } }
@media (prefers-reduced-motion: reduce) { .playground :deep(*) { scroll-behavior:auto !important; animation-duration:0.01ms !important; transition-duration:0.01ms !important; } }
</style>
