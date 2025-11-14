<!--
@component
A badge component for displaying status, labels, categories, and tags with multiple color variants and sizes.

@example
```svelte
<Badge
  text="New Feature"
  variant="success"
  size="md"
  dot
  removable
  onRemove={() => console.log('removed')}
  class="custom-class"
/>
```

See Storybook for additional examples and visual documentation.

@param {string} text - The text content to display in the badge
@param {Variant} [variant='primary'] - Color variant: primary, secondary, success, warning, info, danger, error, neutral, blue, green, amber, red, gray, purple
@param {'sm'|'md'|'lg'} [size='md'] - Badge size
@param {boolean} [dot=false] - Show a status indicator dot before the text
@param {boolean} [removable=false] - Show a remove button
@param {() => void} [onRemove] - Callback function triggered when remove button is clicked
@param {string} [class] - Additional CSS classes to apply to the badge

@note Variant aliases are normalized: error→danger, neutral/gray→secondary, blue→primary, green→success, amber→warning, red→danger, purple→info

@accessibility
Uses role="status" for screen readers. Remove button includes descriptive aria-label. Status dot is hidden from assistive technology.
-->

<script lang="ts">
	type Variant =
		| 'primary'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'info'
		| 'danger'
		| 'error'
		| 'neutral'
		| 'blue'
		| 'green'
		| 'amber'
		| 'red'
		| 'gray'
		| 'purple';

	type ResolvedVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger';

	interface Props {
		text: string;
		variant?: Variant;
		size?: 'sm' | 'md' | 'lg';
		dot?: boolean;
		removable?: boolean;
		onRemove?: () => void;
		class?: string;
	}

	let {
		text,
		variant = 'primary',
		size = 'md',
		dot = false,
		removable = false,
		onRemove,
		class: className = ''
	}: Props = $props();

	const normalizeVariant = (value: Variant): ResolvedVariant => {
		switch (value) {
			case 'error':
				return 'danger';
			case 'neutral':
				return 'secondary';
			case 'blue':
				return 'primary';
			case 'green':
				return 'success';
			case 'amber':
				return 'warning';
			case 'red':
				return 'danger';
			case 'gray':
				return 'secondary';
			case 'purple':
				return 'info';
			default:
				return value;
		}
	};

	let resolvedVariant = $derived(normalizeVariant(variant));

	const handleRemove = (event: MouseEvent) => {
		event.stopPropagation();
		onRemove?.();
	};
</script>

<span
	role="status"
	data-variant={resolvedVariant}
	data-size={size}
	class={className}
	aria-label={text}
>
	{#if dot}
		<span data-dot aria-hidden="true"></span>
	{/if}
	<span data-badge-text>{text}</span>
	{#if removable && onRemove}
		<button type="button" onclick={handleRemove} aria-label={`Remove ${text}`}>
			<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	{/if}
</span>

<style>
	[role='status'][data-variant] {
		--badge-padding-y: 0.375rem;
		--badge-padding-x: var(--space-md);
		--badge-font-size: var(--font-size-sm);
		--badge-button-size: 1.25rem;
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		border-radius: var(--radius-full);
		font-weight: var(--font-weight-medium);
		line-height: 1;
		letter-spacing: 0.04em;
		padding: var(--badge-padding-y) var(--badge-padding-x);
		font-size: var(--badge-font-size);
		background-color: var(--bg-secondary);
		color: var(--text-secondary);
		transition: background-color var(--transition-fast);
	}

	[role='status'][data-size='sm'] {
		--badge-padding-y: var(--space-xs);
		--badge-padding-x: calc(var(--space-sm) + 0.125rem);
		--badge-font-size: var(--font-size-xs);
		--badge-button-size: 1rem;
	}

	[role='status'][data-size='lg'] {
		--badge-padding-y: var(--space-sm);
		--badge-padding-x: var(--space-lg);
		--badge-font-size: var(--font-size-base);
		--badge-button-size: 1.5rem;
	}

	[role='status'][data-variant='primary'] {
		background-color: var(--color-primary-100);
		color: var(--color-primary-700);
	}

	[role='status'][data-variant='secondary'] {
		background-color: var(--color-neutral-200);
		color: var(--color-neutral-700);
	}

	[role='status'][data-variant='success'] {
		background-color: var(--color-success-light);
		color: var(--color-success);
	}

	[role='status'][data-variant='warning'] {
		background-color: var(--color-warning-light);
		color: var(--color-warning);
	}

	[role='status'][data-variant='info'] {
		background-color: var(--color-info-light);
		color: var(--color-info);
	}

	[role='status'][data-variant='danger'] {
		background-color: var(--color-error-light);
		color: var(--color-error);
	}

	[data-badge-text] {
		display: inline-flex;
		align-items: center;
	}

	[role='status'] [data-dot] {
		width: 0.45rem;
		height: 0.45rem;
		border-radius: var(--radius-full);
		background-color: currentColor;
		opacity: 0.75;
	}

	button {
		margin-left: 0.125rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--badge-button-size);
		height: var(--badge-button-size);
		border-radius: var(--radius-full);
		background-color: transparent;
		border: none;
		cursor: pointer;
		color: inherit;
		transition: background-color var(--transition-fast);
		padding: 0;
	}

	button:hover {
		background-color: oklch(0% 0 0 / 0.08);
	}

	button:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 1px;
	}

	button svg {
		width: calc(var(--badge-button-size) * 0.55);
		height: calc(var(--badge-button-size) * 0.55);
	}
</style>
