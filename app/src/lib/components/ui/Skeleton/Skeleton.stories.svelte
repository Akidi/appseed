<script lang="ts" context="module">
	import type { Meta } from '@storybook/svelte';
	import Skeleton from './Skeleton.svelte';

	export const meta: Meta<typeof Skeleton> = {
		title: 'UI/Skeleton',
		component: Skeleton,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: 'select',
				options: ['text', 'circular', 'rectangular']
			}
		}
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import { Stack, Cluster } from '$lib/components/layout';
</script>

<Story name="Text">
	<Skeleton variant="text" />
</Story>

<Story name="Circular">
	<Skeleton variant="circular" width="3rem" height="3rem" />
</Story>

<Story name="Rectangular">
	<Skeleton variant="rectangular" width="100%" height="200px" />
</Story>

<Story name="Card Loading">
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
</Story>

<Story name="List Loading">
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
</Story>

<Story name="Custom Sizes">
	<Stack gap="lg">
		<Skeleton variant="text" width="200px" />
		<Skeleton variant="rectangular" width="100px" height="100px" />
		<Skeleton variant="circular" width="60px" height="60px" />
	</Stack>
</Story>
