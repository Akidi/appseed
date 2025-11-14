<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Skeleton from './Skeleton.svelte';

	const { Story } = defineMeta({
		component: Skeleton,
		title: 'UI/Skeleton',
		tags: ['autodocs'],
		args: {
			variant: 'text'
		},
		argTypes: {
			variant: {
				control: 'select',
				options: ['text', 'circular', 'rectangular']
			}
		}
	});
</script>

<script lang="ts">
	import { Stack, Cluster } from '$lib/components/layout';
</script>

<Story name="Text" />

<Story name="Circular">
	{#snippet template()}
		<Skeleton variant="circular" width="3rem" height="3rem" />
	{/snippet}
</Story>

<Story name="Rectangular">
	{#snippet template()}
		<Skeleton variant="rectangular" width="100%" height="200px" />
	{/snippet}
</Story>

<Story name="Card Loading">
	{#snippet template()}
		<div style="max-width: 400px;">
			<Stack gap="md">
				<Cluster gap="md">
					<Skeleton variant="circular" width="3rem" height="3rem" />
					<Stack gap="xs" style="flex: 1;">
						<Skeleton variant="text" width="60%" />
						<Skeleton variant="text" width="40%" />
					</Stack>
				</Cluster>
				<Skeleton variant="rectangular" width="100%" height="200px" />
				<Stack gap="xs">
					<Skeleton variant="text" width="100%" />
					<Skeleton variant="text" width="90%" />
					<Skeleton variant="text" width="80%" />
				</Stack>
			</Stack>
		</div>
	{/snippet}
</Story>

<Story name="List Loading">
	{#snippet template()}
		<Stack gap="md">
			{#each Array(5) as _, i}
				<Cluster gap="md">
					<Skeleton variant="circular" width="2.5rem" height="2.5rem" />
					<Stack gap="xs" style="flex: 1;">
						<Skeleton variant="text" width="70%" />
						<Skeleton variant="text" width="50%" />
					</Stack>
				</Cluster>
			{/each}
		</Stack>
	{/snippet}
</Story>

<Story name="Custom Sizes">
	{#snippet template()}
		<Stack gap="lg">
			<Skeleton variant="text" width="200px" />
			<Skeleton variant="rectangular" width="100px" height="100px" />
			<Skeleton variant="circular" width="60px" height="60px" />
		</Stack>
	{/snippet}
</Story>
