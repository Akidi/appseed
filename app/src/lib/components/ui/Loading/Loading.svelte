<!--
@component
A loading spinner component with multiple sizes, variants, and optional text display.

@example
```svelte
<Loading
  size="md"
  variant="primary"
  text="Loading data..."
  centered
  fullscreen
  class="custom-class"
/>
```

See Storybook for additional examples and visual documentation.

@param {'sm'|'md'|'lg'|'xl'} [size='md'] - Spinner size
@param {'primary'|'secondary'|'white'} [variant='primary'] - Color variant
@param {string} [text] - Optional loading text displayed below spinner
@param {boolean} [centered=false] - Center the spinner in its container
@param {boolean} [fullscreen=false] - Make spinner fullscreen with overlay
@param {string} [class] - Additional CSS classes

@accessibility
Uses role="status" and aria-live="polite" for screen reader announcements. Includes sr-only loading text.
-->

<script lang="ts">
	interface Props {
		size?: 'sm' | 'md' | 'lg' | 'xl';
		variant?: 'primary' | 'secondary' | 'white';
		text?: string;
		centered?: boolean;
		fullscreen?: boolean;
		class?: string;
	}

	let {
		size = 'md',
		variant = 'primary',
		text,
		centered = false,
		fullscreen = false,
		class: className = ''
	}: Props = $props();

</script>

{#if fullscreen}
	<div class="loading-fullscreen">
		<div class="loading-fullscreen-content">
			<svg
				class="loading-spinner loading-spinner-{size} loading-spinner-{variant}"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				role="status"
				aria-label="Loading"
			>
				<circle class="loading-spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path
					class="loading-spinner-fill"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
			{#if text}
				<p class="loading-text">{text}</p>
			{/if}
		</div>
	</div>
{:else}
	<div
		class="loading {className}"
		class:centered={centered}
		role="status"
		aria-label="Loading"
	>
		<svg
			class="loading-spinner loading-spinner-{size} loading-spinner-{variant}"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle class="loading-spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path
				class="loading-spinner-fill"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			></path>
		</svg>
		{#if text}
			<span class="loading-text">{text}</span>
		{/if}
	</div>
{/if}

<style>
	.loading-fullscreen {
		position: fixed;
		inset: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(4px);
	}

	.loading-fullscreen-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-md);
	}

	.loading {
		display: flex;
		align-items: center;
		gap: var(--space-md);
	}

	.loading.centered {
		justify-content: center;
	}

	.loading-spinner {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.loading-spinner-sm {
		width: 1rem;
		height: 1rem;
	}

	.loading-spinner-md {
		width: 2rem;
		height: 2rem;
	}

	.loading-spinner-lg {
		width: 3rem;
		height: 3rem;
	}

	.loading-spinner-xl {
		width: 4rem;
		height: 4rem;
	}

	.loading-spinner-primary {
		color: var(--color-primary);
	}

	.loading-spinner-secondary {
		color: var(--text-secondary);
	}

	.loading-spinner-white {
		color: white;
	}

	.loading-spinner-track {
		opacity: 0.25;
	}

	.loading-spinner-fill {
		opacity: 0.75;
	}

	.loading-text {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
	}
</style>
