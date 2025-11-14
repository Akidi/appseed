<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Table from './Table.svelte';
	import {Badge, Button} from '$lib/components/ui';

	/**
	 * Table component for displaying tabular data.
	 * Supports striped rows, hover effects, and responsive design.
	 */
	const { Story } = defineMeta({
		component: Table,
		title: 'UI/Table',
		tags: ['autodocs'],
		args: {
			striped: false,
			hover: true,
			bordered: false,
			compact: false
		},
		argTypes: {
			striped: { control: 'boolean' },
			hover: { control: 'boolean' },
			bordered: { control: 'boolean' },
			compact: { control: 'boolean' }
		}
	});
</script>

<Story name="Basic">
	{#snippet template()}
		<Table>
			{#snippet head()}
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Role</th>
				</tr>
			{/snippet}
			
			<tr>
				<td>John Doe</td>
				<td>john@example.com</td>
				<td>Admin</td>
			</tr>
			<tr>
				<td>Jane Smith</td>
				<td>jane@example.com</td>
				<td>Editor</td>
			</tr>
			<tr>
				<td>Bob Johnson</td>
				<td>bob@example.com</td>
				<td>Viewer</td>
			</tr>
		</Table>
	{/snippet}
</Story>

<Story name="Striped">
	{#snippet template()}
		<Table striped>
			{#snippet head()}
				<tr>
					<th>Product</th>
					<th>SKU</th>
					<th>Price</th>
					<th>Stock</th>
				</tr>
			{/snippet}
			
			<tr>
				<td>Wireless Mouse</td>
				<td>WM-001</td>
				<td>$29.99</td>
				<td>45</td>
			</tr>
			<tr>
				<td>Keyboard</td>
				<td>KB-002</td>
				<td>$79.99</td>
				<td>23</td>
			</tr>
			<tr>
				<td>Monitor</td>
				<td>MN-003</td>
				<td>$299.99</td>
				<td>12</td>
			</tr>
			<tr>
				<td>Webcam</td>
				<td>WC-004</td>
				<td>$49.99</td>
				<td>67</td>
			</tr>
		</Table>
	{/snippet}
</Story>

<Story name="With Caption">
	{#snippet template()}
		<Table caption="Product Inventory" striped>
			{#snippet head()}
				<tr>
					<th>Product</th>
					<th>Category</th>
					<th>Status</th>
				</tr>
			{/snippet}
			
			<tr>
				<td>Laptop</td>
				<td>Electronics</td>
				<td><Badge text="In Stock" variant="green" size="sm" /></td>
			</tr>
			<tr>
				<td>T-Shirt</td>
				<td>Clothing</td>
				<td><Badge text="Low Stock" variant="amber" size="sm" /></td>
			</tr>
			<tr>
				<td>Coffee Maker</td>
				<td>Appliances</td>
				<td><Badge text="Out of Stock" variant="red" size="sm" /></td>
			</tr>
		</Table>
	{/snippet}
</Story>

<Story name="With Footer">
	{#snippet template()}
		<Table striped>
			{#snippet head()}
				<tr>
					<th>Item</th>
					<th>Quantity</th>
					<th>Price</th>
					<th>Total</th>
				</tr>
			{/snippet}
			
			<tr>
				<td>Product A</td>
				<td>2</td>
				<td>$25.00</td>
				<td>$50.00</td>
			</tr>
			<tr>
				<td>Product B</td>
				<td>1</td>
				<td>$40.00</td>
				<td>$40.00</td>
			</tr>
			<tr>
				<td>Product C</td>
				<td>3</td>
				<td>$15.00</td>
				<td>$45.00</td>
			</tr>

			{#snippet foot()}
				<tr>
					<td colspan="3" style="text-align: right; font-weight: 600;">Total:</td>
					<td style="font-weight: 600;">$135.00</td>
				</tr>
			{/snippet}
		</Table>
	{/snippet}
</Story>

<Story name="Compact">
	{#snippet template()}
		<Table compact striped>
			{#snippet head()}
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Status</th>
				</tr>
			{/snippet}
			
			<tr>
				<td>001</td>
				<td>Item 1</td>
				<td><Badge text="Active" variant="green" size="sm" /></td>
			</tr>
			<tr>
				<td>002</td>
				<td>Item 2</td>
				<td><Badge text="Pending" variant="amber" size="sm" /></td>
			</tr>
			<tr>
				<td>003</td>
				<td>Item 3</td>
				<td><Badge text="Active" variant="green" size="sm" /></td>
			</tr>
		</Table>
	{/snippet}
</Story>

<Story name="With Actions">
	{#snippet template()}
		<Table hover>
			{#snippet head()}
				<tr>
					<th>Product</th>
					<th>SKU</th>
					<th>Stock</th>
					<th>Actions</th>
				</tr>
			{/snippet}
			
			<tr>
				<td>Wireless Mouse</td>
				<td>WM-001</td>
				<td>45</td>
				<td>
					<div style="display: flex; gap: 0.5rem;">
						<Button size="sm" variant="ghost">Edit</Button>
						<Button size="sm" variant="ghost">Delete</Button>
					</div>
				</td>
			</tr>
			<tr>
				<td>Keyboard</td>
				<td>KB-002</td>
				<td>23</td>
				<td>
					<div style="display: flex; gap: 0.5rem;">
						<Button size="sm" variant="ghost">Edit</Button>
						<Button size="sm" variant="ghost">Delete</Button>
					</div>
				</td>
			</tr>
			<tr>
				<td>Monitor</td>
				<td>MN-003</td>
				<td>12</td>
				<td>
					<div style="display: flex; gap: 0.5rem;">
						<Button size="sm" variant="ghost">Edit</Button>
						<Button size="sm" variant="ghost">Delete</Button>
					</div>
				</td>
			</tr>
		</Table>
	{/snippet}
</Story>

<Story name="Complex Data">
	{#snippet template()}
		<Table striped hover>
			{#snippet head()}
				<tr>
					<th>Product</th>
					<th>Category</th>
					<th>Price</th>
					<th>Stock</th>
					<th>Status</th>
					<th>Actions</th>
				</tr>
			{/snippet}
			
			<tr>
				<td>
					<div style="font-weight: 600;">Wireless Mouse</div>
					<div style="font-size: 0.75rem; color: #6b7280;">Ergonomic design</div>
				</td>
				<td>Electronics</td>
				<td>$29.99</td>
				<td>45</td>
				<td><Badge text="In Stock" variant="green" size="sm" /></td>
				<td>
					<Button size="sm" variant="ghost">View</Button>
				</td>
			</tr>
			<tr>
				<td>
					<div style="font-weight: 600;">Mechanical Keyboard</div>
					<div style="font-size: 0.75rem; color: #6b7280;">RGB backlight</div>
				</td>
				<td>Electronics</td>
				<td>$129.99</td>
				<td>8</td>
				<td><Badge text="Low Stock" variant="amber" size="sm" /></td>
				<td>
					<Button size="sm" variant="ghost">View</Button>
				</td>
			</tr>
			<tr>
				<td>
					<div style="font-weight: 600;">4K Monitor</div>
					<div style="font-size: 0.75rem; color: #6b7280;">27-inch display</div>
				</td>
				<td>Electronics</td>
				<td>$399.99</td>
				<td>0</td>
				<td><Badge text="Out of Stock" variant="red" size="sm" /></td>
				<td>
					<Button size="sm" variant="ghost">View</Button>
				</td>
			</tr>
		</Table>
	{/snippet}
</Story>

<Story name="Empty State">
	{#snippet template()}
		<Table>
			{#snippet head()}
				<tr>
					<th>Product</th>
					<th>SKU</th>
					<th>Price</th>
					<th>Stock</th>
				</tr>
			{/snippet}
			
			<tr>
				<td colspan="4" style="text-align: center; padding: 3rem; color: #6b7280;">
					<div>
						<svg style="margin: 0 auto 1rem; width: 3rem; height: 3rem; color: #d1d5db;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
						</svg>
						<div style="font-weight: 600; margin-bottom: 0.25rem;">No products found</div>
						<div style="font-size: 0.875rem;">Add your first product to get started</div>
					</div>
				</td>
			</tr>
		</Table>
	{/snippet}
</Story>