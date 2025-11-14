<!--
@component
A centered container with maximum width constraints for consistent page layouts and content width.

@example
```svelte
<Container
  size="default"
>
  <h1>Page Content</h1>
  <p>Content constrained to max-width with centered alignment</p>
</Container>
```

See Storybook for additional examples and visual documentation.

@param {'sm'|'default'|'lg'|'xl'|'full'} [size='default'] - Maximum width (sm=640px, default=1024px, lg=1280px, xl=1536px, full=no limit)
@param {Snippet} children - Page content to constrain

@note Includes automatic horizontal centering and responsive padding. Use 'full' for edge-to-edge layouts.
-->

<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		size?: 'sm' | 'default' | 'lg' | 'xl' | 'full';
		children: Snippet;
	}

	let { 
		size = 'default',
		children 
	}: Props = $props();
</script>

<div class="container" data-size={size}>
	{@render children()}
</div>

<style>
	.container {
		width: 100%;
		margin-inline: auto;
		padding-inline: var(--space-md);
	}
	
	.container[data-size="sm"] { max-width: 640px; }
	.container[data-size="default"] { max-width: 1024px; }
	.container[data-size="lg"] { max-width: 1280px; }
	.container[data-size="xl"] { max-width: 1536px; }
	.container[data-size="full"] { max-width: none; }
</style>