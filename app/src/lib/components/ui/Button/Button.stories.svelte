<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';

	const { Story } = defineMeta({
		component: Button,
		title: 'UI/Button',
		tags: ['autodocs'],
		args: {
			type: 'button',
			variant: 'primary',
			outline: false,
			size: 'md',
			disabled: false,
			loading: false,
			fullWidth: false
		},
		argTypes: {
			variant: {
				control: 'select',
				options: ['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'ghost', 'link']
			},
			outline: { control: 'boolean' },
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg']
			},
			disabled: { control: 'boolean' },
			loading: { control: 'boolean' },
			fullWidth: { control: 'boolean' }
		}
	});
</script>

<Story name="Primary">
	Primary Button
</Story>

<Story name="Secondary" args={{ variant: 'secondary' }}>
	Secondary Button
</Story>

<Story name="Success" args={{ variant: 'success' }}>
	Success Button
</Story>

<Story name="Warning" args={{ variant: 'warning' }}>
	Warning Button
</Story>

<Story name="Info" args={{ variant: 'info' }}>
	Info Button
</Story>

<Story name="Danger" args={{ variant: 'danger' }}>
	Danger Button
</Story>

<Story name="Ghost" args={{ variant: 'ghost' }}>
	Ghost Button
</Story>

<Story name="Link" args={{ variant: 'link' }}>
	Link Button
</Story>

<Story name="All Solid Variants">
	{#snippet template()}
		<div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="success">Success</Button>
			<Button variant="warning">Warning</Button>
			<Button variant="info">Info</Button>
			<Button variant="danger">Danger</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
		</div>
	{/snippet}
</Story>

<Story name="All Outline Variants">
	{#snippet template()}
		<div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
			<Button variant="primary" outline>Primary</Button>
			<Button variant="secondary" outline>Secondary</Button>
			<Button variant="success" outline>Success</Button>
			<Button variant="warning" outline>Warning</Button>
			<Button variant="info" outline>Info</Button>
			<Button variant="danger" outline>Danger</Button>
			<Button variant="ghost" outline>Ghost</Button>
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template()}
		<div style="display: flex; gap: 1rem; align-items: center;">
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	{/snippet}
</Story>

<Story name="Outline Sizes">
	{#snippet template()}
		<div style="display: flex; gap: 1rem; align-items: center;">
			<Button size="sm" outline>Small</Button>
			<Button size="md" outline>Medium</Button>
			<Button size="lg" outline>Large</Button>
		</div>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template()}
		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
			<Button disabled>Disabled</Button>
			<Button variant="success" disabled>Disabled Success</Button>
			<Button variant="danger" disabled>Disabled Danger</Button>
			<Button outline disabled>Disabled Outline</Button>
		</div>
	{/snippet}
</Story>

<Story name="Loading">
	{#snippet template()}
		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
			<Button loading>Loading</Button>
			<Button variant="success" loading>Saving...</Button>
			<Button variant="danger" loading>Deleting...</Button>
			<Button outline loading>Loading Outline</Button>
		</div>
	{/snippet}
</Story>

<Story name="Full Width">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
			<Button fullWidth>Full Width Button</Button>
			<Button variant="success" fullWidth>Full Width Success</Button>
			<Button outline fullWidth>Full Width Outline</Button>
		</div>
	{/snippet}
</Story>

<Story name="With Icons">
	{#snippet template()}
		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
			<Button>
				<svg style="width: 1rem; height: 1rem; margin-right: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
				Add Item
			</Button>
			<Button variant="danger">
				<svg style="width: 1rem; height: 1rem; margin-right: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
				</svg>
				Delete
			</Button>
			<Button variant="success" outline>
				<svg style="width: 1rem; height: 1rem; margin-right: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				Approve
			</Button>
		</div>
	{/snippet}
</Story>

<Story name="Button Group">
	{#snippet template()}
		<div style="display: flex; gap: 0.5rem;">
			<Button variant="secondary">Cancel</Button>
			<Button variant="primary">Save</Button>
		</div>
	{/snippet}
</Story>