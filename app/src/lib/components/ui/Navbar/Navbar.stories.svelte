<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Navbar from './Navbar.svelte';

	const { Story } = defineMeta({
		component: Navbar,
		title: 'UI/Navbar',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import NavLogo from './NavLogo.svelte';
	import NavLink from './NavLink.svelte';
	import Button from '../Button/Button.svelte';
</script>

<Story name="Default">
	{#snippet template()}
		<Navbar>
			<NavLogo href="/">My App</NavLogo>
			<NavLink href="/">Home</NavLink>
			<NavLink href="/about">About</NavLink>
			<NavLink href="/contact">Contact</NavLink>
		</Navbar>
	{/snippet}
</Story>

<Story name="With Active Link">
	{#snippet template()}
		<Navbar>
			<NavLogo href="/">My App</NavLogo>
			<NavLink href="/">Home</NavLink>
			<NavLink href="/products" active>Products</NavLink>
			<NavLink href="/blog">Blog</NavLink>
			<NavLink href="/contact">Contact</NavLink>
		</Navbar>
	{/snippet}
</Story>

<Story name="With Actions">
	{#snippet template()}
		<Navbar>
			<NavLogo href="/">My App</NavLogo>
			<NavLink href="/">Home</NavLink>
			<NavLink href="/features">Features</NavLink>
			<NavLink href="/pricing">Pricing</NavLink>
			<div style="margin-left: auto; display: flex; gap: var(--space-sm);">
				<Button variant="secondary" size="sm">Login</Button>
				<Button size="sm">Sign Up</Button>
			</div>
		</Navbar>
	{/snippet}
</Story>

<Story name="Simple">
	{#snippet template()}
		<Navbar>
			<NavLogo href="/">Brand</NavLogo>
			<NavLink href="/docs">Docs</NavLink>
			<NavLink href="/api">API</NavLink>
		</Navbar>
	{/snippet}
</Story>
