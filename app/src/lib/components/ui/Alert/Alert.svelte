<!--
@component
An alert component for displaying contextual feedback messages with support for different severity levels.

@example
```svelte
<Alert
  type="success"
  title="Success!"
  icon
  dismissible
  onDismiss={() => console.log('dismissed')}
  class="custom-class"
>
  Your changes have been saved successfully.
</Alert>
```

See Storybook for additional examples and visual documentation.

@param {'info'|'success'|'warning'|'error'} type - The type of alert determining color and semantic meaning
@param {string} [title] - Optional title displayed above the message content
@param {boolean} [icon=true] - Whether to display an icon matching the alert type
@param {boolean} [dismissible=false] - Whether to show a dismiss button
@param {() => void} [onDismiss] - Callback function triggered when dismiss button is clicked
@param {string} [class] - Additional CSS classes to apply to the alert
@param {Snippet} children - The alert message content

@accessibility
Uses semantic ARIA roles (alert for errors/warnings, status for info/success). Includes aria-live regions with assertive priority for errors and polite for others. Dismiss button includes descriptive aria-label.
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Flex, Stack } from '$lib/components/layout';

	interface Props {
		type: 'info' | 'success' | 'warning' | 'error';
		title?: string;
		icon?: boolean;
		dismissible?: boolean;
		onDismiss?: () => void;
		class?: string;
		children: Snippet;
	}

	let {
		type,
		title,
		icon = true,
		dismissible = false,
		onDismiss,
		class: className = '',
		children
	}: Props = $props();

	const roleMap = {
		error: 'alert',
		warning: 'alert',
		success: 'status',
		info: 'status'
	};

	const icons = {
		success: {
			path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
			label: 'Success'
		},
		error: {
			path: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
			label: 'Error'
		},
		warning: {
			path: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
			label: 'Warning'
		},
		info: {
			path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
			label: 'Info'
		}
	};

	const handleDismiss = () => {
		onDismiss?.();
	};
</script>

<div
	role={roleMap[type]}
	data-type={type}
	aria-live={type === 'error' ? 'assertive' : 'polite'}
	aria-atomic="true"
	class="alert {className}"
>
	<Flex gap="md" align="start">
		{#if icon}
			<div class="alert-icon" data-icon aria-hidden="true">
				<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d={icons[type].path}
					/>
				</svg>
			</div>
		{/if}

		<div class="alert-body">
			{#if title}
				<Stack gap="xs">
					<h3 class="alert-title">{title}</h3>
					<div class="alert-message">
						{@render children()}
					</div>
				</Stack>
			{:else}
				<div class="alert-message">
					{@render children()}
				</div>
			{/if}
		</div>

		{#if dismissible && onDismiss}
			<button
				type="button"
				class="alert-dismiss"
				onclick={handleDismiss}
				aria-label="Dismiss {icons[type].label.toLowerCase()} alert"
			>
				<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		{/if}
	</Flex>
</div>

<style>
	.alert {
		border-radius: var(--radius-lg);
		border: 1px solid;
		padding: var(--space-md);
	}

	.alert[data-type='info'] {
		background-color: var(--color-info-light);
		border-color: var(--color-info);
		color: var(--color-info);
	}

	.alert[data-type='success'] {
		background-color: var(--color-success-light);
		border-color: var(--color-success);
		color: var(--color-success);
	}

	.alert[data-type='warning'] {
		background-color: var(--color-warning-light);
		border-color: var(--color-warning);
		color: var(--color-warning);
	}

	.alert[data-type='error'] {
		background-color: var(--color-error-light);
		border-color: var(--color-error);
		color: var(--color-error);
	}

	.alert-icon {
		flex-shrink: 0;
	}

	.alert-icon svg {
		width: 1.25rem;
		height: 1.25rem;
	}

	.alert-body {
		flex: 1;
		min-width: 0;
	}

	.alert-title {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		margin: 0;
	}

	.alert-message {
		font-size: var(--font-size-sm);
		color: var(--text-primary);
	}

	.alert-dismiss {
		flex-shrink: 0;
		border-radius: var(--radius-md);
		padding: var(--space-xs);
		transition: background-color var(--transition-fast);
		background-color: transparent;
		border: none;
		cursor: pointer;
		color: inherit;
	}

	.alert-dismiss:hover {
		background-color: oklch(from var(--color-info) l c h / 0.15);
	}

	.alert[data-type='success'] .alert-dismiss:hover {
		background-color: oklch(from var(--color-success) l c h / 0.15);
	}

	.alert[data-type='warning'] .alert-dismiss:hover {
		background-color: oklch(from var(--color-warning) l c h / 0.15);
	}

	.alert[data-type='error'] .alert-dismiss:hover {
		background-color: oklch(from var(--color-error) l c h / 0.15);
	}

	.alert-dismiss:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}

	.alert-dismiss svg {
		width: 1.25rem;
		height: 1.25rem;
	}
</style>