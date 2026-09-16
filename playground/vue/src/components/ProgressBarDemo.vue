<template>
	<div class="progress-demo">
		<div class="progress-row">
			<span>Default</span>
			<eos-progress-bar total="5" current="2" variant="default" />
		</div>
		<div class="progress-row">
			<span>Dots</span>
			<eos-progress-bar total="5" current="2" variant="dots" />
		</div>
		<div class="progress-row">
			<span>TikTok</span>
			<eos-progress-bar total="5" current="2" variant="tiktok" />
		</div>
	</div>
</template>

<style scoped>
.progress-demo {
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding-block: 28px;
}

.progress-row {
	display: grid;
	grid-template-columns: 72px minmax(0, 1fr);
	align-items: center;
	gap: 16px;
	color: var(--eos-color-foreground-muted);
	font-size: 12px;
}

.progress-row eos-progress-bar {
	min-width: 0;
	width: 100%;
}

@media (max-width: 700px) {
	.progress-row {
		grid-template-columns: 64px minmax(0, 1fr);
		gap: 12px;
	}
}
</style>
