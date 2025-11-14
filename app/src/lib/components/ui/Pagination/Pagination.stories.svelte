<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Pagination from './Pagination.svelte';

	const onPageChangeFn = fn().mockName('onPageChange');

	/**
	 * Pagination component for navigating through pages of content.
	 * Automatically handles ellipsis for large page counts.
	 */
	const { Story } = defineMeta({
		component: Pagination,
		title: 'UI/Pagination',
		tags: ['autodocs'],
		args: {
			currentPage: 1,
			totalPages: 10,
			showFirstLast: true,
			maxVisible: 7
		},
		argTypes: {
			currentPage: { control: 'number' },
			totalPages: { control: 'number' },
			showFirstLast: { control: 'boolean' },
			maxVisible: { control: 'number' }
		}
	});
</script>

<script>
	let page1 = $state(1);
	let page2 = $state(5);
	let page3 = $state(1);
	let page4 = $state(1);
</script>

<Story name="Basic">
	{#snippet template()}
		<Pagination
			currentPage={page1}
			totalPages={10}
			onPageChange={(p) => {
				page1 = p;
				onPageChangeFn(p);
			}}
		/>
		<p style="margin-top: 1rem; text-align: center; font-size: 0.875rem;">
			Current Page: {page1}
		</p>
	{/snippet}
</Story>

<Story name="Few Pages">
	{#snippet template()}
		<Pagination
			currentPage={page3}
			totalPages={5}
			onPageChange={(p) => page3 = p}
		/>
		<p style="margin-top: 1rem; text-align: center; font-size: 0.875rem;">
			Current Page: {page3} of 5
		</p>
	{/snippet}
</Story>

<Story name="Many Pages">
	{#snippet template()}
		<Pagination
			currentPage={page2}
			totalPages={50}
			onPageChange={(p) => page2 = p}
		/>
		<p style="margin-top: 1rem; text-align: center; font-size: 0.875rem;">
			Current Page: {page2} of 50
		</p>
	{/snippet}
</Story>

<Story name="Without First/Last">
	{#snippet template()}
		<Pagination
			currentPage={page4}
			totalPages={20}
			showFirstLast={false}
			onPageChange={(p) => page4 = p}
		/>
	{/snippet}
</Story>

<Story name="Custom Max Visible">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 2rem;">
			<div>
				<p style="margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 600;">Max 5 visible</p>
				<Pagination
					currentPage={5}
					totalPages={20}
					maxVisible={5}
					onPageChange={onPageChangeFn}
				/>
			</div>
			<div>
				<p style="margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 600;">Max 7 visible (default)</p>
				<Pagination
					currentPage={5}
					totalPages={20}
					maxVisible={7}
					onPageChange={onPageChangeFn}
				/>
			</div>
			<div>
				<p style="margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 600;">Max 9 visible</p>
				<Pagination
					currentPage={5}
					totalPages={20}
					maxVisible={9}
					onPageChange={onPageChangeFn}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="With Table">
	{#snippet template()}
		<div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; overflow: hidden;">
			<table style="width: 100%; border-collapse: collapse;">
				<thead style="background: #f9fafb;">
					<tr>
						<th style="padding: 0.75rem; text-align: left; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: #6b7280;">ID</th>
						<th style="padding: 0.75rem; text-align: left; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: #6b7280;">Name</th>
						<th style="padding: 0.75rem; text-align: left; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: #6b7280;">Status</th>
					</tr>
				</thead>
				<tbody>
					{#each Array(10) as _, i}
						<tr style="border-top: 1px solid #e5e7eb;">
							<td style="padding: 1rem;">{(page1 - 1) * 10 + i + 1}</td>
							<td style="padding: 1rem;">Item {(page1 - 1) * 10 + i + 1}</td>
							<td style="padding: 1rem;">Active</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<div style="padding: 1rem; border-top: 1px solid #e5e7eb; background: #f9fafb;">
				<Pagination
					currentPage={page1}
					totalPages={10}
					onPageChange={(p) => page1 = p}
				/>
			</div>
		</div>
	{/snippet}
</Story>