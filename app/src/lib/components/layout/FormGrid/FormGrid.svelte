<!--
@component
A responsive grid layout specifically designed for forms, automatically stacking to single column on mobile devices.

@example
```svelte
<FormGrid
  columns={2}
  gap="md"
>
  <TextInput label="First Name" />
  <TextInput label="Last Name" />
  <TextInput label="Email" class="full-width" />
</FormGrid>
```

See Storybook for additional examples and visual documentation.

@param {number} [columns=2] - Number of columns in the grid (desktop only)
@param {'xs'|'sm'|'md'|'lg'|'xl'} [gap='md'] - Gap between grid items
@param {Snippet} children - Form fields to arrange in the grid

@note Automatically collapses to single column below 768px. Add 'full-width' class to any child to span all columns.
-->

<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		columns?: number;
		gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		children: Snippet;
	}

	let { 
		columns = 2,
		gap = 'md',
		children 
	}: Props = $props();
</script>

<div class="form-grid" style="--columns: {columns}" data-gap={gap}>
	{@render children()}
</div>

<style>
	.form-grid {
		display: grid;
		grid-template-columns: repeat(var(--columns), 1fr);
	}
	
	.form-grid[data-gap="xs"] { gap: var(--space-xs); }
	.form-grid[data-gap="sm"] { gap: var(--space-sm); }
	.form-grid[data-gap="md"] { gap: var(--space-md); }
	.form-grid[data-gap="lg"] { gap: var(--space-lg); }
	.form-grid[data-gap="xl"] { gap: var(--space-xl); }
	
	@media (max-width: 768px) {
		.form-grid {
			grid-template-columns: 1fr;
		}
	}
	
	/* Allow items to span full width */
	.form-grid > :global(.full-width) {
		grid-column: 1 / -1;
	}
</style>