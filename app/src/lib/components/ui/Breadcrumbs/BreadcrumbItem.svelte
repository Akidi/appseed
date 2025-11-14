<!--
@component
An individual breadcrumb item component that renders as either a link or plain text based on current state.

@example
```svelte
<BreadcrumbItem
  href="/products"
  current={false}
  class="custom-item"
>
  Products
</BreadcrumbItem>
```

See Storybook for additional examples and visual documentation.

@param {string} [href] - URL for the breadcrumb link (omit for current page or non-linked items)
@param {boolean} [current=false] - Whether this item represents the current page
@param {string} [class] - Additional CSS classes to apply to the list item
@param {Snippet} children - The breadcrumb item content

@note When current is true or href is omitted, renders as a span instead of a link.

@accessibility
Sets aria-current="page" on current page items for screen reader context.
-->

<script lang="ts">
	interface Props {
		href?: string;
		current?: boolean;
		class?: string;
		children: any;
	}

	let {
		href,
		current = false,
		class: className = '',
		children
	}: Props = $props();
</script>

<li class={className}>
	{#if current || !href}
		<span aria-current={current ? 'page' : undefined}>
			{@render children()}
		</span>
	{:else}
		<a {href}>
			{@render children()}
		</a>
	{/if}
</li>