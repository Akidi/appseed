<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Loading from './Loading.svelte';
	import {Button} from '$lib/components/ui';

	/**
	 * Loading component for showing loading states.
	 * Supports different sizes, variants, and fullscreen mode.
	 */
	const { Story } = defineMeta({
		component: Loading,
		title: 'UI/Loading',
		tags: ['autodocs'],
		args: {
			size: 'md',
			variant: 'primary',
			centered: false,
			fullscreen: false
		},
		argTypes: {
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl']
			},
			variant: {
				control: 'select',
				options: ['primary', 'secondary', 'white']
			},
			centered: { control: 'boolean' },
			fullscreen: { control: 'boolean' }
		}
	});
</script>

<script>
	let showFullscreen = $state(false);
</script>

<Story name="Small" args={{ size: 'sm' }} />

<Story name="Medium" args={{ size: 'md' }} />

<Story name="Large" args={{ size: 'lg' }} />

<Story name="Extra Large" args={{ size: 'xl' }} />

<Story name="With Text" args={{ size: 'md', text: 'Loading...' }} />

<Story name="Secondary Variant" args={{ size: 'md', variant: 'secondary' }} />

<Story name="Centered" args={{ size: 'lg', text: 'Loading...', centered: true }} />

<Story name="All Sizes">
	{#snippet template()}
		<div style="display: flex; gap: 2rem; align-items: center;">
			<Loading size="sm" />
			<Loading size="md" />
			<Loading size="lg" />
			<Loading size="xl" />
		</div>
	{/snippet}
</Story>

<Story name="All Variants">
	{#snippet template()}
		<div style="display: flex; gap: 2rem; align-items: center;">
			<Loading size="lg" variant="primary" />
			<Loading size="lg" variant="secondary" />
			<div style="background: #1f2937; padding: 2rem; border-radius: 0.5rem;">
				<Loading size="lg" variant="white" />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="With Different Text">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 1.5rem;">
			<Loading size="md" text="Loading..." />
			<Loading size="md" text="Please wait..." />
			<Loading size="md" text="Processing your request..." />
		</div>
	{/snippet}
</Story>

<Story name="In Button">
	{#snippet template()}
		<div style="display: flex; gap: 1rem;">
			<Button disabled>
				<Loading size="sm" variant="white" />
				<span style="margin-left: 0.5rem;">Loading...</span>
			</Button>
			<Button variant="secondary" disabled>
				<Loading size="sm" variant="primary" />
				<span style="margin-left: 0.5rem;">Processing...</span>
			</Button>
		</div>
	{/snippet}
</Story>

<Story name="Fullscreen Demo">
	{#snippet template()}
		<div>
			<Button onclick={() => showFullscreen = true}>
				Show Fullscreen Loading
			</Button>
			{#if showFullscreen}
				<Loading fullscreen size="xl" text="Loading your data..." />
				<Button 
					onclick={() => showFullscreen = false}
					style="position: fixed; bottom: 2rem; right: 2rem; z-index: 60;"
				>
					Hide (Demo Only)
				</Button>
			{/if}
		</div>
	{/snippet}
</Story>

<Story name="Use Cases">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 2rem;">
			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">Inline Loading</h3>
				<div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
					<Loading size="sm" text="Fetching data..." />
				</div>
			</div>

			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">Card Loading</h3>
				<div style="padding: 2rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
					<Loading size="lg" text="Loading content..." centered />
				</div>
			</div>

			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">Table Loading</h3>
				<div style="padding: 3rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; text-align: center;">
					<Loading size="xl" text="Loading table data..." centered />
				</div>
			</div>
		</div>
	{/snippet}
</Story>