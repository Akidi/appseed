<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Avatar from './Avatar.svelte';

	const { Story } = defineMeta({
		component: Avatar,
		title: 'UI/Avatar',
		tags: ['autodocs'],
		args: {
			fallback: 'AB',
			size: 'md',
			shape: 'circle'
		},
		argTypes: {
			size: {
				control: 'select',
				options: ['xs', 'sm', 'md', 'lg', 'xl']
			},
			shape: {
				control: 'select',
				options: ['circle', 'square', 'rounded']
			},
			status: {
				control: 'select',
				options: ['online', 'offline', 'busy', 'away']
			},
			statusPosition: {
				control: 'select',
				options: ['top-right', 'bottom-right', 'top-left', 'bottom-left']
			}
		}
	});
</script>

<script lang="ts">
	import { Cluster, Stack } from '$lib/components/layout';
</script>

<Story name="Default" />

<Story name="With Image">
	{#snippet template()}
		<Avatar src="https://i.pravatar.cc/150?img=1" alt="User" fallback="U" />
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template()}
		<Cluster gap="md">
			<Avatar fallback="XS" size="xs" />
			<Avatar fallback="SM" size="sm" />
			<Avatar fallback="MD" size="md" />
			<Avatar fallback="LG" size="lg" />
			<Avatar fallback="XL" size="xl" />
		</Cluster>
	{/snippet}
</Story>

<Story name="Shapes">
	{#snippet template()}
		<Cluster gap="md">
			<Avatar fallback="AB" shape="circle" />
			<Avatar fallback="CD" shape="rounded" />
			<Avatar fallback="EF" shape="square" />
		</Cluster>
	{/snippet}
</Story>

<Story name="With Status">
	{#snippet template()}
		<Cluster gap="lg">
			<Avatar fallback="ON" status="online" />
			<Avatar fallback="OF" status="offline" />
			<Avatar fallback="BS" status="busy" />
			<Avatar fallback="AW" status="away" />
		</Cluster>
	{/snippet}
</Story>

<Story name="Fallback Colors">
	{#snippet template()}
		<Cluster gap="md">
			<Avatar fallback="AB" />
			<Avatar fallback="CD" />
			<Avatar fallback="EF" />
			<Avatar fallback="GH" />
			<Avatar fallback="IJ" />
			<Avatar fallback="KL" />
		</Cluster>
	{/snippet}
</Story>
