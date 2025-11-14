<!--
@component
A flexible flexbox layout component with comprehensive control over direction, alignment, spacing, and wrapping.

@example
```svelte
<Flex
  direction="row"
  justify="between"
  align="center"
  gap="md"
  wrap={false}
  class="custom-flex"
>
  <Button>Item 1</Button>
  <Button>Item 2</Button>
  <Button>Item 3</Button>
</Flex>
```

See Storybook for additional examples and visual documentation.

@param {'row'|'column'} [direction='row'] - Flex direction
@param {'start'|'center'|'between'|'around'|'end'} [justify='start'] - Main axis alignment (justify-content)
@param {'start'|'center'|'end'|'stretch'} [align='center'] - Cross axis alignment (align-items)
@param {'xs'|'sm'|'md'|'lg'|'xl'} [gap='md'] - Gap between items
@param {boolean} [wrap=false] - Enable flex-wrap for multi-line layouts
@param {string} [class] - Additional CSS classes to apply
@param {Snippet} children - Content items to arrange with flexbox

@note Similar to Cluster but without automatic wrapping by default. Use wrap prop to enable wrapping behavior.
-->

<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		direction?: 'row' | 'column';
		justify?: 'start' | 'center' | 'between' | 'around' | 'end';
		align?: 'start' | 'center' | 'end' | 'stretch';
		gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
		wrap?: boolean;
		children: Snippet;
	}

	let { 
		direction = 'row',
		justify = 'start',
		align = 'center',
		gap = 'md',
		wrap = false,
		class: className = '',
		children 
	}: Props = $props();
</script>

<div 
	class="flex {className}" 
	data-direction={direction}
	data-justify={justify}
	data-align={align}
	data-gap={gap}
	data-wrap={wrap}
>
	{@render children()}
</div>

<style>
	.flex {
		display: flex;
	}
	
	.flex[data-direction="row"] { flex-direction: row; }
	.flex[data-direction="column"] { flex-direction: column; }
	
	.flex[data-justify="start"] { justify-content: flex-start; }
	.flex[data-justify="center"] { justify-content: center; }
	.flex[data-justify="between"] { justify-content: space-between; }
	.flex[data-justify="around"] { justify-content: space-around; }
	.flex[data-justify="end"] { justify-content: flex-end; }
	
	.flex[data-align="start"] { align-items: flex-start; }
	.flex[data-align="center"] { align-items: center; }
	.flex[data-align="end"] { align-items: flex-end; }
	.flex[data-align="stretch"] { align-items: stretch; }
	
	.flex[data-wrap="true"] { flex-wrap: wrap; }
	
	.flex[data-gap="xs"] { gap: var(--space-xs); }
	.flex[data-gap="sm"] { gap: var(--space-sm); }
	.flex[data-gap="md"] { gap: var(--space-md); }
	.flex[data-gap="lg"] { gap: var(--space-lg); }
	.flex[data-gap="xl"] { gap: var(--space-xl); }
</style>