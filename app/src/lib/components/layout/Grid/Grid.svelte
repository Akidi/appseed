<!--
@component
A simple CSS Grid layout component with configurable columns and gap spacing.

@example
```svelte
<Grid
  columns={3}
  gap="lg"
>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>
```

See Storybook for additional examples and visual documentation.

@param {number|'auto'} [columns='auto'] - Number of equal-width columns or 'auto' for automatic sizing
@param {'xs'|'sm'|'md'|'lg'|'xl'} [gap='md'] - Gap between grid items
@param {Snippet} children - Content items to arrange in the grid

@note Uses repeat(columns, 1fr) for equal-width columns. For responsive grids with minimum width constraints, consider using CardGrid instead.
-->

<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		columns?: number | 'auto';
		gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		children: Snippet;
	}

	let { 
		columns = 'auto',
		gap = 'md',
		children 
	}: Props = $props();
</script>

<div class="grid" data-gap={gap} style="--columns: {columns}">
	{@render children()}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(var(--columns), 1fr);
	}
	
	.grid[data-gap="xs"] { gap: var(--space-xs); }
	.grid[data-gap="sm"] { gap: var(--space-sm); }
	.grid[data-gap="md"] { gap: var(--space-md); }
	.grid[data-gap="lg"] { gap: var(--space-lg); }
	.grid[data-gap="xl"] { gap: var(--space-xl); }
</style>