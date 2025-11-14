<script lang="ts" context="module">
	import type { Meta } from '@storybook/svelte';
	import Avatar from './Avatar.svelte';

	export const meta: Meta<typeof Avatar> = {
		title: 'UI/Avatar',
		component: Avatar,
		tags: ['autodocs'],
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
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import { Cluster } from '$lib/components/layout';
</script>

<Story name="Default">
	<Avatar fallback="JD" />
</Story>

<Story name="With Image">
	<Avatar src="https://i.pravatar.cc/150?img=1" alt="User" />
</Story>

<Story name="Sizes">
	<Cluster gap="md">
		<Avatar fallback="XS" size="xs" />
		<Avatar fallback="SM" size="sm" />
		<Avatar fallback="MD" size="md" />
		<Avatar fallback="LG" size="lg" />
		<Avatar fallback="XL" size="xl" />
	</Cluster>
</Story>

<Story name="Shapes">
	<Cluster gap="md">
		<Avatar fallback="AB" shape="circle" />
		<Avatar fallback="CD" shape="rounded" />
		<Avatar fallback="EF" shape="square" />
	</Cluster>
</Story>

<Story name="With Status">
	<Cluster gap="lg">
		<Avatar fallback="ON" status="online" />
		<Avatar fallback="OF" status="offline" />
		<Avatar fallback="BS" status="busy" />
		<Avatar fallback="AW" status="away" />
	</Cluster>
</Story>

<Story name="Fallback Colors">
	<Cluster gap="md">
		<Avatar fallback="AB" />
		<Avatar fallback="CD" />
		<Avatar fallback="EF" />
		<Avatar fallback="GH" />
		<Avatar fallback="IJ" />
		<Avatar fallback="KL" />
	</Cluster>
</Story>
