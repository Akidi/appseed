<!--
@component
A visual divider component for separating groups of items within a dropdown menu.

@example
```svelte
<Dropdown label="Options">
  <DropdownItem>Edit</DropdownItem>
  <DropdownDivider />
  <DropdownItem danger>Delete</DropdownItem>
</Dropdown>
```

See Storybook for additional examples and visual documentation.

@note This component has no props and renders a simple horizontal line separator.

@accessibility
Uses role="separator" for proper semantic meaning in dropdown menus.
-->

<div class="dropdown-divider" role="separator"></div>

<style>
	.dropdown-divider {
		margin: var(--space-xs) 0;
		border-top: 1px solid var(--border-primary);
	}
</style>
