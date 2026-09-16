<template>
	<div ref="container" class="live-photo" :aria-label="item.name" role="img" />
</template>

<script setup lang="ts">
import { LivePhotoViewer } from 'live-photo';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { MediaItem } from '../data/media';

const props = withDefaults(
	defineProps<{ item: MediaItem; active?: boolean }>(),
	{ active: false },
);
const emit = defineEmits<{ ready: [duration: number] }>();
const container = ref<HTMLDivElement | null>(null);
let viewer: LivePhotoViewer | null = null;

onMounted(() => {
	if (!container.value || !props.item.videoSrc) return;
	viewer = new LivePhotoViewer({
		photoSrc: props.item.url,
		videoSrc: props.item.videoSrc,
		container: container.value,
		width: '100%',
		height: '100%',
		borderRadius: '20px',
		autoplay: true,
		muted: true,
		showMuteButton: true,
		preload: 'metadata',
		imageCustomization: {
			attributes: { alt: props.item.name },
			styles: { objectFit: 'cover', width: '100%', height: '100%' },
		},
		videoCustomization: {
			styles: { objectFit: 'cover', width: '100%', height: '100%' },
		},
		onVideoLoad: (duration) => emit('ready', duration),
		onCanPlay: () => {
			if (props.active) void viewer?.play().catch(() => undefined);
		},
	});
});

watch(
		() => props.active,
		(active) => {
			if (!viewer) return;
			if (active) void viewer.play().catch(() => undefined);
			else viewer.pause();
	},
	{ flush: 'post' },
);
onBeforeUnmount(() => {
	viewer?.destroy();
	viewer = null;
});
</script>

<style scoped>
.live-photo {
	width: 100%;
	height: 100%;
}
</style>
