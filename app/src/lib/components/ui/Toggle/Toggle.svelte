<!--
@component
A toggle switch component with label, description, and multiple sizes.

@example
```svelte
<Toggle
  id="notifications"
  label="Enable Notifications"
  description="Receive email notifications for updates"
  bind:checked={notificationsEnabled}
  disabled
  size="md"
  onchange={(checked) => console.log('toggled:', checked)}
  class="custom-class"
/>
```

See Storybook for additional examples and visual documentation.

@param {string} id - Unique identifier for the toggle input
@param {string} label - Label text displayed next to the toggle
@param {string} [description] - Optional description text below the label
@param {boolean} [checked=false] - Checked state (bindable)
@param {boolean} [disabled=false] - Disable the toggle
@param {'sm'|'md'|'lg'} [size='md'] - Toggle switch size
@param {(checked: boolean) => void} [onchange] - Change event handler with new checked state
@param {string} [class] - Additional CSS classes

@accessibility
Uses checkbox input with role="switch" for proper switch semantics. Label association via htmlFor.
-->

<script lang="ts">
	interface Props {
		id: string;
		label: string;
		description?: string;
		checked?: boolean;
		disabled?: boolean;
		size?: 'sm' | 'md' | 'lg';
		onchange?: (checked: boolean) => void;
		class?: string;
	}

	let {
		id,
		label,
		description,
		checked = $bindable(false),
		disabled = false,
		size = 'md',
		onchange,
		class: className = ''
	}: Props = $props();

	const toggle = () => {
		if (!disabled) {
			checked = !checked;
			onchange?.(checked);
		}
	};

</script>

<div class="toggle-wrapper {className}">
	<button
		type="button"
		{id}
		role="switch"
		aria-checked={checked}
		aria-labelledby="{id}-label"
		aria-describedby={description ? `${id}-description` : undefined}
		onclick={toggle}
		disabled={disabled}
		class="toggle-switch"
		data-size={size}
		data-checked={checked}
	>
		<span class="sr-only">{label}</span>
		<span class="toggle-handle" aria-hidden="true"></span>
	</button>

	<label
		for={id}
		id="{id}-label"
		class="toggle-label"
		class:disabled={disabled}
	>
		<span class="toggle-label-text">
			{label}
		</span>
		{#if description}
			<span id="{id}-description" class="toggle-description">
				{description}
			</span>
		{/if}
	</label>
</div>

<style>
	.toggle-wrapper {
		display: flex;
		align-items: flex-start;
		gap: var(--space-md);
	}

	.toggle-switch {
		--toggle-track-width: 2.75rem;
		--toggle-track-height: 1.5rem;
		--toggle-track-padding: 0.125rem;
		--toggle-handle-size: calc(var(--toggle-track-height) - (var(--toggle-track-padding) * 2));
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: flex-start;
		flex-shrink: 0;
		width: var(--toggle-track-width);
		height: var(--toggle-track-height);
		padding: var(--toggle-track-padding);
		border-radius: var(--radius-full);
		border: 1px solid var(--border-primary);
		background-color: var(--color-neutral-300);
		transition:
			background-color var(--transition-base),
			border-color var(--transition-base),
			box-shadow var(--transition-base);
		cursor: pointer;
		overflow: hidden;
	}

	.toggle-switch[data-size='sm'] {
		--toggle-track-width: 2.25rem;
		--toggle-track-height: 1.25rem;
	}

	.toggle-switch[data-size='lg'] {
		--toggle-track-width: 3.5rem;
		--toggle-track-height: 1.75rem;
	}

	.toggle-switch:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px oklch(60% 0.18 250 / 0.15);
	}

	.toggle-switch:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}

	.toggle-switch[data-checked='true'] {
		background-color: var(--color-primary);
		border-color: var(--color-primary);
	}

	.toggle-handle {
		position: absolute;
		top: var(--toggle-track-padding);
		left: var(--toggle-track-padding);
		width: var(--toggle-handle-size);
		height: var(--toggle-handle-size);
		border-radius: var(--radius-full);
		background-color: var(--color-neutral-50);
		box-shadow: var(--shadow-sm);
		transform: translateX(0);
		transition:
			transform var(--transition-fast),
			background-color var(--transition-fast);
	}

	.toggle-switch[data-checked='true'] .toggle-handle {
		transform: translateX(calc(var(--toggle-track-width) - var(--toggle-handle-size) - (var(--toggle-track-padding) * 2)));
	}

	.toggle-switch:disabled .toggle-handle {
		background-color: var(--color-neutral-200);
	}

	.toggle-label {
		flex: 1;
		cursor: pointer;
	}

	.toggle-label.disabled {
		cursor: not-allowed;
	}

	.toggle-label-text {
		display: block;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
	}

	.toggle-label.disabled .toggle-label-text {
		color: var(--text-tertiary);
	}

	.toggle-description {
		display: block;
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		margin-top: var(--space-xs);
	}

	.toggle-label.disabled .toggle-description {
		color: var(--text-tertiary);
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
