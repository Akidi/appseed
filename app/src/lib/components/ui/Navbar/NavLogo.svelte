<!--
@component
A navigation logo/brand component that links to the home page or specified URL.

@example
```svelte
<NavLogo
  href="/"
  text="My App"
/>
```

See Storybook for additional examples and visual documentation.

@param {string} [href='/'] - The URL the logo links to (defaults to home page)
@param {string} text - The logo/brand text to display

@accessibility
Uses semantic anchor element with clear, descriptive text for screen readers.
-->

<script lang="ts">
	interface Props {
		href?: string;
		text: string;
	}

	let { href = '/', text }: Props = $props();
</script>

<div class="nav-logo">
	<a {href} class="nav-logo-link">{text}</a>
</div>

<style>
	.nav-logo {
		display: flex;
		flex-shrink: 0;
		align-items: center;
	}

	.nav-logo-link {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-primary);
		text-decoration: none;
	}
</style>
