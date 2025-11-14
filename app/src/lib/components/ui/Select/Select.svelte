<!--
@component
A select dropdown component with label, validation, help text, and optional action buttons.

@example
```svelte
<Select
  id="country"
  name="country"
  label="Country"
  bind:value={selectedCountry}
  placeholder="Select a country"
  required
  disabled
  error="Please select a country"
  helpText="Choose your country of residence"
  actions={[
    { label: 'Add New', onclick: () => console.log('add') }
  ]}
  onchange={(e) => console.log('changed')}
  class="custom-class"
>
  <option value="">Choose...</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
</Select>
```

See Storybook for additional examples and visual documentation.

@param {string} id - Unique identifier for the select element
@param {string} name - Name attribute for form submission
@param {string} label - Label text displayed above the select
@param {string|null} [value] - Selected value (bindable)
@param {string} [placeholder] - Placeholder option text
@param {boolean} [required=false] - Mark select as required
@param {boolean} [disabled=false] - Disable the select
@param {string} [error] - Error message to display
@param {string} [helpText] - Helper text displayed below the select
@param {SelectAction[]} [actions] - Optional action buttons displayed below select
@param {(e: Event) => void} [onchange] - Change event handler
@param {string} [class] - Additional CSS classes
@param {Snippet} children - Option elements

@accessibility
Uses native select element with proper label association. Error messages use aria-describedby.
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Flex, Stack } from '$lib/components/layout';

	interface SelectAction {
		label: string;
		onClick: () => void;
	}

	interface Props {
		id: string;
		name: string;
		label: string;
		value?: string | null;
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		error?: string;
		helpText?: string;
		actions?: SelectAction[]; // Simple array of actions
		customActions?: Snippet; // Or custom snippet for full control
		children: Snippet;
		onchange?: (e: Event) => void;
	}

	let {
		id,
		name,
		label,
		value = $bindable(''),
		placeholder,
		required = false,
		disabled = false,
		error,
		helpText,
		actions = [],
		customActions,
		onchange,
		children
	}: Props = $props();

	const handleChange = (e: Event) => {
		if (!(e.currentTarget instanceof HTMLSelectElement)) return;
		const target = e.currentTarget;
		value = target.value || null;
		onchange?.(e);
	};
</script>

<Stack gap="xs">
	<Flex justify="between" align="center">
		<label for={id}>
			{label}
			{#if required}
				<span class="required-indicator" aria-label="required">*</span>
			{/if}
		</label>
		{#if customActions}
			{@render customActions()}
		{:else if actions.length > 0}
			<Flex gap="sm" align="center">
				{#each actions as action}
					<button type="button" class="link-button" onclick={action.onClick} {disabled}>
						{action.label}
					</button>
				{/each}
			</Flex>
		{/if}
	</Flex>

	<select
		{id}
		{name}
		{required}
		{disabled}
		value={value ?? ''}
		onchange={handleChange}
		class:has-error={error}
		aria-describedby={helpText || error ? `${id}-description` : undefined}
		aria-invalid={error ? true : undefined}
		aria-required={required ? true : undefined}
	>
		{#if placeholder}
			<option value="" disabled selected={!value}>
				{placeholder}
			</option>
		{/if}
		{@render children()}
	</select>

	{#if error}
		<p id="{id}-description" class="error-message" role="alert" aria-live="polite">
			{error}
		</p>
	{:else if helpText}
		<p id="{id}-description" class="help-text">
			{helpText}
		</p>
	{/if}
</Stack>

<style>
	label {
		display: block;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
	}

	.required-indicator {
		color: var(--color-error);
		margin-left: var(--space-xs);
	}

	select {
		display: block;
		width: 100%;
		padding: var(--space-sm) 2.5rem var(--space-sm) var(--space-md);
		border: 1px solid var(--border-primary);
		border-radius: var(--radius-md);
		background-color: var(--bg-primary);
		color: var(--text-primary);
		font-family: inherit;
		font-size: var(--font-size-base);
		transition:
			border-color var(--transition-fast),
			box-shadow var(--transition-fast);
		appearance: none;
		background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23666%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E');
		background-repeat: no-repeat;
		background-position: right 0.5rem center;
		background-size: 1.25rem;
		cursor: pointer;
	}

	select:focus {
		outline: none;
		border-color: var(--border-focus);
		box-shadow: 0 0 0 3px oklch(60% 0.18 250 / 0.1);
	}

	select:disabled {
		background-color: var(--bg-secondary);
		cursor: not-allowed;
		opacity: 0.6;
	}

	select.has-error {
		border-color: var(--color-error);
	}

	select.has-error:focus {
		border-color: var(--color-error);
		box-shadow: 0 0 0 3px oklch(60% 0.22 25 / 0.1);
	}

	.error-message {
		font-size: var(--font-size-sm);
		color: var(--color-error);
		margin: 0;
	}

	.help-text {
		font-size: var(--font-size-xs);
		color: var(--text-tertiary);
		margin: 0;
	}

		.link-button {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-link);
		text-decoration: none;
		cursor: pointer;
		transition: color var(--transition-fast);
	}

	.link-button:hover {
		color: var(--text-link-hover);
		text-decoration: underline;
	}

	.link-button:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 2px;
		border-radius: var(--radius-sm);
	}
</style>
