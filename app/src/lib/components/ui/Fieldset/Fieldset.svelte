<!--
@component
A semantic fieldset component for grouping related form controls with legend, description, validation, and help text.

@example
```svelte
<Fieldset
  legend="Personal Information"
  description="Please provide your contact details"
  error="Email is required"
  helpText="We'll never share your information"
  required={true}
  disabled={false}
  class="custom-fieldset"
>
  <TextInput id="name" label="Name" />
  <TextInput id="email" label="Email" type="email" />
</Fieldset>
```

See Storybook for additional examples and visual documentation.

@param {string} legend - The fieldset legend text displayed as a heading
@param {string} [description] - Optional description text displayed below the legend
@param {string} [error] - Error message to display (takes precedence over helpText)
@param {string} [helpText] - Help text displayed when no error is present
@param {boolean} [required=false] - Shows required indicator (*) next to legend
@param {boolean} [disabled=false] - Disables all form controls within the fieldset
@param {string} [class] - Additional CSS classes to apply to the fieldset element
@param {Snippet} children - Form controls to group within the fieldset

@note Automatically generates unique IDs for aria-describedby linking. Error messages have role="alert" with aria-live="polite".

@accessibility
Uses semantic fieldset/legend elements. Error and help text are properly linked via aria-describedby for screen reader context.
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Stack } from '$lib/components/layout';

	interface Props {
		legend: string;
		description?: string;
		error?: string;
		helpText?: string;
		required?: boolean;
		disabled?: boolean;
		class?: string;
		children: Snippet;
	}

	let {
		legend,
		description,
		error,
		helpText,
		required = false,
		disabled = false,
		class: className = '',
		children
	}: Props = $props();

	// Generate unique ID for aria-describedby
	const fieldsetId = `fieldset-${Math.random().toString(36).substr(2, 9)}`;
	const hasDescription = description || helpText || error;
</script>

<fieldset 
	class="fieldset {className}"
	{disabled}
	aria-describedby={hasDescription ? `${fieldsetId}-description` : undefined}
>
	<Stack gap="md">
		<div class="fieldset-header">
			<legend class="fieldset-legend">
				{legend}
				{#if required}
					<span class="required-indicator" aria-label="required">*</span>
				{/if}
			</legend>
			
			{#if description}
				<p class="fieldset-description">
					{description}
				</p>
			{/if}
		</div>

		<div class="fieldset-content">
			{@render children()}
		</div>

		{#if error || helpText}
			<div id="{fieldsetId}-description">
				{#if error}
					<p class="fieldset-error" role="alert" aria-live="polite">
						{error}
					</p>
				{:else if helpText}
					<p class="fieldset-help">
						{helpText}
					</p>
				{/if}
			</div>
		{/if}
	</Stack>
</fieldset>

<style>
	.fieldset {
		border: none;
		padding: 0;
		margin: 0;
		min-width: 0;
	}

	.fieldset:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.fieldset-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.fieldset-legend {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		color: var(--text-primary);
		line-height: 1.5;
		padding: 0;
	}

	.fieldset:disabled .fieldset-legend {
		color: var(--text-disabled);
	}

	.required-indicator {
		color: var(--color-error);
		margin-left: var(--space-xs);
	}

	.fieldset-description {
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		margin: 0;
		line-height: 1.5;
	}

	.fieldset:disabled .fieldset-description {
		color: var(--text-disabled);
	}

	.fieldset-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.fieldset-error {
		font-size: var(--font-size-sm);
		color: var(--color-error);
		margin: 0;
		line-height: 1.5;
	}

	.fieldset-help {
		font-size: var(--font-size-sm);
		color: var(--text-tertiary);
		margin: 0;
		line-height: 1.5;
	}

	.fieldset:disabled .fieldset-help {
		color: var(--text-disabled);
	}
</style>