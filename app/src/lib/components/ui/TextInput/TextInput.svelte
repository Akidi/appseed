<!--
	@component
	A flexible text input component with validation, error handling, and optional success indicators.

	@example
	```svelte
	<TextInput
		id="email"
		name="email"
		label="Email Address"
		type="email"
		required
		bind:value={email}
	/>
	```

	@example With pattern validation and debounce
	```svelte
	<TextInput
		id="upc"
		name="upc"
		label="UPC Code"
		pattern={"\\d{12}"}
		patternError="UPC must be exactly 12 digits"
		showValidIndicator
		bind:value={upc}
	/>
	```

	@note Pattern Syntax in Svelte
	When using regex patterns with quantifiers like {12}, you must use expression syntax with double-escaped backslashes:
	- ✅ Correct: pattern={"\\d{12}"} or pattern={"[0-9]{12}"}
	- ❌ Wrong: pattern="\d{12}" converts to pattern="d12" (curly braces get stripped by Svelte)
	- ❌ Wrong: pattern={"\d{12}"} converts to pattern="d{12}" (backslash not properly escaped)

	Alternative: Use {{ }} to escape braces in template:
	- pattern="[0-9]{{12}}" (escapes the opening brace)

	@param {string} id - Unique identifier for the input element
	@param {string} name - Name attribute for form submission
	@param {string} label - Label text displayed above the input
	@param {'text'|'email'|'password'|'number'|'tel'|'url'|'search'} [type='text'] - HTML input type
	@param {string|null} [value=''] - Bindable input value
	@param {string} [placeholder=''] - Placeholder text
	@param {boolean} [required=false] - Whether the field is required
	@param {boolean} [disabled=false] - Whether the input is disabled
	@param {boolean} [readonly=false] - Whether the input is read-only
	@param {AutoFill} [autocomplete] - HTML autocomplete attribute
	@param {number} [maxlength] - Maximum character length
	@param {string} [error] - External error message to display
	@param {string} [helpText] - Helper text displayed below the input
	@param {'text'|'decimal'|'numeric'|'tel'|'search'|'email'|'url'} [inputmode] - Mobile keyboard hint
	@param {string|number} [min] - Minimum value (for number/date inputs)
	@param {string|number} [max] - Maximum value (for number/date inputs)
	@param {string} [pattern] - Regex pattern for validation (use expression syntax: pattern={"\\d{12}"})
	@param {string} [patternError='Please match the requested format'] - Error message when pattern doesn't match
	@param {string} [step] - Step value for number inputs
	@param {'input'|'blur'|'submit'} [validateOn='blur'] - When to trigger validation
	@param {boolean} [showValidIndicator=false] - Whether to show a checkmark when valid
	@param {(e: Event) => void} [oninput] - Input event handler
	@param {(e: FocusEvent) => void} [onblur] - Blur event handler
	@param {(e: FocusEvent) => void} [onfocus] - Focus event handler
	@param {(isValid: boolean) => void} [onvalid] - Callback fired when validation state changes
