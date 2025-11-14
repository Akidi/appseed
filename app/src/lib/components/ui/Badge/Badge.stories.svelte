<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Badge from './Badge.svelte';

	const onRemoveFn = fn().mockName('onRemove');

	/**
	 * Badge component for displaying status, labels, and tags.
	 * Supports multiple variants, sizes, and optional features like dots and removal.
	 */
	const { Story } = defineMeta({
		component: Badge,
		title: 'UI/Badge',
		tags: ['autodocs'],
		args: {
			text: 'Badge',
			variant: 'blue',
			size: 'md',
			dot: false,
			removable: false
		},
		argTypes: {
			variant: {
				control: 'select',
				options: ['blue', 'green', 'amber', 'red', 'gray', 'purple']
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg']
			},
			dot: { control: 'boolean' },
			removable: { control: 'boolean' }
		}
	});
</script>

<Story name="Blue" args={{ text: 'Blue', variant: 'blue' }} />

<Story name="Green" args={{ text: 'Green', variant: 'green' }} />

<Story name="Amber" args={{ text: 'Amber', variant: 'amber' }} />

<Story name="Red" args={{ text: 'Red', variant: 'red' }} />

<Story name="Gray" args={{ text: 'Gray', variant: 'gray' }} />

<Story name="Purple" args={{ text: 'Purple', variant: 'purple' }} />

<Story name="Small" args={{ text: 'Small', size: 'sm' }} />

<Story name="Medium" args={{ text: 'Medium', size: 'md' }} />

<Story name="Large" args={{ text: 'Large', size: 'lg' }} />

<Story name="With Dot" args={{ text: 'Active', variant: 'green', dot: true }} />

<Story name="Removable" args={{ text: 'Removable', variant: 'blue', removable: true, onRemove: onRemoveFn }} />

<Story name="All Variants">
	{#snippet template()}
		<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
			<Badge text="Blue" variant="blue" />
			<Badge text="Green" variant="green" />
			<Badge text="Amber" variant="amber" />
			<Badge text="Red" variant="red" />
			<Badge text="Gray" variant="gray" />
			<Badge text="Purple" variant="purple" />
		</div>
	{/snippet}
</Story>

<Story name="All Sizes">
	{#snippet template()}
		<div style="display: flex; gap: 0.5rem; align-items: center;">
			<Badge text="Small" size="sm" />
			<Badge text="Medium" size="md" />
			<Badge text="Large" size="lg" />
		</div>
	{/snippet}
</Story>

<Story name="With Dots">
	{#snippet template()}
		<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
			<Badge text="Active" variant="green" dot />
			<Badge text="Pending" variant="amber" dot />
			<Badge text="Error" variant="red" dot />
			<Badge text="Inactive" variant="gray" dot />
		</div>
	{/snippet}
</Story>

<Story name="Status Badges">
	{#snippet template()}
		<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
			<Badge text="New" variant="blue" />
			<Badge text="In Progress" variant="amber" dot />
			<Badge text="Completed" variant="green" dot />
			<Badge text="Failed" variant="red" />
			<Badge text="Cancelled" variant="gray" />
		</div>
	{/snippet}
</Story>

<Story name="Removable Badges">
	{#snippet template()}
		<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
			<Badge text="Tag 1" variant="blue" removable onRemove={onRemoveFn} />
			<Badge text="Tag 2" variant="green" removable onRemove={onRemoveFn} />
			<Badge text="Tag 3" variant="purple" removable onRemove={onRemoveFn} />
		</div>
	{/snippet}
</Story>

<Story name="Mixed Features">
	{#snippet template()}
		<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
			<Badge text="Active" variant="green" size="sm" dot />
			<Badge text="Beta" variant="blue" size="lg" />
			<Badge text="Premium" variant="purple" dot removable onRemove={onRemoveFn} />
			<Badge text="Sale" variant="red" size="lg" />
		</div>
	{/snippet}
</Story>

<Story name="Use Cases">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 1.5rem;">
			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Product Status</h3>
				<div style="display: flex; gap: 0.5rem;">
					<Badge text="In Stock" variant="green" dot />
					<Badge text="Low Stock" variant="amber" dot />
					<Badge text="Out of Stock" variant="red" />
				</div>
			</div>
			
			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">User Roles</h3>
				<div style="display: flex; gap: 0.5rem;">
					<Badge text="Admin" variant="purple" />
					<Badge text="Editor" variant="blue" />
					<Badge text="Viewer" variant="gray" />
				</div>
			</div>
			
			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Categories</h3>
				<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
					<Badge text="Electronics" variant="blue" removable onRemove={onRemoveFn} />
					<Badge text="Clothing" variant="green" removable onRemove={onRemoveFn} />
					<Badge text="Food" variant="amber" removable onRemove={onRemoveFn} />
				</div>
			</div>
		</div>
	{/snippet}
</Story>