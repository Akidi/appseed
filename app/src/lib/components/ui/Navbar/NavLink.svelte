<!--
@component
A navigation link component with support for external links and click handlers.

@example
```svelte
<NavLink
  href="/products"
  external={false}
  onclick={() => console.log('clicked')}
  class="custom-nav-link"
>
  Products
</NavLink>
```

See Storybook for additional examples and visual documentation.

@param {string} href - The URL for the navigation link
@param {boolean} [external=false] - Whether the link points to an external site (adds target="_blank" and icon)
@param {() => void} [onclick] - Optional click event handler
@param {string} [class] - Additional CSS classes to apply to the anchor element
@param {Snippet} children - The link content

@note External links automatically include rel="noopener noreferrer" for security and display an external link icon.

@accessibility
External links include proper target and rel attributes. Icon is marked aria-hidden to avoid redundant screen reader announcements.
-->

<script lang="ts">
	interface Props {
		href: string;
		external?: boolean;
		onclick?: () => void;
		class?: string;
		children: any;
	}

	let { href, external = false, onclick, class: className = '', children }: Props = $props();
</script>
<a
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
	onclick={onclick}
	class={className}
>
	{@render children()}
	{#if external}
		<svg class="external-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
			/>
		</svg>
	{/if}
</a>

<style>
	.external-icon {
		display: inline;
		width: 1rem;
		height: 1rem;
		margin-left: var(--space-xs);
	}
</style>
