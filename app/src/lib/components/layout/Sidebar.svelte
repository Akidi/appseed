<!--
@component
A sidebar layout component with fixed-width sidebar and flexible main content area, responsive on mobile.

@example
```svelte
<Sidebar
  side="left"
  sidebarWidth="250px"
  gap="md"
>
  {#snippet sidebar()}
    <nav>Navigation links...</nav>
  {/snippet}

  <div>Main content here</div>
</Sidebar>
```

See Storybook for additional examples and visual documentation.

@param {'left'|'right'} [side='left'] - Which side to position the sidebar
@param {string} [sidebarWidth='250px'] - Fixed width of the sidebar (any CSS unit)
@param {'xs'|'sm'|'md'|'lg'|'xl'} [gap='md'] - Gap between sidebar and main content
@param {Snippet} sidebar - Sidebar content (use snippet syntax)
@param {Snippet} children - Main content area

@note Automatically stacks to single column below 768px breakpoint, with sidebar on top.
-->

<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		side?: 'left' | 'right';
		sidebarWidth?: string;
		gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		sidebar: Snippet;
		children: Snippet;
	}

	let { 
		side = 'left',
		sidebarWidth = '250px',
		gap = 'md',
		sidebar,
		children 
	}: Props = $props();
</script>

<div class="sidebar-layout" data-side={side} data-gap={gap} style="--sidebar-width: {sidebarWidth}">
	<aside class="sidebar">
		{@render sidebar()}
	</aside>
	<main class="content">
		{@render children()}
	</main>
</div>

<style>
	.sidebar-layout {
		display: grid;
		grid-template-columns: var(--sidebar-width) 1fr;
	}
	
	.sidebar-layout[data-side="right"] {
		grid-template-columns: 1fr var(--sidebar-width);
	}
	
	.sidebar-layout[data-side="right"] .sidebar {
		order: 2;
	}
	
	.sidebar-layout[data-gap="xs"] { gap: var(--space-xs); }
	.sidebar-layout[data-gap="sm"] { gap: var(--space-sm); }
	.sidebar-layout[data-gap="md"] { gap: var(--space-md); }
	.sidebar-layout[data-gap="lg"] { gap: var(--space-lg); }
	.sidebar-layout[data-gap="xl"] { gap: var(--space-xl); }
	
	@media (max-width: 768px) {
		.sidebar-layout {
			grid-template-columns: 1fr;
		}
		
		.sidebar-layout[data-side="right"] .sidebar {
			order: 0;
		}
	}
</style>