<!--
@component
A table component with support for striped rows, hover effects, borders, and custom styling.

@example
```svelte
<Table
  striped
  hover
  bordered
  compact
  caption="User data table"
  class="custom-table"
>
  {#snippet head()}
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  {/snippet}

  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
    </tr>
  </tbody>

  {#snippet foot()}
    <tr>
      <td colspan="2">Total: 1 user</td>
    </tr>
  {/snippet}
</Table>
```

See Storybook for additional examples and visual documentation.

@param {boolean} [striped=false] - Apply zebra-striping to rows
@param {boolean} [hover=true] - Highlight rows on hover
@param {boolean} [bordered=false] - Add borders to all cells
@param {boolean} [compact=false] - Reduce cell padding for denser layout
@param {string} [class] - Additional CSS classes
@param {string} [caption] - Optional table caption for accessibility
@param {Snippet} [head] - Table header content (thead)
@param {Snippet} children - Table body content (tbody)
@param {Snippet} [foot] - Table footer content (tfoot)

@accessibility
Uses semantic table elements. Caption is announced by screen readers. Proper th/td structure should be maintained in content.
-->

<script lang="ts">
	import type { Snippet} from 'svelte';

	interface Props {
		striped?: boolean;
		hover?: boolean;
		bordered?: boolean;
		compact?: boolean;
		class?: string;
		caption?: string;
		head?: Snippet;
		children: Snippet;
		foot?: Snippet;
	}

	let {
		striped = false,
		hover = true,
		bordered = false,
		compact = false,
		class: className = '',
		caption,
		head,
		children,
		foot
	}: Props = $props();
</script>

<div class="table-wrapper {className}">
	<table 
		class="table"
		data-compact={compact}
		data-bordered={bordered}
	>
		{#if caption}
			<caption class="table-caption">
				{caption}
			</caption>
		{/if}
		
		{#if head}
			<thead class="table-head">
				{@render head()}
			</thead>
		{/if}
		
		<tbody 
			class="table-body"
			data-striped={striped}
			data-hover={hover}
		>
			{@render children()}
		</tbody>

		{#if foot}
			<tfoot class="table-foot">
				{@render foot()}
			</tfoot>
		{/if}
	</table>
</div>

<style>
	.table-wrapper {
		overflow-x: auto;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border-primary);
	}

	.table {
		min-width: 100%;
		border-collapse: collapse;
	}

	.table[data-bordered="true"] {
		border-spacing: 0;
	}

	.table-caption {
		padding: var(--space-md) var(--space-xl);
		text-align: left;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--text-primary);
		background-color: var(--bg-secondary);
	}

	.table-head {
		background-color: var(--bg-secondary);
	}

	.table-head :global(tr) {
		border-bottom: 1px solid var(--border-primary);
	}

	.table-body {
		background-color: var(--bg-primary);
	}

	.table-body :global(tr) {
		border-bottom: 1px solid var(--border-primary);
	}

	.table-body :global(tr:last-child) {
		border-bottom: none;
	}

	.table-body[data-striped="true"] :global(tr:nth-child(even)) {
		background-color: var(--bg-secondary);
	}

	.table-body[data-hover="true"] :global(tr:hover) {
		background-color: var(--bg-tertiary);
	}

	.table-foot {
		background-color: var(--bg-secondary);
	}

	.table-foot :global(tr) {
		border-top: 1px solid var(--border-primary);
	}

	.table :global(th) {
		padding: var(--space-md) var(--space-xl);
		text-align: left;
		text-transform: uppercase;
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: 0.05em;
		color: var(--text-secondary);
	}

	.table :global(td) {
		padding: var(--space-lg) var(--space-xl);
		font-size: var(--font-size-sm);
		color: var(--text-primary);
	}

	.table[data-compact="true"] :global(th),
	.table[data-compact="true"] :global(td) {
		padding: var(--space-sm) var(--space-md);
	}
</style>
