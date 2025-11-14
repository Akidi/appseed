<!--
@component
A tabs container component that manages tab state and provides context to Tab, TabList, and TabPanel components.

@example
```svelte
<Tabs
  bind:activeTab={selectedTab}
  onTabChange={(tabId) => console.log('Changed to:', tabId)}
  class="custom-tabs"
>
  <TabList>
    <Tab id="overview" label="Overview" />
    <Tab id="details" label="Details" />
    <Tab id="settings" label="Settings" disabled />
  </TabList>

  <TabPanel id="overview">Overview content</TabPanel>
  <TabPanel id="details">Details content</TabPanel>
  <TabPanel id="settings">Settings content</TabPanel>
</Tabs>
```

See Storybook for additional examples and visual documentation.

@param {string} [activeTab=''] - Currently active tab ID (bindable)
@param {(tabId: string) => void} [onTabChange] - Callback function when active tab changes
@param {string} [class] - Additional CSS classes to apply to the container
@param {Snippet} children - TabList and TabPanel components

@note Uses Svelte context to share state between Tabs, Tab, and TabPanel components. The activeTab prop is bindable for two-way data binding.

@accessibility
Implements proper ARIA tabs pattern with role="tab", role="tablist", and role="tabpanel". Tab buttons manage aria-selected and tabindex for keyboard navigation.
-->

<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		activeTab?: string;
		onTabChange?: (tabId: string) => void;
		class?: string;
		children: Snippet;
	}

	let {
		activeTab = $bindable(''),
		onTabChange,
		class: className = '',
		children
	}: Props = $props();

	const selectTab = (tabId: string) => {
		activeTab = tabId;
		onTabChange?.(tabId);
	};

	setContext('tabs', {
		activeTab: () => activeTab,
		selectTab
	});
</script>

<div class="w-full {className}">
	{@render children()}
</div>