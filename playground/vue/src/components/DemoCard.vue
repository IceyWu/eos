<template>
	<article class="demo-card" :class="cardClass">
		<header class="demo-card-header">
			<div>
				<p class="card-kicker">{{ kicker }}</p>
				<h2>{{ title }}</h2>
			</div>
			<span class="card-tag">{{ meta }}</span>
		</header>
		<div class="demo-body">
			<slot />
		</div>
	</article>
</template>

<script setup lang="ts">
defineProps<{
	kicker: string;
	title: string;
	meta: string;
	cardClass?: string;
}>();
</script>

<style scoped>
.demo-card {
	overflow: hidden;
	border: 1px solid var(--eos-color-border);
	border-radius: 24px;
	background: var(--eos-color-surface);
	box-shadow: 0 2px 4px var(--eos-shadow-field), 0 1px 2px var(--eos-shadow-field);
}

.demo-card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-height: 72px;
	padding: 16px 20px;
	border-bottom: 1px solid var(--eos-color-separator);
}

.demo-card-header h2 {
	margin: 0;
	font-size: 18px;
	line-height: 28px;
	letter-spacing: 0;
}

.card-kicker {
	margin: 0 0 4px;
	color: var(--eos-color-foreground-muted);
	font: 500 11px/1.2 "SFMono-Regular", Consolas, monospace;
	letter-spacing: 0.08em;
	text-transform: uppercase;
}

.card-tag {
	color: var(--eos-color-foreground-muted);
	font: 11px "SFMono-Regular", Consolas, monospace;
}

.demo-body {
	padding: 24px;
}

:global(.demo-card--carousel) {
	grid-column: span 2;
}

@media (max-width: 700px) {
	.demo-card-header {
		padding-inline: 16px;
	}

	.demo-body {
		padding: 16px;
	}

	:global(.demo-card--carousel) {
		grid-column: auto;
	}
}
</style>
