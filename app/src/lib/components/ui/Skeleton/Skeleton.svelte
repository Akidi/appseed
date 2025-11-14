<!--
@component
A skeleton loading placeholder component with multiple shapes and animations for content loading states.

@example
```svelte
<Skeleton
  variant="rect"
  width="200px"
  height="100px"
  size="100px"
  animation="pulse"
  class="custom-class"
/>
```

See Storybook for additional examples and visual documentation.

@param {'text'|'circle'|'rect'} [variant='text'] - Shape of the skeleton
@param {string} [width] - Width in CSS units (e.g., '200px', '50%')
@param {string} [height] - Height in CSS units
@param {string} [size] - For circle variant, sets both width and height
@param {'pulse'|'wave'|'none'} [animation='pulse'] - Animation type
@param {string} [class] - Additional CSS classes

@note For circle variant, use the size prop to set dimensions. For text and rect variants, use width and height.
-->

<script lang="ts">
	interface Props {
		variant?: 'text' | 'circle' | 'rect';
		width?: string;
		height?: string;
		size?: string;
		animation?: 'pulse' | 'wave' | 'none';
		class?: string;
	}

	let {
		variant = 'text',
		width,
		height,
		size,
		animation = 'pulse',
		class: className = ''
	}: Props = $props();

	// For circle variant, size sets both width and height
	const computedWidth = $derived(variant === 'circle' ? size : width);
	const computedHeight = $derived(variant === 'circle' ? size : height);
</script>

<div
	class="skeleton {className}"
	data-variant={variant}
	data-animation={animation}
	style:width={computedWidth}
	style:height={computedHeight}
	aria-busy="true"
	aria-live="polite"
	aria-label="Loading"
	role="status"
></div>

<style>
	.skeleton {
		background-color: var(--bg-secondary);
		display: inline-block;
		position: relative;
		overflow: hidden;
	}

	/* Variant styles */
	.skeleton[data-variant='text'] {
		width: 100%;
		height: 1rem;
		border-radius: var(--radius-sm);
	}

	.skeleton[data-variant='circle'] {
		width: 3rem;
		height: 3rem;
		border-radius: var(--radius-full);
	}

	.skeleton[data-variant='rect'] {
		width: 100%;
		height: 8rem;
		border-radius: var(--radius-md);
	}

	/* Animation: Pulse */
	.skeleton[data-animation='pulse'] {
		animation: skeleton-pulse 1.5s ease-in-out infinite;
	}

	@keyframes skeleton-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	/* Animation: Wave */
	.skeleton[data-animation='wave']::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
			90deg,
			transparent,
			oklch(from var(--bg-secondary) l c h / 0.5),
			transparent
		);
		animation: skeleton-wave 1.5s linear infinite;
	}

	@keyframes skeleton-wave {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	/* Dark theme adjustments */
	:global([data-theme='dark']) .skeleton {
		background-color: var(--bg-tertiary);
	}
</style>