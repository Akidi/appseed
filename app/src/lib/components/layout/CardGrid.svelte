<!--
@component
A responsive grid layout that automatically fits cards based on minimum width, ideal for card-based interfaces.

@example
```svelte
<CardGrid
  minWidth="280px"
  gap="md"
>
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</CardGrid>
```

See Storybook for additional examples and visual documentation.

@param {string} [minWidth='280px'] - Minimum width for each grid column (in any CSS unit)
@param {'xs'|'sm'|'md'|'lg'|'xl'} [gap='md'] - Gap size between grid items
@param {Snippet} children - Card or content items to arrange in the grid

@note Uses CSS Grid with auto-fit to automatically wrap items based on available space and minWidth constraint.
-->

<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		minWidth?: string;
		gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		children: Snippet;
	}

	let { 
		minWidth = '280px',
		gap = 'md',
		children 
	}: Props = $props();
</script>

<div class="card-grid" data-gap={gap} style="--min-width: {minWidth}">
	{@render children()}
</div>

<style>
	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(var(--min-width), 1fr));
	}
	
	.card-grid[data-gap="xs"] { gap: var(--space-xs); }
	.card-grid[data-gap="sm"] { gap: var(--space-sm); }
	.card-grid[data-gap="md"] { gap: var(--space-md); }
	.card-grid[data-gap="lg"] { gap: var(--space-lg); }
	.card-grid[data-gap="xl"] { gap: var(--space-xl); }
</style>