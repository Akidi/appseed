<!--
@component
A simple vertical spacer component for adding consistent whitespace between elements.

@example
```svelte
<h1>Title</h1>
<Spacer size="lg" />
<p>Content with large spacing above</p>
```

See Storybook for additional examples and visual documentation.

@param {'xs'|'sm'|'md'|'lg'|'xl'} [size='md'] - Height of the spacer

@note Renders as an empty div with height. For spacing within flex/grid layouts, consider using the gap property instead.
-->

<script lang="ts">
	interface Props {
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	}

	let { 
		size = 'md'
	}: Props = $props();
</script>

<div class="spacer" data-size={size}></div>

<style>
	.spacer[data-size="xs"] { height: var(--space-xs); }
	.spacer[data-size="sm"] { height: var(--space-sm); }
	.spacer[data-size="md"] { height: var(--space-md); }
	.spacer[data-size="lg"] { height: var(--space-lg); }
	.spacer[data-size="xl"] { height: var(--space-xl); }
</style>