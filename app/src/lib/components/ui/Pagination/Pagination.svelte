<!--
@component
A pagination component for navigating through pages of content with configurable visibility and navigation controls.

@example
```svelte
<Pagination
  currentPage={3}
  totalPages={10}
  onPageChange={(page) => console.log(`Go to page ${page}`)}
  showFirstLast
  maxVisible={5}
  class="custom-class"
/>
```

See Storybook for additional examples and visual documentation.

@param {number} currentPage - Current active page number (1-indexed)
@param {number} totalPages - Total number of pages
@param {(page: number) => void} onPageChange - Callback function when page is changed
@param {boolean} [showFirstLast=true] - Show first and last page buttons
@param {number} [maxVisible=7] - Maximum number of page buttons to display
@param {string} [class] - Additional CSS classes

@accessibility
Uses semantic nav element with aria-label. Page buttons include aria-current for current page and proper aria-labels.
-->

<script lang="ts">
	interface Props {
		currentPage: number;
		totalPages: number;
		onPageChange: (page: number) => void;
		showFirstLast?: boolean;
		maxVisible?: number;
		class?: string;
	}

	let {
		currentPage,
		totalPages,
		onPageChange,
		showFirstLast = true,
		maxVisible = 7,
		class: className = ''
	}: Props = $props();

	const goToPage = (page: number) => {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			onPageChange(page);
		}
	};

	const getVisiblePages = $derived(() => {
		if (totalPages <= maxVisible) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const halfVisible = Math.floor(maxVisible / 2);
		let start = Math.max(1, currentPage - halfVisible);
		let end = Math.min(totalPages, start + maxVisible - 1);

		if (end - start + 1 < maxVisible) {
			start = Math.max(1, end - maxVisible + 1);
		}

		const pages: (number | string)[] = [];
		
		if (start > 1) {
			pages.push(1);
			if (start > 2) pages.push('...');
		}

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		if (end < totalPages) {
			if (end < totalPages - 1) pages.push('...');
			pages.push(totalPages);
		}

		return pages;
	});

	const canGoPrevious = $derived(currentPage > 1);
	const canGoNext = $derived(currentPage < totalPages);
</script>

<nav 
	class="pagination {className}"
	aria-label="Pagination"
>
	{#if showFirstLast}
		<button
			type="button"
			onclick={() => goToPage(1)}
			disabled={!canGoPrevious}
			class="pagination-button"
			class:disabled={!canGoPrevious}
			aria-label="Go to first page"
		>
			<svg class="pagination-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
			</svg>
		</button>
	{/if}

	<button
		type="button"
		onclick={() => goToPage(currentPage - 1)}
		disabled={!canGoPrevious}
		class="pagination-button"
		class:disabled={!canGoPrevious}
		aria-label="Go to previous page"
	>
		<svg class="pagination-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
	</button>

	{#each getVisiblePages() as page}
		{#if page === '...'}
			<span class="pagination-ellipsis">
				{page}
			</span>
		{:else}
			<button
				type="button"
				onclick={() => goToPage(page as number)}
				class="pagination-button pagination-page"
				class:active={currentPage === page}
				aria-label="Go to page {page}"
				aria-current={currentPage === page ? 'page' : undefined}
			>
				{page}
			</button>
		{/if}
	{/each}

	<button
		type="button"
		onclick={() => goToPage(currentPage + 1)}
		disabled={!canGoNext}
		class="pagination-button"
		class:disabled={!canGoNext}
		aria-label="Go to next page"
	>
		<svg class="pagination-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>
	</button>

	{#if showFirstLast}
		<button
			type="button"
			onclick={() => goToPage(totalPages)}
			disabled={!canGoNext}
			class="pagination-button"
			class:disabled={!canGoNext}
			aria-label="Go to last page"
		>
			<svg class="pagination-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
			</svg>
		</button>
	{/if}
</nav>

<style>
	.pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-xs);
	}

	.pagination-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 2.25rem;
		padding: 0 var(--space-md);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
		background: transparent;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.pagination-button:hover:not(.disabled) {
		background-color: var(--bg-secondary);
	}

	.pagination-button:focus-visible {
		outline: none;
		box-shadow: var(--focus-ring);
	}

	.pagination-button.disabled {
		color: var(--text-disabled);
		cursor: not-allowed;
	}

	.pagination-page {
		min-width: 2.25rem;
	}

	.pagination-page.active {
		background-color: var(--color-primary);
		color: white;
	}

	.pagination-page.active:hover {
		background-color: var(--color-primary-hover);
	}

	.pagination-icon {
		width: 1rem;
		height: 1rem;
	}

	.pagination-ellipsis {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 2.25rem;
		padding: 0 var(--space-md);
		font-size: var(--font-size-sm);
		color: var(--text-disabled);
	}
</style>
