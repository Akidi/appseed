<!--
@component
A flexible button component with multiple variants, sizes, states, and loading indicators.

@example
```svelte
<Button
  type="submit"
  variant="primary"
  outline
  size="md"
  disabled
  loading
  fullWidth
  onclick={(e) => console.log('clicked')}
  ariaLabel="Submit form"
  class="custom-class"
  style="margin-top: 1rem;"
>
  Submit
</Button>
```

See Storybook for additional examples and visual documentation.

@param {'button'|'submit'|'reset'} [type='button'] - HTML button type attribute
@param {'primary'|'secondary'|'success'|'warning'|'info'|'danger'|'ghost'|'link'} [variant='primary'] - Visual style variant
@param {boolean} [outline=false] - Use outline style instead of solid
@param {'sm'|'md'|'lg'} [size='md'] - Button size
@param {string} [style] - Inline CSS styles
@param {(e: MouseEvent) => void} [onclick] - Click event handler
@param {boolean} [disabled=false] - Disable the button
@param {boolean} [loading=false] - Show loading spinner and disable interaction
@param {boolean} [fullWidth=false] - Make button take full width of container
@param {string} [class] - Additional CSS classes
@param {string} [ariaLabel] - Accessible label for screen readers
@param {Snippet} children - Button content

@note Automatically disabled when parent form is submitting (via form context). Loading state shows spinner and prevents interaction.

@accessibility
Uses native button element with proper type attribute. Loading state includes aria-busy and sr-only text. Disabled state uses aria-disabled.
-->

<script lang="ts">
	import { getFormContext } from '$lib/contexts/form-context.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		type?: 'button' | 'submit' | 'reset';
		variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'link';
		outline?: boolean;
		size?: 'sm' | 'md' | 'lg';
		style?: string;
		onclick?: (e: MouseEvent) => void;
		disabled?: boolean;
		loading?: boolean;
		fullWidth?: boolean;
		class?: string;
		ariaLabel?: string;
		children: Snippet;
	}

	let { 
		type = 'button', 
		variant = 'primary', 
		outline = false,
		size = 'md',
		onclick, 
		disabled = false,
		loading = false,
		fullWidth = false,
		class: className = '',
		style,
		ariaLabel,
		children 
	}: Props = $props();
	const formContext = getFormContext();
	const isDisabled = $derived(disabled || (formContext?.isSubmitting ?? false) || loading);

	const handleClick = (e: MouseEvent) => {
		if (isDisabled) {
			e.preventDefault();
			return;
		}
		onclick?.(e);
	};
</script>

<button 
	{type} 
	onclick={handleClick}
	disabled={isDisabled}
	data-variant={variant}
	data-outline={outline}
	data-size={size}
	class={className}
	class:full-width={fullWidth}
	{style}
	aria-label={ariaLabel}
	aria-busy={loading ? true : undefined}
	aria-disabled={isDisabled ? true : undefined}
