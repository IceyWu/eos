<template>
	<div class="button-demo">
		<div class="button-row">
			<eos-button @click="buttonClicks++">Primary</eos-button>
			<eos-button variant="secondary">Secondary</eos-button>
			<eos-button variant="outline">Outline</eos-button>
			<eos-button color="danger">Danger</eos-button>
		</div>
		<span class="demo-feedback" aria-live="polite">
			{{ buttonClicks }} activations
		</span>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const buttonClicks = ref(0);
</script>

<style scoped>
.button-demo {
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 168px;
	gap: 20px;
}

.button-row {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 12px;
}

.demo-feedback {
	color: var(--eos-color-foreground-muted);
	font: 11px "SFMono-Regular", Consolas, monospace;
}

@media (max-width: 700px) {
	.button-demo {
		min-height: 140px;
	}
}
</style>
