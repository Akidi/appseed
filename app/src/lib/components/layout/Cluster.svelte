<!--
@component
A flexible wrapping layout for grouping items with consistent spacing, perfect for tags, badges, or button groups.

@example
```svelte
<Cluster
  gap="md"
  justify="start"
  align="center"
>
  <Badge>Tag 1</Badge>
  <Badge>Tag 2</Badge>
  <Badge>Tag 3</Badge>
</Cluster>
```

See Storybook for additional examples and visual documentation.

@param {'xs'|'sm'|'md'|'lg'|'xl'} [gap='md'] - Gap size between items
@param {'start'|'center'|'between'|'around'|'end'} [justify='start'] - Horizontal alignment (flex justify-content)
@param {'start'|'center'|'end'|'stretch'} [align='center'] - Vertical alignment (flex align-items)
@param {Snippet} children - Items to cluster together

@note Uses flexbox with flex-wrap enabled, allowing items to wrap to multiple lines naturally.
-->

<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		justify?: 'start' | 'center' | 'between' | 'around' | 'end';
		align?: 'start' | 'center' | 'end' | 'stretch';
		children: Snippet;
	}

	let { 
		gap = 'md',
		justify = 'start',
		align = 'center',
		children 
	}: Props = $props();
</script>

<div class="cluster" data-gap={gap} data-justify={justify} data-align={align}>
	{@render children()}
</div>

<style>
	.cluster {
		display: flex;
		flex-wrap: wrap;
	}
	
	.cluster[data-justify="start"] { justify-content: flex-start; }
	.cluster[data-justify="center"] { justify-content: center; }
	.cluster[data-justify="between"] { justify-content: space-between; }
	.cluster[data-justify="around"] { justify-content: space-around; }
	.cluster[data-justify="end"] { justify-content: flex-end; }
	
	.cluster[data-align="start"] { align-items: flex-start; }
	.cluster[data-align="center"] { align-items: center; }
	.cluster[data-align="end"] { align-items: flex-end; }
	.cluster[data-align="stretch"] { align-items: stretch; }
	
	.cluster[data-gap="xs"] { gap: var(--space-xs); }
	.cluster[data-gap="sm"] { gap: var(--space-sm); }
	.cluster[data-gap="md"] { gap: var(--space-md); }
	.cluster[data-gap="lg"] { gap: var(--space-lg); }
	.cluster[data-gap="xl"] { gap: var(--space-xl); }
</style>