-->
<script lang="ts">
	import { Flex, Stack } from "$lib/components/layout";
	import { getFormContext } from "$lib/contexts/form-context.svelte";

	interface Props {
		id: string;
		name: string;
		label: string;
		type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
		value?: string | null;
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		autocomplete?: AutoFill | undefined | null;
		maxlength?: number;
		error?: string;
		helpText?: string;
		inputmode?: 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
		min?: string | number;
		max?: string | number;
		pattern?: string;
		patternError?: string;
		step?: string;
		showValidIndicator?: boolean;
		oninput?: (e: Event) => void;
		onblur?: (e: FocusEvent) => void;
		onfocus?: (e: FocusEvent) => void;
		onvalid?: (isValid: boolean) => void;
	}

	let {
		id,
		name,
		label,
		type = 'text',
		value = $bindable(''),
		placeholder = '',
		required = false,
		disabled = false,
		readonly = false,
		autocomplete,
		maxlength,
		error,
		helpText,
		inputmode,
		pattern,
		patternError = 'Please match the requested format',
		min,
		max,
		step,
		showValidIndicator = false,
		oninput,
		onblur,
		onfocus,
		onvalid
	}: Props = $props();

	let inputValue = $derived(value ?? '');
	let validationError = $state<string | undefined>(undefined);
	let touched = $state(false);
	let isValid = $state(false);
	let debounceTimer: ReturnType<typeof setTimeout> | null = $state(null);

	let displayError = $derived(touched ? error || validationError : error);
	let showValid = $derived(showValidIndicator && touched && isValid && !displayError && inputValue);

	const validatePattern = (target: HTMLInputElement): boolean => {
		if (!pattern) {
			validationError = undefined;
			isValid = false;
			onvalid?.(false);
			return true;
		}

		if (!inputValue) {
			validationError = undefined;
			isValid = false;
			onvalid?.(false);
			return true;
		}

		const valid = target.validity.valid && target.checkValidity();
		
		if (!valid) {
			validationError = patternError;
			isValid = false;
			onvalid?.(false);
			return false;
		} else {
			validationError = undefined;
			isValid = true;
			onvalid?.(true);
			return true;
		}
	};

	const formContext = getFormContext();
	let isDisabled = $derived(disabled || (formContext?.isSubmitting ?? false));

	const debounce = (target: HTMLInputElement) => {
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			validatePattern(target);
		}, 350);
	};

	const handleInput = (e: Event) => {
		if (!(e.currentTarget instanceof HTMLInputElement)) return;
		const target = e.currentTarget;
		value = target.value || null;

		debounce(target);

		oninput?.(e);
	};

	const handleBlur = (e: FocusEvent) => {
		if (!(e.currentTarget instanceof HTMLInputElement)) return;
		const target = e.currentTarget;
		touched = true;

		validatePattern(target);

		onblur?.(e);
	};

	const handleFocus = (e: FocusEvent) => {
		onfocus?.(e);
	};
</script>

<Stack gap="xs">
	<!-- Label row -->
	<Flex justify="between" align="center">
		<label for={id}>
			{label}
			{#if required}
				<span class="required-indicator">*</span>
			{/if}
		</label>
		{#if maxlength}
			<span class="char-counter">
				{inputValue.length}/{maxlength}
			</span>
		{/if}
	</Flex>

	<div class="input-container">
		<input
			{id}
			{name}
			{type}
			{required}
			disabled={isDisabled}
			{readonly}
			{autocomplete}
			{maxlength}
			value={inputValue}
			{placeholder}
			{inputmode}
			{min}
			{max}
			{step}
			{pattern}
			oninput={handleInput}
			onblur={handleBlur}
			onfocus={handleFocus}
			class:has-error={displayError}
			class:is-valid={showValid}
			aria-describedby={helpText || displayError ? `${id}-description` : undefined}
			aria-invalid={displayError ? true : undefined}
			aria-required={required ? true : undefined}
		/>
		{#if showValid}
			<span class="valid-indicator" aria-label="valid input">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polyline points="20 6 9 17 4 12"></polyline>
				</svg>
			</span>
		{/if}
	</div>

	{#if displayError}
		<p id="{id}-description" class="error-message" role="alert" aria-live="polite">
			{displayError}
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

	.char-counter {
		font-size: var(--font-size-xs);
		color: var(--text-tertiary);
	}

	.input-container {
		position: relative;
		display: flex;
		align-items: center;
	}

	input {
		display: block;
		width: 100%;
		padding: var(--space-sm) var(--space-md);
		border: 1px solid var(--border-primary);
		border-radius: var(--radius-md);
		background-color: var(--bg-primary);
		color: var(--text-primary);
		font-family: inherit;
		font-size: var(--font-size-base);
		transition:
			border-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	input.is-valid {
		padding-right: calc(var(--space-md) + 28px); /* Make room for checkmark */
		border-color: var(--color-success, #22c55e);
	}

	input:focus {
		outline: none;
		border-color: var(--border-focus);
		box-shadow: 0 0 0 3px oklch(60% 0.18 250 / 0.1);
	}

	input.is-valid:focus {
		border-color: var(--color-success, #22c55e);
		box-shadow: 0 0 0 3px oklch(70% 0.15 145 / 0.1);
	}

	input:disabled {
		background-color: var(--bg-secondary);
		cursor: not-allowed;
		opacity: 0.6;
	}

	input:read-only {
		background-color: var(--bg-secondary);
		cursor: default;
	}

	input.has-error {
		border-color: var(--color-error);
	}

	input.has-error:focus {
		border-color: var(--color-error);
		box-shadow: 0 0 0 3px oklch(60% 0.22 25 / 0.1);
	}

	.valid-indicator {
		position: absolute;
		right: var(--space-md);
		display: flex;
		align-items: center;
		color: var(--color-success, #22c55e);
		pointer-events: none;
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
