<!--
@component
A fixed-position container that renders toast notifications from the toasts store.

@example
```svelte
## Add to your root layout
<ToastContainer />

## Trigger toasts from anywhere in your app
<script>
  import { toasts } from '$lib/stores/toasts';

  toasts.add({
    type: 'success',
    message: 'Operation completed!',
    duration: 5000
  });
</script>
```

See Storybook for additional examples and visual documentation.

@note This component has no props. It automatically subscribes to the toasts store and renders all active toasts. Position is fixed at bottom-right of viewport. Place once in your root layout.

@accessibility
Uses role="region" with aria-label="Notifications" and aria-live="polite" for screen reader announcements without interrupting user workflow.
-->

<script lang="ts">
	import { toasts } from '$lib/stores/toasts';
	import Toast from './Toast.svelte';
</script>

<div
	aria-live="polite"
	aria-atomic="false"
	class="toast-container"
	role="region"
	aria-label="Notifications"
>
	{#each $toasts.toasts as toast (toast.id)}
		<Toast
			id={toast.id}
			type={toast.type}
			message={toast.message}
			duration={toast.duration}
			onClose={toasts.remove}
		/>
	{/each}
</div>

<style>
	.toast-container {
		pointer-events: none;
		position: fixed;
		bottom: 0;
		right: 0;
		z-index: 50;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: var(--space-md);
		padding: var(--space-lg);
	}

	@media (min-width: 640px) {
		.toast-container {
			padding: var(--space-2xl);
		}
	}
</style>
