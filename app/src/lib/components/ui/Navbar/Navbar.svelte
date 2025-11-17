<!--
@component
A responsive navigation bar that accepts children components (NavLogo, NavLink, etc.) for flexible composition.

@example
```svelte
<Navbar>
  <NavLogo href="/">My App</NavLogo>
  <NavLink href="/">Home</NavLink>
  <NavLink href="/about">About</NavLink>
  <NavLink href="/contact">Contact</NavLink>

  {#snippet actions()}
    <Button variant="primary" size="sm">Sign In</Button>
  {/snippet}
</Navbar>
```

See Storybook for additional examples and visual documentation.

@param {Snippet} children - Navigation content (NavLogo, NavLink components)
@param {Snippet} [actions] - Optional actions slot for buttons or other elements

@accessibility
Uses semantic nav element with proper ARIA labels. Mobile menu button includes aria-controls and aria-expanded.
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Flex } from '$lib/components/layout';

	interface Props {
		children: Snippet;
		actions?: Snippet;
		class?: string;
	}

	let { children, actions, class: className = '' }: Props = $props();

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav class="navbar {className}">
	<div class="navbar-container">
		<Flex justify="space-between" align="center" class="navbar-content">
			<!-- Desktop Navigation -->
			<Flex align="center" gap="lg" class="navbar-links">
				{@render children()}
			</Flex>

			<!-- Actions & Mobile Toggle -->
			<Flex align="center" gap="md" class="navbar-end">
				{#if actions}
					<div class="navbar-actions">
						{@render actions()}
					</div>
				{/if}

				<button
					type="button"
					onclick={toggleMobileMenu}
					class="mobile-menu-button"
					aria-controls="mobile-menu"
					aria-expanded={mobileMenuOpen}
					aria-label="Toggle mobile menu"
				>
					<span class="sr-only">Open main menu</span>
					{#if mobileMenuOpen}
						<svg class="mobile-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<svg class="mobile-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					{/if}
				</button>
			</Flex>
		</Flex>
	</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="mobile-menu" id="mobile-menu">
			<div class="mobile-menu-content" onclick={closeMobileMenu}>
				{@render children()}
				{#if actions}
					<div class="mobile-menu-actions">
						{@render actions()}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</nav>

<style>
	.navbar {
		position: sticky;
		top: 0;
		z-index: 50;
		border-bottom: 1px solid var(--color-border);
		background-color: var(--color-background);
		box-shadow: var(--shadow-sm);
	}

	.navbar-container {
		max-width: 80rem;
		margin: 0 auto;
		padding: 0 var(--space-lg);
	}

	@media (min-width: 768px) {
		.navbar-container {
			padding: 0 var(--space-xl);
		}
	}

	.navbar :global(.navbar-content) {
		min-height: 4rem;
	}

	.navbar :global(.navbar-links) {
		display: none;
		flex: 1;
	}

	@media (min-width: 768px) {
		.navbar :global(.navbar-links) {
			display: flex;
		}
	}

	.navbar-actions {
		display: none;
	}

	@media (min-width: 768px) {
		.navbar-actions {
			display: flex;
			align-items: center;
			gap: var(--space-sm);
		}
	}

	.navbar-end {
		display: flex;
		align-items: center;
	}

	.mobile-menu-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-sm);
		color: var(--color-text);
		background: transparent;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	@media (min-width: 768px) {
		.mobile-menu-button {
			display: none;
		}
	}

	.mobile-menu-button:hover {
		background-color: var(--color-surface);
	}

	.mobile-menu-button:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
	}

	.mobile-menu-icon {
		width: 1.5rem;
		height: 1.5rem;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	.mobile-menu {
		display: block;
		border-top: 1px solid var(--color-border);
	}

	@media (min-width: 768px) {
		.mobile-menu {
			display: none;
		}
	}

	.mobile-menu-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md) var(--space-lg);
	}

	.mobile-menu-actions {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-top: var(--space-md);
		padding-top: var(--space-md);
		border-top: 1px solid var(--color-border);
	}

	/* Global styles for children NavLinks */
	.navbar :global(.navbar-links a) {
		font-size: var(--font-size-sm);
		font-weight: 500;
		color: var(--color-text-muted);
		text-decoration: none;
		transition: color var(--transition-fast);
		white-space: nowrap;
	}

	.navbar :global(.navbar-links a:hover) {
		color: var(--color-text);
	}

	.navbar :global(.navbar-links a.active) {
		color: var(--color-primary);
	}

	/* Mobile NavLinks */
	.mobile-menu :global(a) {
		display: block;
		padding: var(--space-sm) var(--space-md);
		font-size: var(--font-size-base);
		font-weight: 500;
		color: var(--color-text);
		text-decoration: none;
		border-radius: var(--radius-sm);
		transition: all var(--transition-fast);
	}

	.mobile-menu :global(a:hover) {
		background-color: var(--color-surface);
	}

	.mobile-menu :global(a.active) {
		background-color: var(--color-primary);
		color: var(--color-primary-text);
	}
</style>
