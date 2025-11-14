<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Card from './Card.svelte';
	import {Button, Badge} from '$lib/components/ui';

	const onClickFn = fn().mockName('onClick');

	/**
	 * Card component for grouping related content.
	 * Supports headers, footers, and different padding options.
	 */
	const { Story } = defineMeta({
		component: Card,
		title: 'UI/Card',
		tags: ['autodocs'],
		args: {
			padding: 'md',
			hoverable: false,
			clickable: false
		},
		argTypes: {
			padding: {
				control: 'select',
				options: ['none', 'sm', 'md', 'lg']
			},
			hoverable: { control: 'boolean' },
			clickable: { control: 'boolean' }
		}
	});
</script>

<Story name="Basic">
	{#snippet template()}
		<Card>
			<p>This is a basic card with default padding.</p>
		</Card>
	{/snippet}
</Story>

<Story name="With Title">
	{#snippet template()}
		<Card title="Card Title">
			<p>This card has a title in the header.</p>
		</Card>
	{/snippet}
</Story>

<Story name="With Title and Subtitle">
	{#snippet template()}
		<Card title="Product Details" subtitle="View and manage product information">
			<p>Card content goes here.</p>
		</Card>
	{/snippet}
</Story>

<Story name="With Custom Header">
	{#snippet template()}
		<Card>
			{#snippet header()}
				<div style="display: flex; justify-content: space-between; align-items: center;">
					<div>
						<h3 style="font-size: 1.125rem; font-weight: 600;">Custom Header</h3>
						<p style="font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem;">With custom content</p>
					</div>
					<Badge text="New" variant="blue" size="sm" />
				</div>
			{/snippet}
			<p>Card content with custom header.</p>
		</Card>
	{/snippet}
</Story>

<Story name="With Footer">
	{#snippet template()}
		<Card title="Confirmation">
			<p>Are you sure you want to proceed with this action?</p>
			{#snippet footer()}
				<div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
					<Button variant="secondary" size="sm">Cancel</Button>
					<Button variant="primary" size="sm">Confirm</Button>
				</div>
			{/snippet}
		</Card>
	{/snippet}
</Story>

<Story name="Hoverable">
	{#snippet template()}
		<Card title="Hoverable Card" hoverable>
			<p>Hover over this card to see the shadow effect.</p>
		</Card>
	{/snippet}
</Story>

<Story name="Clickable">
	{#snippet template()}
		<Card title="Clickable Card" clickable onclick={onClickFn}>
			<p>Click anywhere on this card to trigger an action.</p>
		</Card>
	{/snippet}
</Story>

<Story name="Different Padding">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<Card title="No Padding" padding="none">
				<div style="background: #f3f4f6; padding: 1rem;">Content with no card padding</div>
			</Card>
			<Card title="Small Padding" padding="sm">
				<p>Card with small padding.</p>
			</Card>
			<Card title="Medium Padding" padding="md">
				<p>Card with medium padding (default).</p>
			</Card>
			<Card title="Large Padding" padding="lg">
				<p>Card with large padding.</p>
			</Card>
		</div>
	{/snippet}
</Story>

<Story name="Product Card">
	{#snippet template()}
		<div style="max-width: 320px;">
			<Card padding="none" hoverable>
				<div style="aspect-ratio: 16/9; background: #f3f4f6; display: flex; align-items: center; justify-content: center; color: #9ca3af;">
					Product Image
				</div>
				<div style="padding: 1rem;">
					<div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
						<h3 style="font-weight: 600;">Wireless Mouse</h3>
						<Badge text="In Stock" variant="green" size="sm" />
					</div>
					<p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 1rem;">
						Ergonomic wireless mouse with precision tracking
					</p>
					<div style="display: flex; justify-content: space-between; align-items: center;">
						<span style="font-size: 1.25rem; font-weight: 700;">$29.99</span>
						<Button size="sm">Add to Cart</Button>
					</div>
				</div>
			</Card>
		</div>
	{/snippet}
</Story>

<Story name="Stats Card">
	{#snippet template()}
		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
			<Card>
				<div>
					<p style="font-size: 0.875rem; color: #6b7280;">Total Products</p>
					<p style="font-size: 2rem; font-weight: 700; margin-top: 0.5rem;">1,234</p>
					<p style="font-size: 0.75rem; color: #059669; margin-top: 0.25rem;">↑ 12% from last month</p>
				</div>
			</Card>
			<Card>
				<div>
					<p style="font-size: 0.875rem; color: #6b7280;">Revenue</p>
					<p style="font-size: 2rem; font-weight: 700; margin-top: 0.5rem;">$45,678</p>
					<p style="font-size: 0.75rem; color: #059669; margin-top: 0.25rem;">↑ 8% from last month</p>
				</div>
			</Card>
			<Card>
				<div>
					<p style="font-size: 0.875rem; color: #6b7280;">Orders</p>
					<p style="font-size: 2rem; font-weight: 700; margin-top: 0.5rem;">567</p>
					<p style="font-size: 0.75rem; color: #dc2626; margin-top: 0.25rem;">↓ 3% from last month</p>
				</div>
			</Card>
		</div>
	{/snippet}
</Story>

<Story name="Use Cases">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 2rem;">
			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">Profile Card</h3>
				<Card>
					{#snippet header()}
						<div style="display: flex; gap: 1rem; align-items: center;">
							<div style="width: 3rem; height: 3rem; border-radius: 9999px; background: #3b82f6; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600;">
								JD
							</div>
							<div>
								<div style="font-weight: 600;">John Doe</div>
								<div style="font-size: 0.875rem; color: #6b7280;">john@example.com</div>
							</div>
						</div>
					{/snippet}
					<div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem;">
						<div><span style="font-weight: 600;">Role:</span> Administrator</div>
						<div><span style="font-weight: 600;">Department:</span> Engineering</div>
						<div><span style="font-weight: 600;">Location:</span> San Francisco, CA</div>
					</div>
					{#snippet footer()}
						<Button size="sm" variant="ghost" fullWidth>View Full Profile</Button>
					{/snippet}
				</Card>
			</div>

			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">Activity Card</h3>
				<Card title="Recent Activity" subtitle="Last 7 days">
					<div style="display: flex; flex-direction: column; gap: 1rem;">
						<div style="display: flex; gap: 1rem;">
							<div style="width: 2rem; height: 2rem; border-radius: 9999px; background: #dbeafe; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
								<svg style="width: 1rem; height: 1rem; color: #3b82f6;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
								</svg>
							</div>
							<div style="flex: 1;">
								<p style="font-size: 0.875rem; font-weight: 600;">Added new product</p>
								<p style="font-size: 0.75rem; color: #6b7280;">Wireless Mouse - 2 hours ago</p>
							</div>
						</div>
						<div style="display: flex; gap: 1rem;">
							<div style="width: 2rem; height: 2rem; border-radius: 9999px; background: #dcfce7; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
								<svg style="width: 1rem; height: 1rem; color: #16a34a;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<div style="flex: 1;">
								<p style="font-size: 0.875rem; font-weight: 600;">Updated inventory</p>
								<p style="font-size: 0.75rem; color: #6b7280;">Stock levels adjusted - 5 hours ago</p>
							</div>
						</div>
						<div style="display: flex; gap: 1rem;">
							<div style="width: 2rem; height: 2rem; border-radius: 9999px; background: #fef3c7; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
								<svg style="width: 1rem; height: 1rem; color: #d97706;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
								</svg>
							</div>
							<div style="flex: 1;">
								<p style="font-size: 0.875rem; font-weight: 600;">Low stock alert</p>
								<p style="font-size: 0.75rem; color: #6b7280;">Keyboard running low - Yesterday</p>
							</div>
						</div>
					</div>
				</Card>
			</div>

			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">Settings Card</h3>
				<Card title="Notification Settings">
					<div style="display: flex; flex-direction: column; gap: 1rem;">
						<div style="display: flex; justify-content: space-between; align-items: center;">
							<div>
								<p style="font-weight: 600;">Email Notifications</p>
								<p style="font-size: 0.875rem; color: #6b7280;">Receive email updates</p>
							</div>
							<input type="checkbox" checked style="width: 2.5rem; height: 1.5rem;" />
						</div>
						<div style="display: flex; justify-content: space-between; align-items: center;">
							<div>
								<p style="font-weight: 600;">Push Notifications</p>
								<p style="font-size: 0.875rem; color: #6b7280;">Receive push notifications</p>
							</div>
							<input type="checkbox" style="width: 2.5rem; height: 1.5rem;" />
						</div>
					</div>
					{#snippet footer()}
						<div style="display: flex; justify-content: flex-end;">
							<Button size="sm" variant="primary">Save Changes</Button>
						</div>
					{/snippet}
				</Card>
			</div>
		</div>
	{/snippet}
</Story>