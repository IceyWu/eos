<template>
	<div class="carousel-demo">
		<eos-carousel
			ref="carouselRef"
			loop
			indicator-style="tiktok"
			indicator-position="bottom"
			virtual-threshold="8"
			show-navigation
			:style="{ '--carousel-height': 'min(52vw, 440px)' }"
			@change="onChange"
			@slide-active="onSlideActive"
		>
			<div v-for="item in items" :key="item.id" class="slide">
				<LivePhotoSlide
					v-if="item.type === 'image' && item.videoSrc"
					:item="item"
					:active="!isPaused && idx === items.indexOf(item)"
					@ready="onMediaDuration(item.id, $event)"
				/>
				<video
					v-else-if="item.type === 'video'"
					:src="item.url"
					:aria-label="item.name"
					:muted="isMuted"
					playsinline
					loop
					preload="metadata"
					:ref="(element) => setVideoElement(item.id, element)"
					@loadedmetadata="onVideoMetadata(item.id, $event)"
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
			<eos-button
				size="sm"
				variant="outline"
				class="sound-button"
				:disabled="currentSlide?.type !== 'video'"
				:aria-label="isMuted ? 'Turn sound on' : 'Turn sound off'"
				:title="isMuted ? 'Turn sound on' : 'Turn sound off'"
				@click="toggleSound"
			>
				{{ isMuted ? 'Muted' : 'Sound on' }}
			</eos-button>
			<eos-button
				size="sm"
				variant="outline"
				class="pause-button"
				@click="togglePlayback"
			>
				{{ isPaused ? 'Resume' : 'Pause' }}
			</eos-button>
			<span class="demo-feedback" aria-live="polite">
				{{ isProgressing ? 'Progressing' : 'Ready' }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, type ComponentPublicInstance } from 'vue';
import { mediaItems as items } from '../data/media';
import LivePhotoSlide from './LivePhotoSlide.vue';

const carouselRef = ref<
	(HTMLElement & {
		next: () => void;
		pause: () => void;
		startSlideProgress: (options?: {
			duration?: number;
			onComplete?: () => void;
		}) => void;
		stopSlideProgress: () => void;
		pauseSlideProgress: () => void;
		resumeSlideProgress: () => void;
	}) | null
>(null);
const idx = ref(0);
const isProgressing = ref(false);
const isPaused = ref(false);
const isMuted = ref(true);
const currentSlide = computed(() => items[idx.value]);
const pendingMediaId = ref<number | string | null>(null);
const mediaDurations = new Map<number | string, number>();
const videoElements = new Map<number | string, HTMLVideoElement>();
const loadedImages = new Set<number | string>();

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
	const index = (event as CustomEvent).detail.index as number;
	idx.value = index;
	const item = items[index];
	const carousel = carouselRef.value;
	if (!item || !carousel) return;
	carousel.stopSlideProgress();
	isProgressing.value = false;
	pendingMediaId.value = null;
	videoElements.forEach((video, id) => {
		if (id === item.id) void video.play().catch(() => undefined);
		else video.pause();
	});
	if (isPaused.value) return;
	const duration = mediaDurations.get(item.id);
	if (duration && (item.type === 'video' || item.videoSrc)) {
		startProgress(duration);
	} else {
		if (item.type === 'image' && !item.videoSrc && loadedImages.has(item.id)) {
			startProgress(3000);
			return;
		}
		pendingMediaId.value = item.id;
		if (item.type === 'image' && !item.videoSrc) return;
	}
};

const onImageLoad = (id: number | string) => {
	loadedImages.add(id);
	if (pendingMediaId.value !== id || isPaused.value) return;
	pendingMediaId.value = null;
	startProgress(3000);
};

const onMediaDuration = (id: number | string, duration: number) => {
	if (!Number.isFinite(duration) || duration <= 0) return;
	const milliseconds = duration * 1000;
	mediaDurations.set(id, milliseconds);
	if (pendingMediaId.value !== id || currentSlide.value?.id !== id || isPaused.value) return;
	pendingMediaId.value = null;
	startProgress(milliseconds);
};

const onVideoMetadata = (id: number | string, event: Event) => {
	const duration = (event.currentTarget as HTMLVideoElement).duration;
	onMediaDuration(id, duration);
};

const setVideoElement = (id: number | string, element: Element | ComponentPublicInstance | null) => {
	if (element instanceof HTMLVideoElement) videoElements.set(id, element);
};

const togglePlayback = () => {
	const carousel = carouselRef.value;
	if (!carousel) return;
	isPaused.value = !isPaused.value;
	if (isPaused.value) {
		carousel.pause();
		videoElements.forEach((video) => video.pause());
		isProgressing.value = false;
		pendingMediaId.value = null;
		return;
	}
	const duration = currentSlide.value ? mediaDurations.get(currentSlide.value.id) : undefined;
	const currentVideo = currentSlide.value ? videoElements.get(currentSlide.value.id) : undefined;
	if (currentVideo) void currentVideo.play().catch(() => undefined);
	carousel.resumeSlideProgress();
	if (!duration && currentSlide.value?.type === 'image' && !currentSlide.value.videoSrc) {
		startProgress(3000);
	}
};

const toggleSound = () => {
	if (currentSlide.value?.type !== 'video') return;
	isMuted.value = !isMuted.value;
	const currentVideo = videoElements.get(currentSlide.value.id);
	if (currentVideo) {
		currentVideo.muted = isMuted.value;
		if (!isMuted.value) void currentVideo.play().catch(() => undefined);
	}
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
	bottom: 36px;
	left: 16px;
	overflow: hidden;
	color: var(--eos-color-foreground-inverse, #fff);
	font-size: 14px;
	font-weight: 500;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-shadow: 0 1px 2px var(--eos-shadow-field);
}

.carousel-controls {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 8px;
	padding-top: 16px;
}

.pause-button {
	margin-right: 0;
}

.pause-button:hover {
	border-color: var(--eos-color-accent);
}

.pause-button:focus-visible {
	outline: 2px solid var(--eos-color-accent);
	outline-offset: 2px;
}

.demo-feedback {
	margin-left: auto;
	color: var(--eos-color-foreground-muted);
	font: 11px "SFMono-Regular", Consolas, monospace;
}
</style>
