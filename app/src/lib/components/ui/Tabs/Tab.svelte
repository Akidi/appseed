<!--
@component
An individual tab button component that must be used within a Tabs context.

@example
```svelte
<Tabs>
  <TabList>
    <Tab
      id="profile"
      label="Profile"
      disabled={false}
      class="custom-tab"
    />
  </TabList>
  <TabPanel id="profile">Content here</TabPanel>
</Tabs>
```

See Storybook for additional examples and visual documentation.

@param {string} id - Unique identifier for the tab (must match corresponding TabPanel id)
@param {string} label - Text label displayed on the tab button
@param {boolean} [disabled=false] - Whether the tab is disabled and cannot be selected
@param {string} [class] - Additional CSS classes to apply to the tab button

@note Must be used inside a Tabs component. Automatically determines active state from context.

@accessibility
Uses role="tab" with proper aria-selected state. Active tab has tabindex="0", inactive tabs have tabindex="-1" for keyboard navigation.
-->

<script lang="ts">
	import { getContext } from 'svelte';

	interface Props {
		id: string;
		label: string;
		disabled?: boolean;
		class?: string;
	}

	let {
		id,
		label,
		disabled = false,
		class: className = ''
	}: Props = $props();

	const tabsContext = getContext<{
		activeTab: () => string;
		selectTab: (id: string) => void;
	}>('tabs');

	const isActive = $derived(tabsContext.activeTab() === id);

	const handleClick = () => {
		if (!disabled) {
			tabsContext.selectTab(id);
		}
	};
</script>

<button
	type="button"
	onclick={handleClick}
	disabled={disabled}
	role="tab"
	aria-selected={isActive}
	aria-controls="{id}-panel"
	tabindex={isActive ? 0 : -1}
	class="tab {className}"
	class:active={isActive}
	class:disabled={disabled}
>
	{label}
</button>

<style>
	.tab {
		padding: var(--space-md) var(--space-lg);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
		background: transparent;
		border: none;
		border-bottom: 2px solid transparent;
		transition: all var(--transition-fast);
		cursor: pointer;
	}

	.tab:focus-visible {
		outline: none;
		box-shadow: var(--focus-ring);
	}

	.tab:not(.active):not(.disabled):hover {
		color: var(--text-primary);
		border-bottom-color: var(--border-secondary);
	}

	.tab.active {
		color: var(--color-primary);
		border-bottom-color: var(--color-primary);
	}

	.tab.disabled {
		color: var(--text-disabled);
		cursor: not-allowed;
		opacity: 0.5;
	}
</style>
