<template>
	<div class="image-demo">
		<eos-image
			:src="item.url"
			:alt="item.name"
			:placeholder="item.blurhash ?? undefined"
			placeholder-type="blurhash"
			object-fit="cover"
		/>
	</div>
</template>

<script setup lang="ts">
import type { MediaItem } from '../data/media';

defineProps<{ item: MediaItem }>();
</script>

<style scoped>
.image-demo {
	padding: 16px;
	background: var(--eos-color-background-secondary);
}

.image-demo eos-image {
	display: block;
	width: 100%;
	height: 240px;
	border-radius: 12px;
}

@media (max-width: 700px) {
	.image-demo eos-image {
		height: 200px;
	}
}
</style>
