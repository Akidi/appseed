<!--
@component
A tab content panel component that displays when its corresponding tab is active.

@example
```svelte
<Tabs>
  <TabList>
    <Tab id="content1" label="Content 1" />
  </TabList>

  <TabPanel
    id="content1"
    class="custom-panel"
  >
    <p>This content is shown when the tab is active</p>
  </TabPanel>
</Tabs>
```

See Storybook for additional examples and visual documentation.

@param {string} id - Unique identifier matching the corresponding Tab id
@param {string} [class] - Additional CSS classes to apply to the panel
@param {Snippet} children - Content to display when the tab is active

@note Must be used inside a Tabs component. Only renders when the corresponding tab is active.

@accessibility
Uses role="tabpanel" with aria-labelledby linking to the tab button. Has tabindex="0" for focus management.
-->

<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		class?: string;
		children: Snippet;
	}

	let {
		id,
		class: className = '',
		children
	}: Props = $props();

	const tabsContext = getContext<{
		activeTab: () => string;
	}>('tabs');

	const isActive = $derived(tabsContext.activeTab() === id);
</script>

{#if isActive}
	<div
		id="{id}-panel"
		role="tabpanel"
		aria-labelledby={id}
		tabindex={0}
		class="tab-panel {className}"
	>
		{@render children()}
	</div>
{/if}

<style>
	.tab-panel {
		padding: var(--space-lg) 0;
	}
</style>
