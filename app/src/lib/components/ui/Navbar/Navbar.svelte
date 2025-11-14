<!--
@component
A responsive navigation bar with logo, links, dropdown menus, theme switcher, and mobile menu.

@example
```svelte
<Navbar
  logo="My App"
  navLinks={[
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
      name: 'Products',
      children: [
        { name: 'All Products', href: '/products', description: 'Browse catalog' },
        { name: 'New Arrivals', href: '/products/new' }
      ]
    },
    { name: 'Docs', href: 'https://docs.example.com', external: true }
  ]}
/>
```

See Storybook for additional examples and visual documentation.

@param {string} [logo='App'] - Logo/brand text displayed in the navbar
@param {NavItem[]} navLinks - Array of navigation items (can include nested children for dropdown menus)

@note Navigation items with children prop render as dropdown menus. Active states are automatically determined based on current route. Mobile menu displays below 640px breakpoint.

@accessibility
Uses semantic nav element. Mobile menu button includes aria-controls, aria-expanded, and aria-label. Nested navigation items use proper details/summary structure in mobile view.
-->

<script lang="ts">
	import { page } from '$app/state';
	import type { NavItem } from '$lib/types/navigation';
	import NavLogo from './NavLogo.svelte';
	import NavLink from './NavLink.svelte';
	import { Dropdown } from '$lib/components/ui';
	import { Flex } from '$lib/components/layout';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	interface Props {
		logo?: string;
		navLinks: NavItem[];
	}

	let { logo = 'App', navLinks }: Props = $props();

	let mobileMenuOpen = $state(false);

	function isCurrentPage(href: string) {
		if (href === '/') {
			return page.url.pathname === '/';
		}
		return page.url.pathname.startsWith(href);
	}

	function isNavItemActive(item: NavItem) {
		if (item.href) {
			return isCurrentPage(item.href);
		}

		if (item.children?.length) {
			return item.children.some((child) => isCurrentPage(child.href));
		}

		return false;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>
<nav class="navbar">
	<div class="navbar-container">
		<Flex justify="between" align="center" class="navbar-content">
			<Flex align="center" gap="xl" class="navbar-start">
				<!-- Logo/Brand -->
				<NavLogo text={logo} />

				<!-- Desktop Navigation Links -->
				<Flex align="center" gap="xl" class="navbar-links">
					{#each navLinks as item (item.name)}
						{#if item.children?.length}
							<div class="navbar-dropdown-wrapper">
								<Dropdown label={item.name} buttonVariant="ghost" buttonSize="sm" align="left">
									{#each item.children as child (child.name)}
										<NavLink
											href={child.href}
											external={child.external}
											class="navbar-dropdown-item"
										>
											<span class="navbar-dropdown-item-name">{child.name}</span>
											{#if child.description}
												<span class="navbar-dropdown-item-desc">{child.description}</span>
											{/if}
										</NavLink>
									{/each}
								</Dropdown>
							</div>
						{:else if item.href}
							<NavLink
								href={item.href}
								external={item.external}
								class="navbar-link {isCurrentPage(item.href) ? 'active' : ''}"
							>
								{item.name}
							</NavLink>
						{:else}
							<span class="navbar-link-disabled">
								{item.name}
							</span>
						{/if}
					{/each}
				</Flex>
			</Flex>

			<!-- Theme Switcher & Mobile menu button -->
			<Flex align="center" gap="md" class="navbar-end">
				<ThemeSwitcher variant="icon" size="md"/>
				<div class="navbar-mobile-toggle">
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
							<svg class="mobile-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						{:else}
							<svg class="mobile-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						{/if}
					</button>
				</div>
			</Flex>
		</Flex>
	</div>
	<!-- Mobile menu -->
	{#if mobileMenuOpen}
		<div class="mobile-menu" id="mobile-menu">
			<div class="mobile-menu-content">
				{#each navLinks as item (item.name)}
					{#if item.children?.length}
						<details class="mobile-nav-group">
							<summary
								class="mobile-nav-summary {isNavItemActive(item) ? 'active' : ''}"
							>
								<span>{item.name}</span>
								<svg class="mobile-nav-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
								</svg>
							</summary>
							<div class="mobile-nav-children">
								{#each item.children as child (child.name)}
									<NavLink
										href={child.href}
										external={child.external}
										onclick={closeMobileMenu}
										class="mobile-nav-child {isCurrentPage(child.href) ? 'active' : ''}"
									>
										{child.name}
									</NavLink>
								{/each}
							</div>
						</details>
					{:else if item.href}
						<NavLink
							href={item.href}
							external={item.external}
							onclick={closeMobileMenu}
							class="mobile-nav-link {isCurrentPage(item.href) ? 'active' : ''}"
						>
							{item.name}
						</NavLink>
					{:else}
						<span class="mobile-nav-link-disabled">
							{item.name}
						</span>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</nav>

<style>
	.navbar {
		border-bottom: 1px solid var(--border-primary);
		background-color: var(--bg-primary);
		box-shadow: var(--shadow-sm);
	}

	.navbar-container {
		max-width: 80rem;
		margin: 0 auto;
		padding: 0 var(--space-lg);
	}

	@media (min-width: 640px) {
		.navbar-container {
			padding: 0 var(--space-2xl);
		}
	}

	@media (min-width: 1024px) {
		.navbar-container {
			padding: 0 var(--space-3xl);
		}
	}

	.navbar :global(.navbar-content) {
		height: 4rem;
	}

	.navbar :global(.navbar-start) {
		flex: 1;
	}

	.navbar :global(.navbar-links) {
		display: none;
	}

	@media (min-width: 640px) {
		.navbar :global(.navbar-links) {
			display: flex;
		}
	}

	.navbar-dropdown-wrapper {
		position: relative;
		display: inline-block;
	}

	.navbar-dropdown-wrapper :global(.navbar-dropdown-item) {
		display: flex;
		width: 100%;
		flex-direction: column;
		padding: var(--space-sm) var(--space-lg);
		text-align: left;
		font-size: var(--font-size-sm);
		color: var(--text-primary);
		transition: all var(--transition-fast);
	}

	.navbar-dropdown-wrapper :global(.navbar-dropdown-item:hover),
	.navbar-dropdown-wrapper :global(.navbar-dropdown-item:focus) {
		background-color: var(--bg-secondary);
		outline: none;
	}

	.navbar-dropdown-wrapper :global(.navbar-dropdown-item-name) {
		font-weight: var(--font-weight-medium);
	}

	.navbar-dropdown-wrapper :global(.navbar-dropdown-item-desc) {
		margin-top: 0.125rem;
		font-size: var(--font-size-xs);
		color: var(--text-secondary);
	}

	.navbar :global(.navbar-link) {
		display: inline-flex;
		align-items: center;
		border-bottom: 2px solid transparent;
		padding: 0 var(--space-xs);
		padding-top: var(--space-xs);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
		transition: all var(--transition-fast);
	}

	.navbar :global(.navbar-link:hover) {
		border-bottom-color: var(--border-secondary);
		color: var(--text-primary);
	}

	.navbar :global(.navbar-link.active) {
		border-bottom-color: var(--color-primary);
		color: var(--text-primary);
	}

	.navbar-link-disabled {
		display: inline-flex;
		align-items: center;
		border-bottom: 2px solid transparent;
		padding: 0 var(--space-xs);
		padding-top: var(--space-xs);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
	}

	.navbar-mobile-toggle {
		display: flex;
		align-items: center;
	}

	@media (min-width: 640px) {
		.navbar-mobile-toggle {
			display: none;
		}
	}

	.mobile-menu-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-sm);
		color: var(--text-secondary);
		background: transparent;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.mobile-menu-button:hover {
		background-color: var(--bg-secondary);
		color: var(--text-secondary);
	}

	.mobile-menu-button:focus-visible {
		outline: none;
		box-shadow: var(--focus-ring-inset);
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
	}

	@media (min-width: 640px) {
		.mobile-menu {
			display: none;
		}
	}

	.mobile-menu-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		border-top: 1px solid var(--border-primary);
		padding-top: var(--space-sm);
		padding-bottom: var(--space-md);
	}

	.mobile-nav-group {
		display: block;
	}

	.mobile-nav-summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-left: 4px solid transparent;
		padding: var(--space-sm) var(--space-lg) var(--space-sm) var(--space-md);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all var(--transition-fast);
		list-style: none;
	}

	.mobile-nav-summary::-webkit-details-marker {
		display: none;
	}

	.mobile-nav-summary:hover {
		border-left-color: var(--border-secondary);
		background-color: var(--bg-secondary);
		color: var(--text-primary);
	}

	.mobile-nav-summary:focus {
		outline: none;
	}

	.mobile-nav-summary.active {
		border-left-color: var(--color-primary);
		background-color: var(--color-primary-light);
		color: var(--color-primary);
	}

	.mobile-nav-arrow {
		width: 1rem;
		height: 1rem;
		color: var(--text-disabled);
		transition: transform var(--transition-fast);
	}

	.mobile-nav-group[open] .mobile-nav-arrow {
		transform: rotate(180deg);
	}

	.mobile-nav-children {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		border-left: 4px solid var(--color-primary-light);
		background-color: color-mix(in srgb, var(--color-primary-light) 60%, transparent);
		padding: var(--space-xs) var(--space-lg) var(--space-xs) var(--space-2xl);
	}

	.mobile-nav-children :global(.mobile-nav-child) {
		display: block;
		border-left: 4px solid transparent;
		padding: var(--space-sm) var(--space-md);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
		transition: all var(--transition-fast);
	}

	.mobile-nav-children :global(.mobile-nav-child:hover) {
		border-left-color: var(--color-primary-light);
		background-color: var(--color-primary-light);
		color: var(--text-primary);
	}

	.mobile-nav-children :global(.mobile-nav-child.active) {
		border-left-color: var(--color-primary);
		color: var(--color-primary);
	}

	.mobile-menu :global(.mobile-nav-link) {
		display: block;
		border-left: 4px solid transparent;
		padding: var(--space-sm) var(--space-lg) var(--space-sm) var(--space-md);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
		transition: all var(--transition-fast);
	}

	.mobile-menu :global(.mobile-nav-link:hover) {
		border-left-color: var(--border-secondary);
		background-color: var(--bg-secondary);
		color: var(--text-primary);
	}

	.mobile-menu :global(.mobile-nav-link.active) {
		border-left-color: var(--color-primary);
		background-color: var(--color-primary-light);
		color: var(--color-primary);
	}

	.mobile-nav-link-disabled {
		display: block;
		border-left: 4px solid transparent;
		padding: var(--space-sm) var(--space-lg) var(--space-sm) var(--space-md);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
	}
</style>