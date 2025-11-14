<script lang="ts" context="module">
	import type { Meta } from '@storybook/svelte';
	import Navbar from './Navbar.svelte';

	export const meta: Meta<typeof Navbar> = {
		title: 'UI/Navbar',
		component: Navbar,
		tags: ['autodocs']
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import NavLogo from './NavLogo.svelte';
	import NavLink from './NavLink.svelte';
	import Button from '../Button/Button.svelte';
</script>

<Story name="Default">
	<Navbar>
		<NavLogo href="/">My App</NavLogo>
		<NavLink href="/">Home</NavLink>
		<NavLink href="/about">About</NavLink>
		<NavLink href="/contact">Contact</NavLink>
	</Navbar>
</Story>

<Story name="With Active Link">
	<Navbar>
		<NavLogo href="/">My App</NavLogo>
		<NavLink href="/">Home</NavLink>
		<NavLink href="/products" active>Products</NavLink>
		<NavLink href="/blog">Blog</NavLink>
		<NavLink href="/contact">Contact</NavLink>
	</Navbar>
</Story>

<Story name="With Actions">
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
</Story>

<Story name="Simple">
	<Navbar>
		<NavLogo href="/">Brand</NavLogo>
		<NavLink href="/docs">Docs</NavLink>
		<NavLink href="/api">API</NavLink>
	</Navbar>
</Story>
