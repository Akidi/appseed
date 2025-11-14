<!--
@component
An avatar component for displaying user profile images with fallback text, status indicators, and customizable shapes.

@example
```svelte
<Avatar
  src="/user.jpg"
  alt="John Doe"
  fallback="JD"
  size="md"
  shape="circle"
  status="online"
  statusPosition="bottom-right"
  class="custom-class"
/>
```

See Storybook for additional examples and visual documentation.

@param {string} [src] - Image URL to display
@param {string} [alt=''] - Alt text for the image
@param {string} [fallback='?'] - Fallback text displayed when image is unavailable or loading
@param {'xs'|'sm'|'md'|'lg'|'xl'|string} [size='md'] - Avatar size, accepts predefined sizes or custom CSS value
@param {'circle'|'square'|'rounded'} [shape='circle'] - Shape of the avatar
@param {'online'|'offline'|'busy'|'away'} [status] - Optional status indicator
@param {'top-right'|'bottom-right'|'top-left'|'bottom-left'} [statusPosition='bottom-right'] - Position of the status indicator
@param {string} [class] - Additional CSS classes to apply

@note Fallback text generates a unique background color based on the text content for visual variety.

@accessibility
Uses img element with proper alt text. Fallback text is visible and readable with sufficient contrast.
-->

<script lang="ts">
	import { Center } from '$lib/components/layout';

	interface Props {
		src?: string;
		alt?: string;
		fallback?: string;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
		shape?: 'circle' | 'square' | 'rounded';
		status?: 'online' | 'offline' | 'busy' | 'away';
		statusPosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
		class?: string;
	}

	let {
		src,
		alt = '',
		fallback = '?',
		size = 'md',
		shape = 'circle',
		status,
		statusPosition = 'bottom-right',
		class: className = ''
	}: Props = $props();

	let imageLoaded = $state(false);
	let imageError = $state(false);

	const handleImageLoad = () => {
		imageLoaded = true;
		imageError = false;
	};

	const handleImageError = () => {
		imageLoaded = false;
		imageError = true;
	};

	const showImage = $derived(src && imageLoaded && !imageError);
	const showFallback = $derived(!src || imageError || !imageLoaded);

	// Generate a simple color from the fallback text
	const generateColor = (text: string): string => {
		if (!text) return 'var(--color-primary)';
		
		const colors = [
			'var(--color-primary)',
			'oklch(65% 0.18 155)', // green
			'oklch(70% 0.15 70)',  // amber
			'oklch(60% 0.22 25)',  // red
			'oklch(65% 0.18 270)', // purple
			'oklch(65% 0.18 200)', // cyan
		];
		
		const index = text.charCodeAt(0) % colors.length;
		return colors[index];
	};

	const fallbackColor = $derived(generateColor(fallback));
</script>

<div 
	class="avatar {className}"
	data-size={typeof size === 'string' && ['xs', 'sm', 'md', 'lg', 'xl'].includes(size) ? size : undefined}
	data-shape={shape}
	style:width={!['xs', 'sm', 'md', 'lg', 'xl'].includes(size as string) ? size : undefined}
	style:height={!['xs', 'sm', 'md', 'lg', 'xl'].includes(size as string) ? size : undefined}
	role="img"
	aria-label={alt || 'Avatar'}
>
	{#if showImage}
		<img
			{src}
			{alt}
			class="avatar-image"
			onload={handleImageLoad}
			onerror={handleImageError}
		/>
	{/if}
	
	{#if showFallback}
		<Center class="avatar-fallback" style="background-color: {fallbackColor}">
			<span class="avatar-fallback-text">{fallback}</span>
		</Center>
	{/if}

	{#if status}
		<span 
			class="avatar-status"
			data-status={status}
			data-position={statusPosition}
			aria-label="{status} status"
		></span>
	{/if}
</div>

<style>
	.avatar {
		--avatar-size: 2.5rem;
		position: relative;
		display: inline-block;
		width: var(--avatar-size);
		height: var(--avatar-size);
		flex-shrink: 0;
		overflow: hidden;
	}

	/* Size variants */
	.avatar[data-size='xs'] { --avatar-size: 1.5rem; }
	.avatar[data-size='sm'] { --avatar-size: 2rem; }
	.avatar[data-size='md'] { --avatar-size: 2.5rem; }
	.avatar[data-size='lg'] { --avatar-size: 3rem; }
	.avatar[data-size='xl'] { --avatar-size: 4rem; }

	/* Shape variants */
	.avatar[data-shape='circle'] {
		border-radius: var(--radius-full);
	}

	.avatar[data-shape='square'] {
		border-radius: 0;
	}

	.avatar[data-shape='rounded'] {
		border-radius: var(--radius-md);
	}

	.avatar-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.avatar :global(.avatar-fallback) {
		width: 100%;
		height: 100%;
		color: white;
	}

	.avatar-fallback-text {
		font-size: calc(var(--avatar-size) * 0.4);
		font-weight: var(--font-weight-semibold);
		text-transform: uppercase;
		user-select: none;
	}

	/* Status indicator */
	.avatar-status {
		position: absolute;
		width: calc(var(--avatar-size) * 0.3);
		height: calc(var(--avatar-size) * 0.3);
		min-width: 8px;
		min-height: 8px;
		border-radius: var(--radius-full);
		border: 2px solid var(--bg-primary);
		box-shadow: var(--shadow-sm);
	}

	/* Status positions */
	.avatar-status[data-position='top-right'] {
		top: 0;
		right: 0;
	}

	.avatar-status[data-position='bottom-right'] {
		bottom: 0;
		right: 0;
	}

	.avatar-status[data-position='top-left'] {
		top: 0;
		left: 0;
	}

	.avatar-status[data-position='bottom-left'] {
		bottom: 0;
		left: 0;
	}

	/* Status colors */
	.avatar-status[data-status='online'] {
		background-color: var(--color-success);
	}

	.avatar-status[data-status='offline'] {
		background-color: var(--color-neutral-400);
	}

	.avatar-status[data-status='busy'] {
		background-color: var(--color-error);
	}

	.avatar-status[data-status='away'] {
		background-color: var(--color-warning);
	}
</style>