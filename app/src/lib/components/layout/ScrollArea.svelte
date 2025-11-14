<!--
@component
A scrollable container component with configurable scroll direction and height constraints.

@example
```svelte
<ScrollArea
  height="400px"
  maxHeight="80vh"
  direction="vertical"
>
  <div>Long scrollable content here...</div>
</ScrollArea>
```

See Storybook for additional examples and visual documentation.

@param {string} [height] - Fixed height for the scroll area (any CSS unit)
@param {string} [maxHeight] - Maximum height for the scroll area (any CSS unit)
@param {'vertical'|'horizontal'|'both'} [direction='vertical'] - Scroll direction (controls which axis can scroll)
@param {Snippet} children - Content to make scrollable

@note Set either height or maxHeight to constrain the container and enable scrolling. Direction controls overflow behavior on each axis.
-->

<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		height?: string;
		maxHeight?: string;
		direction?: 'vertical' | 'horizontal' | 'both';
		children: Snippet;
	}

	let { 
		height,
		maxHeight,
		direction = 'vertical',
		children 
	}: Props = $props();
</script>

<div 
	class="scroll-area" 
	data-direction={direction}
	style:height
	style:max-height={maxHeight}
>
	{@render children()}
</div>

<style>
	.scroll-area {
		overflow: auto;
	}
	
	.scroll-area[data-direction="vertical"] {
		overflow-x: hidden;
		overflow-y: auto;
	}
	
	.scroll-area[data-direction="horizontal"] {
		overflow-x: auto;
		overflow-y: hidden;
	}
</style>