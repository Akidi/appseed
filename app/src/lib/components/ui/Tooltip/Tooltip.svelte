<!--
@component
A tooltip component that displays informational text on hover with configurable positioning and delay.

@example
```svelte
<Tooltip
  content="This is helpful information"
  position="top"
  delay={300}
  class="custom-class"
>
  <button>Hover me</button>
</Tooltip>
```

See Storybook for additional examples and visual documentation.

@param {string} content - Tooltip text content to display
@param {'top'|'bottom'|'left'|'right'} [position='top'] - Position of tooltip relative to trigger element
@param {number} [delay=200] - Delay in milliseconds before showing tooltip
@param {string} [class] - Additional CSS classes
@param {Snippet} children - Trigger element that shows tooltip on hover

@accessibility
Uses role="tooltip" with aria-describedby for screen reader support. Tooltip is keyboard accessible.
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		content: string;
		position?: 'top' | 'bottom' | 'left' | 'right';
		delay?: number;
		class?: string;
		children: Snippet;
	}

	let {
		content,
		position = 'top',
		delay = 200,
		class: className = '',
		children
	}: Props = $props();

	let isVisible = $state(false);
	let timeoutId: number;
	let wrapperId = `tooltip-trigger-${Math.random().toString(36).substring(2, 9)}`;

	const show = () => {
		timeoutId = window.setTimeout(() => {
			isVisible = true;
		}, delay);
	};

	const hide = () => {
		window.clearTimeout(timeoutId);
		isVisible = false;
	};

</script>

<span class="tooltip-wrapper {className}">
	<span
		id={wrapperId}
		class="tooltip-trigger"
		onmouseenter={show}
		onmouseleave={hide}
		onfocus={show}
		onblur={hide}
		aria-describedby={isVisible ? `${wrapperId}-tooltip` : undefined}
        role="tooltip"
	>
		{@render children()}
	</span>

	{#if isVisible}
		<span
			id="{wrapperId}-tooltip"
			role="tooltip"
			class="tooltip-container tooltip-{position}"
		>
			<span class="tooltip-content">
				{content}
			</span>
			<span
				class="tooltip-arrow tooltip-arrow-{position}"
				aria-hidden="true"
			></span>
		</span>
	{/if}
</span>

<style>
	.tooltip-wrapper {
		position: relative;
		display: inline-block;
	}

	.tooltip-trigger {
		display: inline-block;
	}

	.tooltip-container {
		position: absolute;
		z-index: 50;
	}

	.tooltip-top {
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		padding-bottom: var(--space-sm);
	}

	.tooltip-bottom {
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		padding-top: var(--space-sm);
	}

	.tooltip-left {
		right: 100%;
		top: 50%;
		transform: translateY(-50%);
		padding-right: var(--space-sm);
	}

	.tooltip-right {
		left: 100%;
		top: 50%;
		transform: translateY(-50%);
		padding-left: var(--space-sm);
	}

	.tooltip-content {
		display: block;
		padding: var(--space-sm) var(--space-md);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: white;
		background-color: #1f2937;
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg);
		white-space: nowrap;
	}

	.tooltip-arrow {
		position: absolute;
		width: 0;
		height: 0;
	}

	.tooltip-arrow-top {
		bottom: -8px;
		left: 50%;
		transform: translateX(-50%);
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-top: 8px solid #1f2937;
	}

	.tooltip-arrow-bottom {
		top: -8px;
		left: 50%;
		transform: translateX(-50%);
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-bottom: 8px solid #1f2937;
	}

	.tooltip-arrow-left {
		right: -8px;
		top: 50%;
		transform: translateY(-50%);
		border-top: 8px solid transparent;
		border-bottom: 8px solid transparent;
		border-left: 8px solid #1f2937;
	}

	.tooltip-arrow-right {
		left: 0;
		top: 50%;
		transform: translate(-100%, -50%);
		border-top: 8px solid transparent;
		border-bottom: 8px solid transparent;
		border-right: 8px solid #1f2937;
	}
</style>
