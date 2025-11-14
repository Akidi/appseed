<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Dropdown from './Dropdown.svelte';
	import DropdownItem from './DropdownItem.svelte';
	import DropdownDivider from './DropdownDivider.svelte';

	const onActionFn = fn().mockName('onAction');

	/**
	 * Dropdown component for displaying action menus and navigation options.
	 * Automatically closes on outside click or Escape key.
	 */
	const { Story } = defineMeta({
		component: Dropdown,
		title: 'UI/Dropdown',
		tags: ['autodocs'],
		args: {
			label: 'Actions',
			align: 'left',
			buttonVariant: 'secondary',
			buttonSize: 'md',
			disabled: false
		},
		argTypes: {
			align: {
				control: 'select',
				options: ['left', 'right']
			},
			buttonVariant: {
				control: 'select',
				options: ['primary', 'secondary', 'ghost']
			},
			buttonSize: {
				control: 'select',
				options: ['sm', 'md', 'lg']
			},
			disabled: { control: 'boolean' }
		}
	});
</script>

<Story name="Basic">
	{#snippet template()}
		<Dropdown label="Actions">
			<DropdownItem onclick={() => onActionFn('edit')}>Edit</DropdownItem>
			<DropdownItem onclick={() => onActionFn('duplicate')}>Duplicate</DropdownItem>
			<DropdownDivider />
			<DropdownItem onclick={() => onActionFn('archive')}>Archive</DropdownItem>
		</Dropdown>
	{/snippet}
</Story>

<Story name="Right Aligned">
	{#snippet template()}
		<div style="display: flex; justify-content: flex-end;">
			<Dropdown label="Options" align="right">
				<DropdownItem onclick={() => onActionFn('settings')}>Settings</DropdownItem>
				<DropdownItem onclick={() => onActionFn('profile')}>Profile</DropdownItem>
				<DropdownDivider />
				<DropdownItem onclick={() => onActionFn('logout')}>Logout</DropdownItem>
			</Dropdown>
		</div>
	{/snippet}
</Story>

<Story name="Primary Button">
	{#snippet template()}
		<Dropdown label="Create New" buttonVariant="primary">
			<DropdownItem onclick={() => onActionFn('product')}>
				<div style="font-weight: 600;">New Product</div>
				<div style="font-size: 0.75rem; color: #6b7280;">Add a product to inventory</div>
			</DropdownItem>
			<DropdownItem onclick={() => onActionFn('category')}>
				<div style="font-weight: 600;">New Category</div>
				<div style="font-size: 0.75rem; color: #6b7280;">Create a category</div>
			</DropdownItem>
			<DropdownItem onclick={() => onActionFn('tag')}>
				<div style="font-weight: 600;">New Tag</div>
				<div style="font-size: 0.75rem; color: #6b7280;">Add a new tag</div>
			</DropdownItem>
		</Dropdown>
	{/snippet}
</Story>

<Story name="With Danger Action">
	{#snippet template()}
		<Dropdown label="More">
			<DropdownItem onclick={() => onActionFn('edit')}>Edit</DropdownItem>
			<DropdownItem onclick={() => onActionFn('share')}>Share</DropdownItem>
			<DropdownDivider />
			<DropdownItem danger onclick={() => onActionFn('delete')}>Delete</DropdownItem>
		</Dropdown>
	{/snippet}
</Story>

<Story name="With Disabled Items">
	{#snippet template()}
		<Dropdown label="Actions">
			<DropdownItem onclick={() => onActionFn('view')}>View</DropdownItem>
			<DropdownItem onclick={() => onActionFn('edit')}>Edit</DropdownItem>
			<DropdownItem disabled>Share (Coming Soon)</DropdownItem>
			<DropdownDivider />
			<DropdownItem onclick={() => onActionFn('download')}>Download</DropdownItem>
		</Dropdown>
	{/snippet}
</Story>

<Story name="Disabled Dropdown">
	{#snippet template()}
		<Dropdown label="Disabled" disabled>
			<DropdownItem>Item 1</DropdownItem>
			<DropdownItem>Item 2</DropdownItem>
		</Dropdown>
	{/snippet}
</Story>

<Story name="Different Sizes">
	{#snippet template()}
		<div style="display: flex; gap: 1rem; align-items: center;">
			<Dropdown label="Small" buttonSize="sm">
				<DropdownItem onclick={() => onActionFn('action1')}>Action 1</DropdownItem>
				<DropdownItem onclick={() => onActionFn('action2')}>Action 2</DropdownItem>
			</Dropdown>
			<Dropdown label="Medium" buttonSize="md">
				<DropdownItem onclick={() => onActionFn('action1')}>Action 1</DropdownItem>
				<DropdownItem onclick={() => onActionFn('action2')}>Action 2</DropdownItem>
			</Dropdown>
			<Dropdown label="Large" buttonSize="lg">
				<DropdownItem onclick={() => onActionFn('action1')}>Action 1</DropdownItem>
				<DropdownItem onclick={() => onActionFn('action2')}>Action 2</DropdownItem>
			</Dropdown>
		</div>
	{/snippet}
</Story>

<Story name="Use Cases">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 2rem;">
			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">Table Row Actions</h3>
				<Dropdown label="⋮" buttonVariant="ghost" buttonSize="sm">
					<DropdownItem onclick={() => onActionFn('view')}>View Details</DropdownItem>
					<DropdownItem onclick={() => onActionFn('edit')}>Edit</DropdownItem>
					<DropdownItem onclick={() => onActionFn('duplicate')}>Duplicate</DropdownItem>
					<DropdownDivider />
					<DropdownItem danger onclick={() => onActionFn('delete')}>Delete</DropdownItem>
				</Dropdown>
			</div>

			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">User Menu</h3>
				<Dropdown label="John Doe">
					<DropdownItem onclick={() => onActionFn('profile')}>
						<div style="font-weight: 600;">My Profile</div>
						<div style="font-size: 0.75rem; color: #6b7280;">View your profile</div>
					</DropdownItem>
					<DropdownItem onclick={() => onActionFn('settings')}>
						<div style="font-weight: 600;">Settings</div>
						<div style="font-size: 0.75rem; color: #6b7280;">Manage your account</div>
					</DropdownItem>
					<DropdownDivider />
					<DropdownItem onclick={() => onActionFn('logout')}>Sign out</DropdownItem>
				</Dropdown>
			</div>

			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">Export Options</h3>
				<Dropdown label="Export" buttonVariant="primary">
					<DropdownItem onclick={() => onActionFn('csv')}>Export as CSV</DropdownItem>
					<DropdownItem onclick={() => onActionFn('excel')}>Export as Excel</DropdownItem>
					<DropdownItem onclick={() => onActionFn('pdf')}>Export as PDF</DropdownItem>
				</Dropdown>
			</div>
		</div>
	{/snippet}
</Story>