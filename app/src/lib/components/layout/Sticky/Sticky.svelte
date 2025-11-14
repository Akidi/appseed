<!--
@component
A sticky positioning wrapper component that makes content stick to a viewport edge while scrolling.

@example
```svelte
<Sticky
  top="0"
  bottom={undefined}
  zIndex={10}
>
  <nav>Sticky navigation bar</nav>
</Sticky>
```

See Storybook for additional examples and visual documentation.

@param {string|number} [top=0] - Distance from top of viewport when stuck (any CSS unit or number for px)
@param {string|number} [bottom] - Distance from bottom of viewport when stuck (alternative to top)
@param {number} [zIndex=10] - Z-index for stacking context
@param {Snippet} children - Content to make sticky

@note Uses CSS position: sticky. The element becomes sticky relative to its nearest scrolling ancestor. Set either top or bottom, not both.
-->

<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		top?: string | number;
		bottom?: string | number;
		zIndex?: number;
		children: Snippet;
	}

	let { 
		top = 0,
		bottom,
		zIndex = 10,
		children 
	}: Props = $props();
</script>

<div class="sticky" style:top style:bottom style:z-index={zIndex}>
	{@render children()}
</div>

<style>
	.sticky {
		position: sticky;
	}
</style>