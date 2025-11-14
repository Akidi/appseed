<!--
@component
A visual divider component for separating content sections, with optional label text.

@example
```svelte
<Divider
  orientation="horizontal"
  spacing="md"
  label="OR"
/>
```

See Storybook for additional examples and visual documentation.

@param {'horizontal'|'vertical'} [orientation='horizontal'] - Divider orientation (currently only horizontal is styled)
@param {'xs'|'sm'|'md'|'lg'|'xl'} [spacing='md'] - Vertical spacing around the divider
@param {string} [label] - Optional label text displayed in the center of the divider

@note When label is provided, renders as a flex layout with lines on both sides of the text. Without label, renders as a semantic hr element.
-->

<script lang="ts">
	interface Props {
		orientation?: 'horizontal' | 'vertical';
		spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		label?: string;
	}

	let { 
		orientation = 'horizontal',
		spacing = 'md',
		label 
	}: Props = $props();
</script>

{#if label}
	<div class="divider-with-label" data-orientation={orientation} data-spacing={spacing}>
		<span class="divider-line"></span>
		<span class="divider-label">{label}</span>
		<span class="divider-line"></span>
	</div>
{:else}
	<hr class="divider" data-orientation={orientation} data-spacing={spacing} />
{/if}

<style>
	.divider {
		border: none;
		border-top: 1px solid var(--border-primary);
	}
	
	.divider[data-spacing="xs"] { margin-block: var(--space-xs); }
	.divider[data-spacing="sm"] { margin-block: var(--space-sm); }
	.divider[data-spacing="md"] { margin-block: var(--space-md); }
	.divider[data-spacing="lg"] { margin-block: var(--space-lg); }
	.divider[data-spacing="xl"] { margin-block: var(--space-xl); }
	
	.divider-with-label {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}
	
	.divider-line {
		flex: 1;
		height: 1px;
		background-color: var(--border-primary);
	}
	
	.divider-label {
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
	}
</style>