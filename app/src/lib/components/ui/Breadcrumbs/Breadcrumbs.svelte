<!--
@component
A breadcrumb navigation component for displaying hierarchical page structure with customizable separators.

@example
```svelte
<Breadcrumbs
  separator="chevron"
  maxItems={5}
  class="custom-breadcrumbs"
>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem current>Detail</BreadcrumbItem>
</Breadcrumbs>
```

See Storybook for additional examples and visual documentation.

@param {'slash'|'chevron'|'arrow'} [separator='chevron'] - Visual separator style between breadcrumb items
@param {number} [maxItems] - Maximum number of items to display before truncating
@param {string} [class] - Additional CSS classes to apply to the breadcrumb navigation
@param {Snippet} children - Breadcrumb items (use BreadcrumbItem components)

@accessibility
Uses semantic nav element with aria-label="Breadcrumb". Implements proper list structure (ol/li) for screen reader navigation.
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		separator?: 'slash' | 'chevron' | 'arrow';
		maxItems?: number;
		class?: string;
		children: Snippet;
	}

	let {
		separator = 'chevron',
		maxItems,
		class: className = '',
    children
	}: Props = $props();
</script>

<nav aria-label="Breadcrumb" class="breadcrumbs {className}">
	<ol class="breadcrumbs-list" data-separator={separator}>
		{@render children()}
	</ol>
</nav>

<style>
	.breadcrumbs {
		display: block;
	}

	.breadcrumbs-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-xs);
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.breadcrumbs-list :global(li) {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
	}

	.breadcrumbs-list :global(li:not(:last-child)::after) {
		content: '';
		display: inline-block;
		width: 1rem;
		height: 1rem;
		color: var(--text-tertiary);
		flex-shrink: 0;
	}

	.breadcrumbs-list[data-separator='slash'] :global(li:not(:last-child)::after) {
		content: '/';
		width: auto;
		font-size: var(--font-size-sm);
	}

	.breadcrumbs-list[data-separator='chevron'] :global(li:not(:last-child)::after) {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23999'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5l7 7-7 7'/%3E%3C/svg%3E");
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}

	.breadcrumbs-list[data-separator='arrow'] :global(li:not(:last-child)::after) {
		content: '→';
		width: auto;
		font-size: var(--font-size-sm);
	}

	.breadcrumbs-list :global(a) {
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.breadcrumbs-list :global(a:hover) {
		color: var(--color-primary);
		text-decoration: underline;
	}

	.breadcrumbs-list :global(a:focus-visible) {
		outline: 2px solid var(--border-focus);
		outline-offset: 2px;
		border-radius: var(--radius-sm);
	}

	.breadcrumbs-list :global(span) {
		font-size: var(--font-size-sm);
		color: var(--text-primary);
		font-weight: var(--font-weight-medium);
	}
</style>