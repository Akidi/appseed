<!--
	@component
	Layout components for stacking elements

	@param gap {'xs' | 'sm' | 'md' | 'lg' | 'xl'} [gap='md'] 
-->
<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		align?: 'start' | 'center' | 'end' | 'stretch';
		class?: string
		style?: string
		children: Snippet;
	}

	let { 
		gap = 'md',
		align = 'stretch',
		class: className = "",
		style,
		children 
	}: Props = $props();
</script>

<div class="stack {className}" {style} data-gap={gap} data-align={align}>
	{@render children()}
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
	}
	
	.stack[data-align="start"] { align-items: flex-start; }
	.stack[data-align="center"] { align-items: center; }
	.stack[data-align="end"] { align-items: flex-end; }
	.stack[data-align="stretch"] { align-items: stretch; }
	
	.stack[data-gap="xs"] { gap: var(--space-xs); }
	.stack[data-gap="sm"] { gap: var(--space-sm); }
	.stack[data-gap="md"] { gap: var(--space-md); }
	.stack[data-gap="lg"] { gap: var(--space-lg); }
	.stack[data-gap="xl"] { gap: var(--space-xl); }
</style>