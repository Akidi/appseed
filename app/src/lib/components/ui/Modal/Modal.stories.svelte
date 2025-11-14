<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Modal from './Modal.svelte';
	import {Button, TextInput} from '$lib/components/ui';

	const onCloseFn = fn().mockName('onClose');

	/**
	 * Modal component for displaying content in an overlay.
	 * Supports various sizes, custom footers, and accessibility features.
	 */
	const { Story } = defineMeta({
		component: Modal,
		title: 'UI/Modal',
		tags: ['autodocs'],
		args: {
			onClose: onCloseFn,
			title: 'Modal Title',
			isOpen: false,
			closeOnEscape: true,
			closeOnBackdrop: true,
			showCloseButton: true,
			maxWidth: 'lg'
		},
		argTypes: {
			maxWidth: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl', '2xl', 'full']
			},
			closeOnEscape: { control: 'boolean' },
			closeOnBackdrop: { control: 'boolean' },
			showCloseButton: { control: 'boolean' },
			isOpen: { control: 'boolean' }
		}
	});
</script>

<script lang="ts">
	let isOpen1 = $state(false);
	let isOpen2 = $state(false);
	let isOpen3 = $state(false);
	let isOpen4 = $state(false);
	let isOpen5 = $state(false);
</script>

<Story name="Basic">
	{#snippet template()}
		<Button onclick={() => isOpen1 = true}>Open Modal</Button>
		<Modal
			isOpen={isOpen1}
			onClose={() => isOpen1 = false}
			title="Basic Modal"
		>
			<p>This is a basic modal with some content.</p>
		</Modal>
	{/snippet}
</Story>

<Story name="With Description">
	{#snippet template()}
		<Button onclick={() => isOpen2 = true}>Open Modal</Button>
		<Modal
			isOpen={isOpen2}
			onClose={() => isOpen2 = false}
			title="Confirm Action"
			description="Are you sure you want to proceed?"
		>
			<p>This action cannot be undone. Please confirm that you want to continue.</p>
		</Modal>
	{/snippet}
</Story>

<Story name="With Footer">
	{#snippet template()}
		<Button onclick={() => isOpen3 = true}>Open Delete Modal</Button>
		<Modal
			isOpen={isOpen3}
			onClose={() => isOpen3 = false}
			title="Delete Product"
			description="This action cannot be undone."
		>
			<p>Are you sure you want to delete this product? All associated data will be permanently removed.</p>
			
			{#snippet footer()}
				<Button variant="secondary" onclick={() => isOpen3 = false}>
					Cancel
				</Button>
				<Button variant="danger" onclick={() => isOpen3 = false}>
					Delete
				</Button>
			{/snippet}
		</Modal>
	{/snippet}
</Story>

<Story name="Form Modal">
	{#snippet template()}
		<Button onclick={() => isOpen4 = true}>Add Product</Button>
		<Modal
			isOpen={isOpen4}
			onClose={() => isOpen4 = false}
			title="Add New Product"
			description="Fill in the details below"
			maxWidth="xl"
		>
			<form onsubmit={(e) => {
				e.preventDefault();
				isOpen4 = false;
			}}>
				<div style="display: flex; flex-direction: column; gap: 1rem;">
					<TextInput
						id="product-name"
						name="productName"
						label="Product Name"
						required
					/>
					<TextInput
						id="sku"
						name="sku"
						label="SKU"
					/>
				</div>
			</form>
			
			{#snippet footer()}
				<Button variant="secondary" onclick={() => isOpen4 = false}>
					Cancel
				</Button>
				<Button variant="primary" onclick={() => isOpen4 = false}>
					Save Product
				</Button>
			{/snippet}
		</Modal>
	{/snippet}
</Story>

<Story name="Non-dismissible">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<Button onclick={() => isOpen5 = true}>Show Processing Modal</Button>
			<Modal
				isOpen={isOpen5}
				onClose={() => {}}
				title="Processing"
				closeOnEscape={false}
				closeOnBackdrop={false}
				showCloseButton={false}
				maxWidth="sm"
			>
				<div style="display: flex; align-items: center; gap: 1rem;">
					<svg 
						class="animate-spin h-5 w-5" 
						viewBox="0 0 24 24" 
						fill="none" 
						stroke="currentColor"
					>
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
					<p>Please wait while we process your request...</p>
				</div>
			</Modal>
			{#if isOpen5}
				<Button size="sm" variant="secondary" onclick={() => isOpen5 = false}>
					Manually Close (for demo)
				</Button>
			{/if}
		</div>
	{/snippet}
</Story>

<!-- Different modal sizes -->
<Story name="Small Modal">
	{#snippet template()}
		<Button onclick={() => isOpen1 = true}>Small Modal</Button>
		<Modal
			isOpen={isOpen1}
			onClose={() => isOpen1 = false}
			title="Small Modal"
			maxWidth="sm"
		>
			<p>This is a small modal with limited width.</p>
		</Modal>
	{/snippet}
</Story>

<Story name="Large Modal">
	{#snippet template()}
		<Button onclick={() => isOpen1 = true}>Large Modal</Button>
		<Modal
			isOpen={isOpen1}
			onClose={() => isOpen1 = false}
			title="Large Modal"
			maxWidth="2xl"
		>
			<p>This is a large modal with more width for extensive content.</p>
			<p>You can add more content here and it will have plenty of space.</p>
		</Modal>
	{/snippet}
</Story>

<!-- Modal without close button -->
<Story name="No Close Button">
	{#snippet template()}
		<Button onclick={() => isOpen1 = true}>Open Modal</Button>
		<Modal
			isOpen={isOpen1}
			onClose={() => isOpen1 = false}
			title="Modal without Close Button"
			showCloseButton={false}
		>
			<p>This modal doesn't have a close button in the header.</p>
			<p>You can close it by clicking outside or pressing Escape.</p>
		</Modal>
	{/snippet}
</Story>

<!-- Modal that doesn't close on backdrop click -->
<Story name="No Backdrop Close">
	{#snippet template()}
		<Button onclick={() => isOpen1 = true}>Open Modal</Button>
		<Modal
			isOpen={isOpen1}
			onClose={() => isOpen1 = false}
			title="No Backdrop Close"
			closeOnBackdrop={false}
		>
			<p>Clicking outside this modal won't close it.</p>
			<p>Use the close button or press Escape.</p>
		</Modal>
	{/snippet}
</Story>

<!-- Modal that doesn't close on Escape -->
<Story name="No Escape Close">
	{#snippet template()}
		<Button onclick={() => isOpen1 = true}>Open Modal</Button>
		<Modal
			isOpen={isOpen1}
			onClose={() => isOpen1 = false}
			title="No Escape Close"
			closeOnEscape={false}
		>
			<p>Pressing Escape won't close this modal.</p>
			<p>Use the close button or click outside.</p>
		</Modal>
	{/snippet}
</Story>