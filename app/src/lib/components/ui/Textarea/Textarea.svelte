<!--
@component
A textarea input component with auto-resize capability, validation, and character counting.

@example
```svelte
<Textarea
  id="description"
  name="description"
  label="Description"
  bind:value={description}
  placeholder="Enter a detailed description..."
  rows={4}
  minRows={3}
  maxRows={10}
  required
  disabled
  readonly
  maxlength={500}
  error="Description is required"
  helpText="Provide as much detail as possible"
  resize="auto"
  autoResize
  oninput={(e) => console.log('typing')}
  onblur={(e) => console.log('blurred')}
  onfocus={(e) => console.log('focused')}
/>
```

See Storybook for additional examples and visual documentation.

@param {string} id - Unique identifier for the textarea
@param {string} name - Name attribute for form submission
@param {string} label - Label text displayed above the textarea
@param {string|null} [value] - Current textarea value (bindable)
@param {string} [placeholder] - Placeholder text
@param {number} [rows=4] - Initial number of visible rows
@param {number} [minRows] - Minimum rows when auto-resizing
@param {number} [maxRows] - Maximum rows when auto-resizing
@param {boolean} [required=false] - Mark textarea as required
@param {boolean} [disabled=false] - Disable the textarea
@param {boolean} [readonly=false] - Make textarea read-only
@param {number} [maxlength] - Maximum character length
@param {string} [error] - Error message to display
@param {string} [helpText] - Helper text displayed below the textarea
@param {'none'|'vertical'|'both'|'auto'} [resize='vertical'] - Resize behavior
@param {boolean} [autoResize=false] - Automatically adjust height based on content
@param {(e: Event) => void} [oninput] - Input event handler
@param {(e: FocusEvent) => void} [onblur] - Blur event handler
@param {(e: FocusEvent) => void} [onfocus] - Focus event handler

@note When autoResize is true, the textarea automatically adjusts its height to fit content between minRows and maxRows.

@accessibility
Uses native textarea element with proper label association. Character count and error messages are announced to screen readers.
-->

<script lang="ts">
	import { Flex, Stack } from '$lib/components/layout';
	import { getFormContext } from '$lib/contexts/form-context.svelte';

	interface Props {
		id: string;
		name: string;
		label: string;
		value?: string | null;
		placeholder?: string;
		rows?: number;
		minRows?: number;
		maxRows?: number;
		required?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		maxlength?: number;
		error?: string;
		helpText?: string;
		resize?: 'none' | 'vertical' | 'both' | 'auto';
		autoResize?: boolean;
		oninput?: (e: Event) => void;
		onblur?: (e: FocusEvent) => void;
		onfocus?: (e: FocusEvent) => void;
	}

	let {
		id,
		name,
		label,
		value = $bindable(''),
		placeholder = '',
		rows = 3,
		minRows,
		maxRows,
		required = false,
		disabled = false,
		readonly = false,
		maxlength,
		error,
		helpText,
		resize = 'vertical',
		autoResize = false,
		oninput,
		onblur,
		onfocus
	}: Props = $props();

	let textareaElement = $state<HTMLTextAreaElement>();
	let inputValue = $derived(value ?? '');

	const formContext = getFormContext();
	const isDisabled = $derived(disabled || (formContext?.isSubmitting ?? false));

	// Auto-resize logic
	const handleAutoResize = () => {
		if (!autoResize || !textareaElement) return;

		// Reset height to auto to get the correct scrollHeight
		textareaElement.style.height = 'auto';
		
		// Calculate new height
		let newHeight = textareaElement.scrollHeight;
		
		// Apply min/max constraints if provided
		if (minRows) {
			const lineHeight = parseInt(getComputedStyle(textareaElement).lineHeight);
			const minHeight = lineHeight * minRows;
			newHeight = Math.max(newHeight, minHeight);
		}
		
		if (maxRows) {
			const lineHeight = parseInt(getComputedStyle(textareaElement).lineHeight);
			const maxHeight = lineHeight * maxRows;
			newHeight = Math.min(newHeight, maxHeight);
		}
		
		textareaElement.style.height = `${newHeight}px`;
	};

	const handleInput = (e: Event) => {
		if (!(e.currentTarget instanceof HTMLTextAreaElement)) return;
		value = e.currentTarget.value || null;
		
		if (autoResize) {
			handleAutoResize();
		}
		
		oninput?.(e);
	};

	const handleBlur = (e: FocusEvent) => {
		onblur?.(e);
	};

	const handleFocus = (e: FocusEvent) => {
		onfocus?.(e);
	};

	// Initialize auto-resize on mount
	$effect(() => {
		if (autoResize && textareaElement) {
			handleAutoResize();
		}
	});
</script>

<Stack gap="xs">
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

	<textarea
		bind:this={textareaElement}
		{id}
		{name}
		{required}
		disabled={isDisabled}
		{readonly}
		{maxlength}
		{rows}
		value={inputValue}
		{placeholder}
		oninput={handleInput}
		onblur={handleBlur}
		onfocus={handleFocus}
		class:has-error={error}
		data-resize={autoResize ? 'auto' : resize}
		aria-describedby={helpText || error ? `${id}-description` : undefined}
		aria-invalid={error ? true : undefined}
		aria-required={required ? true : undefined}
	></textarea>

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

	.char-counter {
		font-size: var(--font-size-xs);
		color: var(--text-tertiary);
	}

	textarea {
		display: block;
		width: 100%;
		padding: var(--space-sm) var(--space-md);
		border: 1px solid var(--border-primary);
		border-radius: var(--radius-md);
		background-color: var(--bg-primary);
		color: var(--text-primary);
		font-family: inherit;
		font-size: var(--font-size-base);
		line-height: 1.5;
		transition:
			border-color var(--transition-fast),
			box-shadow var(--transition-fast);
		min-height: 3em;
	}

	/* Resize options */
	textarea[data-resize='none'] {
		resize: none;
	}

	textarea[data-resize='vertical'] {
		resize: vertical;
	}

	textarea[data-resize='both'] {
		resize: both;
	}

	textarea[data-resize='auto'] {
		resize: none;
		overflow: hidden;
	}

	textarea:focus {
		outline: none;
		border-color: var(--border-focus);
		box-shadow: 0 0 0 3px oklch(60% 0.18 250 / 0.1);
	}

	textarea:disabled {
		background-color: var(--bg-secondary);
		cursor: not-allowed;
		opacity: 0.6;
	}

	textarea:read-only {
		background-color: var(--bg-secondary);
		cursor: default;
	}

	textarea.has-error {
		border-color: var(--color-error);
	}

	textarea.has-error:focus {
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
</style>