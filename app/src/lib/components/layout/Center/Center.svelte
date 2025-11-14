<!--
@component
A layout component that centers content both horizontally and vertically using flexbox.

@example
```svelte
<Center
  inline={false}
  class="custom-center"
  style="height: 100vh;"
>
  <Button>Centered Button</Button>
</Center>
```

See Storybook for additional examples and visual documentation.

@param {boolean} [inline=false] - Use inline-flex instead of flex for inline centering
@param {string} [class] - Additional CSS classes to apply
@param {string} [style] - Inline styles (e.g., for setting height)
@param {Snippet} children - Content to center

@note Uses flexbox with justify-content: center and align-items: center. For vertical centering, ensure parent has a defined height.
-->

<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		inline?: boolean;
		class?: string;
		style?: string;
		children: Snippet;
	}

	let { 
		inline = false,
		class: className = '',
		style,
		children 
	}: Props = $props();
</script>

<div class="center {className}" {style} data-inline={inline}>
	{@render children()}
</div>

<style>
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.center[data-inline="true"] {
		display: inline-flex;
	}
</style>