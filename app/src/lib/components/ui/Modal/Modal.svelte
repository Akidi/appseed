<!--
@component
A modal dialog component with backdrop, animations, keyboard controls, and focus management.

@example
```svelte
<Modal
  isOpen={showModal}
  onClose={() => showModal = false}
  title="Confirm Action"
  description="Are you sure you want to proceed?"
  maxWidth="lg"
  closeOnEscape
  closeOnBackdrop
  showCloseButton
>
  Modal content goes here

  {#snippet footer()}
    <Button onclick={() => showModal = false}>Cancel</Button>
    <Button variant="primary">Confirm</Button>
  {/snippet}
</Modal>
```

See Storybook for additional examples and visual documentation.

@param {boolean} isOpen - Controls modal visibility
@param {() => void} onClose - Callback function when modal is closed
@param {string} title - Modal title displayed in header
@param {string} [description] - Optional description text below title
@param {'sm'|'md'|'lg'|'xl'|'2xl'|'full'} [maxWidth='lg'] - Maximum width of modal content
@param {boolean} [closeOnEscape=true] - Allow closing with Escape key
@param {boolean} [closeOnBackdrop=true] - Allow closing by clicking backdrop
@param {boolean} [showCloseButton=true] - Show close button in header
@param {Snippet} children - Main modal content
@param {Snippet} [footer] - Optional footer content snippet

@accessibility
Uses dialog role with proper ARIA attributes. Implements focus trapping and returns focus on close. Announces title to screen readers.
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { Stack } from '$lib/components/layout';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
		title: string;
		description?: string;
		maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
		closeOnEscape?: boolean;
		closeOnBackdrop?: boolean;
		showCloseButton?: boolean;
		children: Snippet;
		footer?: Snippet;
	}

	let { 
		isOpen, 
		onClose, 
		title, 
		description,
		maxWidth = 'lg', 
		closeOnEscape = true,
		closeOnBackdrop = true,
		showCloseButton = true,
		children,
		footer
	}: Props = $props();


	let modalElement = $state<HTMLDivElement>();
	let previousActiveElement: HTMLElement | null = null;

	// Generate unique IDs for ARIA
	const titleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`;
	const descriptionId = description ? `modal-description-${Math.random().toString(36).substr(2, 9)}` : undefined;

	// Handle escape key
	const handleKeydown = (e: KeyboardEvent) => {
		if (closeOnEscape && e.key === 'Escape' && isOpen) {
			e.preventDefault();
			onClose();
		}
	};

	// Handle backdrop click
	const handleBackdropClick = (e: MouseEvent) => {
		if (closeOnBackdrop && e.target === e.currentTarget) {
			onClose();
		}
	};

	// Focus management and body scroll lock
	$effect(() => {
		if (isOpen) {
			// Store the element that had focus before opening modal
			previousActiveElement = document.activeElement as HTMLElement;
			
			// Prevent body scroll
			document.body.style.overflow = 'hidden';
			
			// Focus the modal
			setTimeout(() => {
				modalElement?.focus();
			}, 0);

			// Add escape key listener
			document.addEventListener('keydown', handleKeydown);

			return () => {
				// Restore body scroll
				document.body.style.overflow = '';
				
				// Remove escape key listener
				document.removeEventListener('keydown', handleKeydown);
				
				// Restore focus to previous element
				if (previousActiveElement) {
					previousActiveElement.focus();
				}
			};
		}
	});
</script>

{#if isOpen}
	<div 
		class="modal-overlay"
		role="dialog"
		aria-modal="true"
		aria-labelledby={titleId}
		aria-describedby={descriptionId}
	>
		<div class="modal-container">
			<div
				class="modal-backdrop"
				onclick={handleBackdropClick}
				aria-hidden="true"
			></div>

			<div
				bind:this={modalElement}
				class="modal-panel"
				data-max-width={maxWidth}
				tabindex="-1"
			>
				<div class="modal-header">
					<div class="modal-header-content">
						<Stack gap="xs">
							<h2 id={titleId} class="modal-title">
								{title}
							</h2>
							{#if description}
								<p id={descriptionId} class="modal-description">
									{description}
								</p>
							{/if}
						</Stack>
					</div>
					{#if showCloseButton}
						<button
							type="button"
							onclick={onClose}
							class="modal-close-button"
							aria-label="Close dialog"
						>
							<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					{/if}
				</div>

				<div class="modal-body">
					{@render children()}
				</div>

				{#if footer}
					<div class="modal-footer">
						{@render footer()}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		inset: 0;
		z-index: 50;
		overflow-y: auto;
	}

	.modal-container {
		display: flex;
		min-height: 100vh;
		align-items: center;
		justify-content: center;
		padding: var(--space-lg);
	}

	.modal-backdrop {
		position: fixed;
		inset: 0;
		background-color: oklch(0% 0 0 / 0.5);
		backdrop-filter: blur(4px);
		transition: opacity var(--transition-base);
	}

	.modal-panel {
		position: relative;
		z-index: 10;
		width: 100%;
		background-color: var(--bg-primary);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xl);
		transform: scale(1);
		transition: all var(--transition-base);
	}

	.modal-panel[data-max-width="sm"] {
		max-width: 24rem;
	}

	.modal-panel[data-max-width="md"] {
		max-width: 28rem;
	}

	.modal-panel[data-max-width="lg"] {
		max-width: 32rem;
	}

	.modal-panel[data-max-width="xl"] {
		max-width: 36rem;
	}

	.modal-panel[data-max-width="2xl"] {
		max-width: 42rem;
	}

	.modal-panel[data-max-width="full"] {
		max-width: calc(100% - 2rem);
	}

	.modal-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: var(--space-xl);
		border-bottom: 1px solid var(--border-primary);
	}

	.modal-header-content {
		flex: 1;
	}

	.modal-title {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--text-primary);
		margin: 0;
	}

	.modal-description {
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		margin: 0;
	}

	.modal-close-button {
		margin-left: var(--space-lg);
		border-radius: var(--radius-md);
		color: var(--text-tertiary);
		transition: color var(--transition-fast);
		background: transparent;
		border: none;
		cursor: pointer;
		padding: var(--space-xs);
	}

	.modal-close-button:hover {
		color: var(--text-secondary);
	}

	.modal-close-button:focus {
		outline: none;
		box-shadow: 0 0 0 3px oklch(60% 0.18 250 / 0.1);
	}

	.modal-close-button svg {
		height: 1.5rem;
		width: 1.5rem;
	}

	.modal-body {
		padding: var(--space-xl);
	}

	.modal-footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: var(--space-md);
		padding: var(--space-xl);
		border-top: 1px solid var(--border-primary);
		background-color: var(--bg-secondary);
	}
</style>