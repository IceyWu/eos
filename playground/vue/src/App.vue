<template>
	<div class="playground">
		<header class="topbar">
			<div class="brand-mark">EOS UI</div>
			<span class="topbar-context">Playground</span>
		</header>

		<main class="content">
			<section class="intro" aria-labelledby="page-title">
				<p class="eyebrow">Components</p>
				<h1 id="page-title">Playground</h1>
				<p class="lede">A compact view of the EOS Web Components.</p>
			</section>

			<section class="component-grid" aria-label="EOS components">
				<DemoCard kicker="Action" title="Button" meta="4 states" card-class="demo-card--button">
					<ButtonDemo />
				</DemoCard>

				<DemoCard kicker="Media" title="Image" meta="BlurHash" card-class="demo-card--image">
					<ImageDemo :item="imageItem" />
				</DemoCard>

				<DemoCard kicker="Media" title="Carousel" :meta="carouselMeta" card-class="demo-card--carousel">
					<CarouselDemo />
				</DemoCard>

				<DemoCard kicker="Feedback" title="ProgressBar" meta="3 variants" card-class="demo-card--progress">
					<ProgressBarDemo />
				</DemoCard>
			</section>
		</main>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ButtonDemo from './components/ButtonDemo.vue';
import CarouselDemo from './components/CarouselDemo.vue';
import DemoCard from './components/DemoCard.vue';
import ImageDemo from './components/ImageDemo.vue';
import ProgressBarDemo from './components/ProgressBarDemo.vue';
import { fallbackMediaItem, mediaItems } from './data/media';

const imageItem = mediaItems.find((item) => item.type === 'image') ?? fallbackMediaItem;
const carouselMeta = computed(() => `01 / ${String(mediaItems.length).padStart(2, '0')}`);
</script>

<style scoped>
.playground {
	--eos-color-background: var(--background-background, #f5f5f5);
	--eos-color-background-secondary: var(--background-background-secondary, #ebebeb);
	--eos-color-background-tertiary: var(--background-background-tertiary, #e1e1e1);
	--eos-color-surface: var(--surface-surface, #fff);
	--eos-color-surface-secondary: var(--surface-surface-secondary, #efeff0);
	--eos-color-separator: var(--separator-separator, #e4e4e7);
	--eos-color-border: var(--border, #dedee0);
	--eos-color-foreground: var(--foreground-foreground, #18181b);
	--eos-color-foreground-muted: var(--foreground-muted, #71717a);
	--eos-color-accent: var(--accent-accent, #006fee);
	--eos-color-foreground-inverse: var(--background-background-inverse, #fcfcfc);
	--eos-shadow-field: var(--field-shadow, rgb(0 0 0 / 4%));
	min-height: 100vh;
	color: var(--eos-color-foreground);
	background: var(--eos-color-background);
}

.topbar {
	display: flex;
	align-items: center;
	gap: 16px;
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px 32px;
	border-bottom: 1px solid var(--eos-color-separator);
}

.brand-mark {
	font-size: 14px;
	font-weight: 500;
	letter-spacing: 0;
}

.topbar-context {
	color: var(--eos-color-foreground-muted);
	font: 12px "SFMono-Regular", Consolas, monospace;
}

.content {
	max-width: 1200px;
	margin: 0 auto;
	padding: 64px 32px 80px;
}

.intro {
	margin-bottom: 40px;
}

.eyebrow {
	margin: 0 0 8px;
	color: var(--eos-color-foreground-muted);
	font: 500 11px/1.2 "SFMono-Regular", Consolas, monospace;
	letter-spacing: 0.08em;
	text-transform: uppercase;
}

.intro h1 {
	margin: 0;
	font-size: clamp(40px, 5vw, 64px);
	line-height: 1;
	letter-spacing: -0.02em;
	font-weight: 700;
}

.lede {
	margin: 16px 0 0;
	color: var(--eos-color-foreground-muted);
	font-size: 16px;
	line-height: 24px;
}

.component-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 16px;
}

@media (max-width: 700px) {
	.topbar,
	.content {
		padding-right: 20px;
		padding-left: 20px;
	}

	.content {
		padding-top: 44px;
	}

	.component-grid {
		grid-template-columns: 1fr;
	}
}

@media (prefers-reduced-motion: reduce) {
	.playground :deep(*) {
		scroll-behavior: auto !important;
		animation-duration: 0.01ms !important;
		transition-duration: 0.01ms !important;
	}
}
</style>
