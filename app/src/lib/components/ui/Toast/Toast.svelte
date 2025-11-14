<!--
@component
A toast notification component with auto-dismiss, animations, and multiple types.

@example
```svelte
<Toast
  id="toast-1"
  type="success"
  message="Changes saved successfully!"
  duration={5000}
  onClose={(id) => console.log('Toast closed:', id)}
/>
```

See Storybook for additional examples and visual documentation.

@param {string} id - Unique identifier for the toast
@param {ToastType} type - Toast type: 'success', 'error', 'warning', 'info'
@param {string} message - Toast message text
@param {number} [duration=5000] - Auto-dismiss duration in milliseconds (0 for no auto-dismiss)
@param {(id: string) => void} onClose - Callback function when toast is closed

@note Toast appears with fly-in animation and automatically dismisses after duration. Click to dismiss manually.

@accessibility
Uses role="alert" for screen reader announcements. Includes dismiss button with aria-label.
-->

<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import type { ToastType } from '$lib/stores/toasts';

	interface Props {
		id: string;
		type: ToastType;
		message: string;
		duration?: number;
		onClose: (id: string) => void;
	}

	let { id, type, message, duration, onClose }: Props = $props();

	let progress = $state(100);
	let isPaused = $state(false);
	let animationFrame: number;
	let startTime = $state(0);
	let totalElapsed = $state(0);

	onMount(() => {
		if (duration) {
			startTime = Date.now();
			
			const animate = () => {
				if (!isPaused) {
					const now = Date.now();
					const elapsed = now - startTime;
					const currentElapsed = totalElapsed + elapsed;
					const remaining = Math.max(0, 100 - (currentElapsed / duration) * 100);
					progress = remaining;
					
					if (remaining > 0) {
						animationFrame = requestAnimationFrame(animate);
					} else {
						onClose(id);
					}
				} else {
					// Keep animating even when paused to maintain smooth updates
					animationFrame = requestAnimationFrame(animate);
				}
			};
			
			animationFrame = requestAnimationFrame(animate);
			
			return () => {
				if (animationFrame) {
					cancelAnimationFrame(animationFrame);
				}
			};
		}
	});

	const handleMouseEnter = () => {
		if (duration && !isPaused) {
			isPaused = true;
			// Accumulate the elapsed time before pausing
			const now = Date.now();
			totalElapsed += (now - startTime);
		}
	};

	const handleMouseLeave = () => {
		if (duration && isPaused) {
			isPaused = false;
			// Reset startTime to now so we start measuring from this point
			startTime = Date.now();
		}
	};

	const icons = {
		success: {
			path: 'M5 13l4 4L19 7',
			label: 'Success'
		},
		error: {
			path: 'M6 18L18 6M6 6l12 12',
			label: 'Error'
		},
		warning: {
			path: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
			label: 'Warning'
		},
		info: {
			path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
			label: 'Information'
		}
	};

</script>

<div
	role="status"
	aria-live="polite"
	aria-atomic="true"
	transition:fly={{ x: 300, duration: 300 }}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	class="toast toast-{type}"
>
	{#if duration}
		<div
			class="toast-progress toast-progress-{type}"
			style="width: {progress}%; transition: width {isPaused ? '0ms' : '100ms'}"
			role="progressbar"
			aria-valuenow={Math.round(progress)}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-label="Time remaining"
		></div>
	{/if}
	
	<div class="toast-icon toast-icon-{type}" aria-hidden="true">
		<svg class="toast-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icons[type].path} />
		</svg>
	</div>
	
	<div class="toast-message">
		<p class="toast-text">{message}</p>
	</div>
	
	<button
		type="button"
		onclick={() => onClose(id)}
		class="toast-close"
		aria-label="Close {icons[type].label.toLowerCase()} notification"
	>
		<svg class="toast-close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
		</svg>
	</button>
</div>

<style>
	.toast {
		pointer-events: auto;
		position: relative;
		display: flex;
		align-items: flex-start;
		gap: var(--space-md);
		min-width: 0;
		max-width: 24rem;
		padding: var(--space-lg);
		border-radius: var(--radius-lg);
		border: 2px solid;
		box-shadow: var(--shadow-lg);
		transition: transform var(--transition-base);
	}

	.toast:hover {
		transform: scale(1.05);
	}

	.toast-success {
		background-color: var(--color-success-light);
		border-color: var(--color-success);
		color: var(--color-success-dark);
	}

	.toast-error {
		background-color: var(--color-error-light);
		border-color: var(--color-error);
		color: var(--color-error-dark);
	}

	.toast-warning {
		background-color: var(--color-warning-light);
		border-color: var(--color-warning);
		color: var(--color-warning-dark);
	}

	.toast-info {
		background-color: var(--color-info-light);
		border-color: var(--color-info);
		color: var(--color-info-dark);
	}

	.toast-progress {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 4px;
		transition-timing-function: linear;
	}

	.toast-progress-success {
		background-color: var(--color-success);
	}

	.toast-progress-error {
		background-color: var(--color-error);
	}

	.toast-progress-warning {
		background-color: var(--color-warning);
	}

	.toast-progress-info {
		background-color: var(--color-info);
	}

	.toast-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 2rem;
		height: 2rem;
		border-radius: var(--radius-full);
	}

	.toast-icon-success {
		background-color: var(--color-success);
		color: white;
	}

	.toast-icon-error {
		background-color: var(--color-error);
		color: white;
	}

	.toast-icon-warning {
		background-color: var(--color-warning);
		color: white;
	}

	.toast-icon-info {
		background-color: var(--color-info);
		color: white;
	}

	.toast-icon-svg {
		width: 1.25rem;
		height: 1.25rem;
	}

	.toast-message {
		flex: 1;
		min-width: 0;
		padding-top: 0.125rem;
	}

	.toast-text {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		line-height: 1.375;
		word-break: break-word;
		margin: 0;
	}

	.toast-close {
		flex-shrink: 0;
		padding: var(--space-xs);
		border: none;
		background: transparent;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: background-color var(--transition-fast);
	}

	.toast-close:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.toast-close:focus-visible {
		outline: none;
		box-shadow: var(--focus-ring);
	}

	.toast-close-icon {
		width: 1.25rem;
		height: 1.25rem;
	}
</style>
