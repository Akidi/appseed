<!--
@component
A two-panel layout component with configurable ratio and direction, ideal for split views and comparisons.

@example
```svelte
<Split
  ratio="2:1"
  gap="md"
  direction="horizontal"
>
  {#snippet left()}
    <div>Larger left panel (2/3 width)</div>
  {/snippet}

  {#snippet right()}
    <div>Smaller right panel (1/3 width)</div>
  {/snippet}
</Split>
```

See Storybook for additional examples and visual documentation.

@param {'1:1'|'1:2'|'2:1'|'1:3'|'3:1'|string} [ratio='1:1'] - Proportion of left/right panels (or top/bottom for vertical)
@param {'xs'|'sm'|'md'|'lg'|'xl'} [gap='md'] - Gap between panels
@param {'horizontal'|'vertical'} [direction='horizontal'] - Split direction (side-by-side or stacked)
@param {Snippet} left - First panel content (left for horizontal, top for vertical)
@param {Snippet} right - Second panel content (right for horizontal, bottom for vertical)

@note Ratio values are converted to CSS Grid fr units. Custom ratios like '3:2' are supported.
-->

<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		ratio?: '1:1' | '1:2' | '2:1' | '1:3' | '3:1' | string;
		gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		direction?: 'horizontal' | 'vertical';
		left: Snippet;
		right: Snippet;
	}

	let { 
		ratio = '1:1',
		gap = 'md',
		direction = 'horizontal',
		left,
		right 
	}: Props = $props();
	
	// Convert ratio string to CSS grid format
	let gridRatio = $derived(ratio.replace(':', 'fr ') + 'fr');
</script>

<div class="split" data-direction={direction} data-gap={gap} style="--ratio: {gridRatio}">
	<div class="split-panel">
		{@render left()}
	</div>
	<div class="split-panel">
		{@render right()}
	</div>
</div>

<style>
	.split {
		display: grid;
	}
	
	.split[data-direction="horizontal"] {
		grid-template-columns: var(--ratio);
	}
	
	.split[data-direction="vertical"] {
		grid-template-rows: var(--ratio);
	}
	
	.split[data-gap="xs"] { gap: var(--space-xs); }
	.split[data-gap="sm"] { gap: var(--space-sm); }
	.split[data-gap="md"] { gap: var(--space-md); }
	.split[data-gap="lg"] { gap: var(--space-lg); }
	.split[data-gap="xl"] { gap: var(--space-xl); }
</style>