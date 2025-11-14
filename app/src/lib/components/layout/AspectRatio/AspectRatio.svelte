<!--
@component
A layout component that maintains a specific aspect ratio for its content, useful for responsive images and videos.

@example
```svelte
<AspectRatio
  ratio="16/9"
>
  <img src="/hero.jpg" alt="Hero image" />
</AspectRatio>
```

See Storybook for additional examples and visual documentation.

@param {'16/9'|'4/3'|'1/1'|'21/9'|'3/2'|string} [ratio='16/9'] - Aspect ratio (use preset or custom like '2/1')
@param {Snippet} children - Content to constrain to the aspect ratio

@note Child elements are absolutely positioned and sized to fill the container with object-fit: cover. Use custom ratio values like '2/1' for any proportion.
-->

<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		ratio?: '16/9' | '4/3' | '1/1' | '21/9' | '3/2' | string;
		children: Snippet;
	}

	let { 
		ratio = '16/9',
		children 
	}: Props = $props();
</script>

<div class="aspect-ratio" style="--ratio: {ratio}">
	{@render children()}
</div>

<style>
	.aspect-ratio {
		position: relative;
		aspect-ratio: var(--ratio);
	}
	
	.aspect-ratio > :global(*) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>