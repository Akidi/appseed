<!--
@component
A form section container with header, optional collapsibility, badges, error states, and action buttons.

@example
```svelte
<FormSection
  title="Account Settings"
  description="Manage your account preferences"
  required={true}
  collapsible={true}
  defaultOpen={true}
  error="Please fix the errors below"
  badge="Optional"
  spacing="normal"
  class="custom-section"
>
  {#snippet actions()}
    <Button size="sm" variant="ghost">Reset</Button>
  {/snippet}

  <TextInput label="Username" />
  <TextInput label="Email" type="email" />
</FormSection>
```

See Storybook for additional examples and visual documentation.

@param {string} title - Section heading text
@param {string} [description] - Optional description displayed below the title
@param {boolean} [required=false] - Shows required indicator (*) next to title
@param {boolean} [collapsible=false] - Makes the section collapsible with expand/collapse chevron
@param {boolean} [defaultOpen=true] - Initial open state for collapsible sections
@param {string} [error] - Error message displayed below description (applies error styling to section)
@param {string} [badge] - Badge text displayed next to the title
@param {'tight'|'normal'|'relaxed'} [spacing='normal'] - Vertical spacing between child elements (md/lg/xl)
@param {string} [class] - Additional CSS classes to apply to the section element
@param {Snippet} children - Form fields and content within the section
@param {Snippet} [actions] - Optional action buttons displayed in the header

@note Collapsible sections use button element for proper keyboard/screen reader support. Spacing maps to Stack gap values: tight=md, normal=lg, relaxed=xl.

@accessibility
Collapsible header uses proper button semantics with aria-expanded state. Error messages have role="alert".
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Stack, Flex } from '$lib/components/layout';

	interface Props {
		title: string;
		description?: string;
		required?: boolean;
		collapsible?: boolean;
		defaultOpen?: boolean;
		error?: string;
		badge?: string;
		spacing?: 'tight' | 'normal' | 'relaxed';
		class?: string;
		children: Snippet;
		actions?: Snippet;
	}

	let { 
		title, 
		description, 
		required = false,
		collapsible = false,
		defaultOpen = true,
		error,
		badge,
		spacing = 'normal',
		class: className = '',
		children,
		actions
	}: Props = $props();

	let isOpen = $state(defaultOpen);

	const toggleOpen = () => {
		if (collapsible) {
			isOpen = !isOpen;
		}
	};

	const handleHeaderClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget || (e.target as HTMLElement).closest('h2, p')) {
			toggleOpen();
		}
	};
	
	// Map spacing prop to gap values
	const gapMap = {
		tight: 'md' as const,
		normal: 'lg' as const,
		relaxed: 'xl' as const
	};
</script>

<section 
	class="form-section {className}"
	class:error={error}
>
	{#if collapsible}
		<button
			type="button"
			class="form-section-header collapsible"
			class:open={isOpen}
			onclick={handleHeaderClick}
			aria-expanded={isOpen}
		>
			<div class="form-section-header-content">
				<Stack gap="xs">
					<Flex justify="between" align="center" gap="sm">
						<h2 class="form-section-title">
							{title}
							{#if required}
								<span class="form-section-required" aria-label="required">*</span>
							{/if}
						</h2>
						{#if badge}
							<span class="form-section-badge">
								{badge}
							</span>
						{/if}
					</Flex>
					{#if description}
						<p class="form-section-description">{description}</p>
					{/if}
					{#if error}
						<p class="form-section-error" role="alert">{error}</p>
					{/if}
				</Stack>
			</div>

			<Flex gap="sm" align="center">
				{#if actions}
					<div class="form-section-actions">
						{@render actions()}
					</div>
				{/if}
				<svg 
					class="form-section-chevron"
					class:closed={!isOpen}
					fill="none" 
					viewBox="0 0 24 24" 
					stroke="currentColor"
					aria-hidden="true"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</Flex>
		</button>
	{:else}
		<div class="form-section-header">
			<div class="form-section-header-content">
				<Stack gap="xs">
					<Flex justify="between" align="center" gap="sm">
						<h2 class="form-section-title">
							{title}
							{#if required}
								<span class="form-section-required" aria-label="required">*</span>
							{/if}
						</h2>
						{#if badge}
							<span class="form-section-badge">
								{badge}
							</span>
						{/if}
					</Flex>
					{#if description}
						<p class="form-section-description">{description}</p>
					{/if}
					{#if error}
						<p class="form-section-error" role="alert">{error}</p>
					{/if}
				</Stack>
			</div>

			{#if actions}
				<Flex gap="sm">
					{@render actions()}
				</Flex>
			{/if}
		</div>
	{/if}

	{#if isOpen}
		<div class="form-section-content">
			<Stack gap={gapMap[spacing]}>
				{@render children()}
			</Stack>
		</div>
	{/if}
</section>

<style>
	.form-section {
		border: 1px solid var(--border-primary);
		background-color: var(--bg-primary);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-sm);
	}

	.form-section.error {
		border-color: var(--color-error);
	}

	.form-section-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: var(--space-2xl);
		border-bottom: 1px solid var(--border-primary);
	}

	.form-section-header.collapsible {
		width: 100%;
		text-align: left;
		background: transparent;
		border: none;
		border-bottom: 1px solid var(--border-primary);
		cursor: pointer;
		transition: background-color var(--transition-fast);
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: var(--space-2xl);
	}

	.form-section-header.collapsible:hover {
		background-color: var(--bg-secondary);
	}

	.form-section-header.collapsible:not(.open) {
		border-bottom: none;
	}

	.form-section.error .form-section-header {
		border-bottom: none;
	}

	.form-section-header-content {
		flex: 1;
		pointer-events: none;
	}

	.form-section-title {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--text-primary);
		margin: 0;
	}

	.form-section-required {
		color: var(--color-error);
		margin-left: var(--space-xs);
	}

	.form-section-badge {
		display: inline-flex;
		align-items: center;
		padding: 0.125rem var(--space-sm);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		color: var(--color-primary);
		background-color: var(--color-primary-light);
		border-radius: var(--radius-full);
	}

	.form-section-description {
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		margin: 0;
	}

	.form-section-error {
		font-size: var(--font-size-sm);
		color: var(--color-error);
		margin: 0;
	}

	.form-section-actions {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		pointer-events: auto;
	}

	.form-section-chevron {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--text-disabled);
		transition: transform var(--transition-fast);
		pointer-events: none;
	}

	.form-section-chevron.closed {
		transform: rotate(-90deg);
	}

	.form-section-content {
		padding: var(--space-2xl);
	}
</style>