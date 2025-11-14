<!--
@component
A container component for Tab buttons that implements the tablist ARIA pattern.

@example
```svelte
<Tabs>
  <TabList class="custom-tab-list">
    <Tab id="tab1" label="First Tab" />
    <Tab id="tab2" label="Second Tab" />
  </TabList>

  <TabPanel id="tab1">First content</TabPanel>
  <TabPanel id="tab2">Second content</TabPanel>
</Tabs>
```

See Storybook for additional examples and visual documentation.

@param {string} [class] - Additional CSS classes to apply to the tab list container
@param {Snippet} children - Tab button components

@note Must be used inside a Tabs component and should contain Tab components as children.

@accessibility
Uses role="tablist" with aria-label for proper screen reader context. Wraps tabs in semantic nav element.
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let {
		class: className = '',
		children
	}: Props = $props();
</script>

<div 
	class="tab-list {className}"
	role="tablist"
	aria-label="Tabs"
>
	<nav class="tab-nav" aria-label="Tabs">
		{@render children()}
	</nav>
</div>

<style>
	.tab-list {
		border-bottom: 1px solid var(--border-primary);
	}

	.tab-nav {
		display: flex;
		gap: var(--space-xs);
	}
</style>
