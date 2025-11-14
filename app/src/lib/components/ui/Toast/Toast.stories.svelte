<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { toasts } from '$lib/stores/toasts';
	import ToastContainer from './ToastContainer.svelte';
	import { Button } from '$lib/components/ui';

	const { Story } = defineMeta({
		title: 'UI/Toast',
		tags: ['autodocs']
	});
</script>

<Story name="All Toast Types">
	{#snippet template()}
		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
			<Button variant="primary" size="sm" onclick={() => toasts.add({ type: 'success', message: 'Success!', duration: 5000 })}>
				Success
			</Button>
			<Button variant="danger" size="sm" onclick={() => toasts.add({ type: 'error', message: 'Error occurred', duration: 5000 })}>
				Error
			</Button>
			<Button variant="secondary" size="sm" onclick={() => toasts.add({ type: 'warning', message: 'Warning message', duration: 5000 })}>
				Warning
			</Button>
			<Button variant="ghost" size="sm" onclick={() => toasts.add({ type: 'info', message: 'Information', duration: 5000 })}>
				Info
			</Button>
			<Button variant="secondary" size="sm" onclick={() => toasts.clear()}>
				Clear All
			</Button>
		</div>
		<ToastContainer />
	{/snippet}
</Story>

<Story name="Persistent Toast">
	{#snippet template()}
		<Button onclick={() => toasts.add({ type: 'info', message: 'This toast will stay until you close it.' })}>
			Show Persistent Toast
		</Button>
		<ToastContainer />
	{/snippet}
</Story>

<Story name="Long Message">
	{#snippet template()}
		<Button onclick={() => toasts.add({ type: 'success', message: 'This is a much longer toast message to demonstrate how the component handles multi-line text. It should wrap nicely and remain readable.', duration: 8000 })}>
			Show Long Message
		</Button>
		<ToastContainer />
	{/snippet}
</Story>