>
	{#if loading}
		<svg 
			class="spinner" 
			xmlns="http://www.w3.org/2000/svg" 
			fill="none" 
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<circle class="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="spinner-head" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
		<span class="sr-only">Loading...</span>
	{/if}
	{@render children()}
</button>

<style>
	button {
		display: inline-flex;
		align-items: center;
		justify-items: center;
		border-radius: var(--radius-md);
		font-weight: var(--font-weight-semibold);
		transition: all var(--transition-fast);
		border: 1px solid;
		cursor: pointer;
	}

	button:focus-visible {
		outline: none;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	button[data-size="sm"] {
		padding: 0.375rem 0.75rem;
		font-size: var(--font-size-xs);
	}

	button[data-size="md"] {
		padding: 0.5rem 1rem;
		font-size: var(--font-size-sm);
	}

	button[data-size="lg"] {
		padding: 0.75rem 1.5rem;
		font-size: var(--font-size-base);
	}

	button.full-width {
		width: 100%;
	}

	/* Solid variants */
	button[data-variant="primary"] {
		background-color: var(--color-primary);
		color: var(--text-inverse);
		border-color: transparent;
	}

	button[data-variant="primary"]:hover:not(:disabled) {
		background-color: var(--color-primary-700);
	}

	button[data-variant="primary"]:focus-visible {
		box-shadow: 0 0 0 3px oklch(60% 0.18 250 / 0.3);
	}

	button[data-variant="secondary"] {
		background-color: var(--bg-secondary);
		color: var(--text-primary);
		border-color: var(--border-primary);
	}

	button[data-variant="secondary"]:hover:not(:disabled) {
		background-color: var(--bg-tertiary);
	}

	button[data-variant="secondary"]:focus-visible {
		box-shadow: 0 0 0 3px oklch(60% 0.18 250 / 0.3);
	}

	button[data-variant="success"] {
		background-color: var(--color-success);
		color: var(--text-inverse);
		border-color: transparent;
	}

	button[data-variant="success"]:hover:not(:disabled) {
		background-color: oklch(58% 0.18 155);
	}

	button[data-variant="success"]:focus-visible {
		box-shadow: 0 0 0 3px oklch(65% 0.18 155 / 0.3);
	}

	button[data-variant="warning"] {
		background-color: var(--color-warning);
		color: var(--text-inverse);
		border-color: transparent;
	}

	button[data-variant="warning"]:hover:not(:disabled) {
		background-color: oklch(65% 0.15 70);
	}

	button[data-variant="warning"]:focus-visible {
		box-shadow: 0 0 0 3px oklch(70% 0.15 70 / 0.3);
	}

	button[data-variant="info"] {
		background-color: var(--color-info);
		color: var(--text-inverse);
		border-color: transparent;
	}

	button[data-variant="info"]:hover:not(:disabled) {
		background-color: var(--color-primary-700);
	}

	button[data-variant="info"]:focus-visible {
		box-shadow: 0 0 0 3px oklch(60% 0.18 250 / 0.3);
	}

	button[data-variant="danger"] {
		background-color: var(--color-error);
		color: var(--text-inverse);
		border-color: transparent;
	}

	button[data-variant="danger"]:hover:not(:disabled) {
		background-color: oklch(55% 0.22 25);
	}

	button[data-variant="danger"]:focus-visible {
		box-shadow: 0 0 0 3px oklch(60% 0.22 25 / 0.3);
	}

	button[data-variant="ghost"] {
		background-color: transparent;
		color: var(--text-primary);
		border-color: transparent;
	}

	button[data-variant="ghost"]:hover:not(:disabled) {
		background-color: var(--bg-secondary);
	}

	button[data-variant="ghost"]:focus-visible {
		box-shadow: 0 0 0 3px var(--border-secondary);
	}

	button[data-variant="link"] {
		background-color: transparent;
		color: var(--text-link);
		border-color: transparent;
		padding-left: 0;
		padding-right: 0;
	}

	button[data-variant="link"]:hover:not(:disabled) {
		color: var(--text-link-hover);
		text-decoration: underline;
		background-color: transparent;
	}

	button[data-variant="link"]:focus-visible {
		box-shadow: 0 0 0 3px oklch(60% 0.18 250 / 0.3);
	}

	/* Outline variants */
	button[data-outline="true"] {
		background-color: transparent;
		border-width: 2px;
	}

	button[data-outline="true"][data-variant="primary"] {
		color: var(--color-primary);
		border-color: var(--color-primary);
	}

	button[data-outline="true"][data-variant="primary"]:hover:not(:disabled) {
		background-color: var(--color-primary-50);
	}

	button[data-outline="true"][data-variant="secondary"] {
		color: var(--text-primary);
		border-color: var(--border-secondary);
	}

	button[data-outline="true"][data-variant="secondary"]:hover:not(:disabled) {
		background-color: var(--bg-secondary);
	}

	button[data-outline="true"][data-variant="success"] {
		color: var(--color-success);
		border-color: var(--color-success);
	}

	button[data-outline="true"][data-variant="success"]:hover:not(:disabled) {
		background-color: var(--color-success-light);
	}

	button[data-outline="true"][data-variant="warning"] {
		color: var(--color-warning);
		border-color: var(--color-warning);
	}

	button[data-outline="true"][data-variant="warning"]:hover:not(:disabled) {
		background-color: var(--color-warning-light);
	}

	button[data-outline="true"][data-variant="info"] {
		color: var(--color-info);
		border-color: var(--color-info);
	}

	button[data-outline="true"][data-variant="info"]:hover:not(:disabled) {
		background-color: var(--color-info-light);
	}

	button[data-outline="true"][data-variant="danger"] {
		color: var(--color-error);
		border-color: var(--color-error);
	}

	button[data-outline="true"][data-variant="danger"]:hover:not(:disabled) {
		background-color: var(--color-error-light);
	}

	button[data-outline="true"][data-variant="ghost"] {
		color: var(--text-primary);
		border-color: var(--border-secondary);
	}

	button[data-outline="true"][data-variant="ghost"]:hover:not(:disabled) {
		background-color: var(--bg-secondary);
	}

	/* Loading spinner */
	.spinner {
		width: 1rem;
		height: 1rem;
		margin-right: 0.5rem;
		margin-left: -0.25rem;
		animation: spin 1s linear infinite;
	}

	.spinner-track {
		opacity: 0.25;
	}

	.spinner-head {
		opacity: 0.75;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>