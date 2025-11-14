<!--
@component
A checkbox input component with label, help text, error states, and indeterminate support.

@example
```svelte
<Checkbox
  id="terms"
  name="terms"
  label="Accept terms and conditions"
  value="accepted"
  bind:checked={isChecked}
  disabled
  required
  error="You must accept the terms"
  helpText="Please read our terms carefully"
  indeterminate
  onchange={(e) => console.log('changed')}
/>
```

See Storybook for additional examples and visual documentation.

@param {string} id - Unique identifier for the checkbox input
@param {string} name - Name attribute for form submission
@param {string} label - Label text displayed next to the checkbox
@param {string} [value='on'] - Value submitted when checkbox is checked
@param {boolean} [checked=false] - Checked state (bindable)
@param {boolean} [disabled=false] - Disable the checkbox
@param {boolean} [required=false] - Mark checkbox as required
@param {string} [error] - Error message to display
@param {string} [helpText] - Helper text displayed below the label
@param {boolean} [indeterminate=false] - Show indeterminate state (mixed/partial selection)
@param {(e: Event) => void} [onchange] - Change event handler

@accessibility
Uses native checkbox input with proper label association. Error messages use aria-describedby for screen reader announcement.
-->

<script lang="ts">
	interface Props {
		id: string;
		name: string;
		label: string;
		value?: string;
		checked?: boolean;
		disabled?: boolean;
		required?: boolean;
		error?: string;
		helpText?: string;
		indeterminate?: boolean;
		onchange?: (e: Event) => void;
	}

	let { 
		id, 
		name, 
		label, 
		value = 'on', 
		checked = $bindable(false), 
		disabled = false,
		required = false,
		error,
		helpText,
		indeterminate = false,
		onchange 
	}: Props = $props();

	let inputElement = $state<HTMLInputElement>();

	$effect(() => {
		if (inputElement) {
			inputElement.indeterminate = indeterminate;
		}
	});

	const handleChange = (e: Event) => {
		if (!(e.currentTarget instanceof HTMLInputElement)) return;
		checked = e.currentTarget.checked;
		onchange?.(e);
	};
</script>

<div class="checkbox-wrapper">
	<div class="checkbox-input-wrapper">
		<input
			bind:this={inputElement}
			{id}
			{name}
			type="checkbox"
			{value}
			{checked}
			{disabled}
			{required}
			onchange={handleChange}
			class:has-error={error}
			aria-describedby={helpText || error ? `${id}-description` : undefined}
			aria-invalid={error ? true : undefined}
			aria-required={required ? true : undefined}
		/>
	</div>
	<div class="checkbox-content">
		<label 
			for={id}
			class:disabled={disabled}
			class:has-error={error}
		>
			{label}
			{#if required}
				<span class="required-indicator" aria-label="required">*</span>
			{/if}
		</label>
		{#if error}
			<p id="{id}-description" class="error-message" role="alert" aria-live="polite">
				{error}
			</p>
		{:else if helpText}
			<p id="{id}-description" class="help-text">
				{helpText}
			</p>
		{/if}
	</div>
</div>

<style>
	.checkbox-wrapper {
		display: flex;
		align-items: flex-start;
		gap: var(--space-md);
	}

	.checkbox-input-wrapper {
		display: flex;
		align-items: center;
		height: 1.25rem;
	}

	input[type="checkbox"] {
		width: 1rem;
		height: 1rem;
		border-radius: var(--radius-sm);
		border: 1px solid var(--border-secondary);
		cursor: pointer;
		transition: all var(--transition-fast);
		accent-color: var(--color-primary);
	}

	input[type="checkbox"]:focus {
		outline: none;
		box-shadow: 0 0 0 3px oklch(60% 0.18 250 / 0.1);
	}

	input[type="checkbox"]:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	input[type="checkbox"].has-error {
		border-color: var(--color-error);
	}

	.checkbox-content {
		flex: 1;
	}

	label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
		cursor: pointer;
		user-select: none;
		display: inline;
	}

	label.disabled {
		color: var(--text-tertiary);
		cursor: not-allowed;
	}

	label.has-error {
		color: var(--color-error);
	}

	.required-indicator {
		color: var(--color-error);
		margin-left: var(--space-xs);
	}

	.error-message {
		margin-top: var(--space-xs);
		font-size: var(--font-size-sm);
		color: var(--color-error);
	}

	.help-text {
		margin-top: var(--space-xs);
		font-size: var(--font-size-xs);
		color: var(--text-tertiary);
	}
</style>
