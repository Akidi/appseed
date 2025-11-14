<!--
@component
An individual dropdown menu item component with optional danger styling for destructive actions.

@example
```svelte
<DropdownItem
  onclick={() => console.log('clicked')}
  disabled={false}
  danger={false}
  class="custom-item"
>
  Menu Item Text
</DropdownItem>
```

See Storybook for additional examples and visual documentation.

@param {() => void} [onclick] - Click event handler for the item
@param {boolean} [disabled=false] - Whether the item is disabled and non-interactive
@param {boolean} [danger=false] - Applies danger/destructive styling (typically red color)
@param {string} [class] - Additional CSS classes to apply to the button
@param {Snippet} children - The menu item content

@accessibility
Uses role="menuitem" with proper tabindex management. Disabled items have tabindex="-1" to skip keyboard navigation.
-->

<script lang="ts">
	interface Props {
		onclick?: () => void;
		disabled?: boolean;
		danger?: boolean;
		class?: string;
		children: any;
	}

	let {
		onclick,
		disabled = false,
		danger = false,
		class: className = '',
		children
	}: Props = $props();

	const handleClick = () => {
		if (!disabled && onclick) {
			onclick();
		}
	};
</script>

<button
	type="button"
	onclick={handleClick}
	disabled={disabled}
	class="dropdown-item {className}"
	class:danger={danger}
	class:disabled={disabled}
	role="menuitem"
	tabindex={disabled ? -1 : 0}
>
	{@render children()}
</button>

<style>
	.dropdown-item {
		display: flex;
		width: 100%;
		align-items: center;
		padding: var(--space-sm) var(--space-lg);
		text-align: left;
		font-size: var(--font-size-sm);
		color: var(--text-primary);
		background: transparent;
		border: none;
		transition: all var(--transition-fast);
		cursor: pointer;
	}

	.dropdown-item:hover:not(.disabled) {
		background-color: var(--bg-secondary);
	}

	.dropdown-item:focus {
		outline: none;
		background-color: var(--bg-secondary);
	}

	.dropdown-item.danger:not(.disabled) {
		color: var(--color-error);
	}

	.dropdown-item.danger:hover:not(.disabled),
	.dropdown-item.danger:focus:not(.disabled) {
		background-color: var(--color-error-light);
	}

	.dropdown-item.disabled {
		color: var(--text-disabled);
		cursor: not-allowed;
	}
</style>
