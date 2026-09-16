<template>
	<div class="carousel-demo">
		<eos-carousel
			ref="carouselRef"
			loop
			indicator-style="tiktok"
			indicator-position="bottom"
			virtual-threshold="8"
			show-navigation
			:style="{ '--carousel-height': 'min(42vw, 360px)' }"
			@change="onChange"
			@slide-active="onSlideActive"
		>
			<div v-for="item in items" :key="item.id" class="slide">
				<video
					v-if="item.type === 'video'"
					:src="item.url"
					:aria-label="item.name"
					muted
					playsinline
					loop
					autoplay
				></video>
				<eos-image
					v-else
					:src="item.url"
					:alt="item.name"
					:placeholder="item.blurhash ?? undefined"
					placeholder-type="blurhash"
					object-fit="cover"
					@load="onImageLoad(item.id)"
				/>
				<span class="slide-label">{{ item.name }}</span>
			</div>
		</eos-carousel>
		<div class="carousel-controls">
			<button
				type="button"
				class="pause-button"
				@click="togglePlayback"
			>
				{{ isPaused ? 'Resume' : 'Pause' }}
			</button>
			<span class="demo-feedback" aria-live="polite">
				{{ isProgressing ? 'Progressing' : 'Ready' }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { mediaItems as items } from '../data/media';

const carouselRef = ref<
	(HTMLElement & {
		next: () => void;
		pause: () => void;
		startSlideProgress: (options?: {
			duration?: number;
			onComplete?: () => void;
		}) => void;
		stopSlideProgress: () => void;
	}) | null
>(null);
const idx = ref(0);
const pendingImageId = ref<number | null>(null);
const isProgressing = ref(false);
const isPaused = ref(false);
const currentSlide = computed(() => items[idx.value]);

const startProgress = (duration: number) => {
	const carousel = carouselRef.value;
	if (!carousel) return;
	isProgressing.value = true;
	carousel.startSlideProgress({
		duration,
		onComplete: () => {
			isProgressing.value = false;
			carousel.next();
		},
	});
};

const onChange = (event: Event) => {
	idx.value = (event as CustomEvent).detail.currentIndex;
};

const onSlideActive = (event: Event) => {
	const item = items[(event as CustomEvent).detail.index];
	const carousel = carouselRef.value;
	if (!item || !carousel) return;
	carousel.stopSlideProgress();
	isProgressing.value = false;
	pendingImageId.value = null;
	if (isPaused.value) return;
	if (item.type === 'video') startProgress(5000);
	else pendingImageId.value = item.id;
};

const onImageLoad = (id: number) => {
	if (pendingImageId.value !== id) return;
	pendingImageId.value = null;
	startProgress(3000);
};

const togglePlayback = () => {
	const carousel = carouselRef.value;
	if (!carousel) return;
	isPaused.value = !isPaused.value;
	if (isPaused.value) {
		carousel.pause();
		isProgressing.value = false;
		pendingImageId.value = null;
		return;
	}
	if (currentSlide.value?.type === 'video') startProgress(5000);
	else startProgress(3000);
};
</script>

<style scoped>
.carousel-demo {
	padding: 16px;
}

.slide {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	border-radius: 20px;
	background: var(--eos-color-background-tertiary);
}

.slide :deep(img),
.slide video {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.slide-label {
	position: absolute;
	right: 16px;
	bottom: 14px;
	left: 16px;
	color: var(--eos-color-foreground-inverse, #fff);
	font-size: 14px;
	font-weight: 500;
	text-shadow: 0 1px 2px var(--eos-shadow-field);
}

.carousel-controls {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 16px;
}

.pause-button {
	padding: 6px 12px;
	border: 1px solid var(--eos-color-border);
	border-radius: 12px;
	color: var(--eos-color-foreground);
	background: var(--eos-color-surface);
	font-size: 14px;
	font-family: inherit;
	cursor: pointer;
}

.pause-button:hover {
	border-color: var(--eos-color-accent);
}

.pause-button:focus-visible {
	outline: 2px solid var(--eos-color-accent);
	outline-offset: 2px;
}

.demo-feedback {
	color: var(--eos-color-foreground-muted);
	font: 11px "SFMono-Regular", Consolas, monospace;
}
</style>
