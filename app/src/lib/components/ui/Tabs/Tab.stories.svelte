<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Tabs from './Tabs.svelte';
	import TabList from './TabList.svelte';
	import Tab from './Tab.svelte';
	import TabPanel from './TabPanel.svelte';
	import {Card} from '$lib/components/ui';

	const onTabChangeFn = fn().mockName('onTabChange');

	/**
	 * Tabs component for organizing content into separate views.
	 * Fully accessible with keyboard navigation and ARIA attributes.
	 */
	const { Story } = defineMeta({
		component: Tabs,
		title: 'UI/Tabs',
		tags: ['autodocs']
	});
</script>

<script>
	let activeTab = $state('tab1');
	let productTab = $state('details');
</script>

<Story name="Basic">
	{#snippet template()}
		<Tabs bind:activeTab onTabChange={onTabChangeFn}>
			<TabList>
				<Tab id="tab1" label="Tab 1" />
				<Tab id="tab2" label="Tab 2" />
				<Tab id="tab3" label="Tab 3" />
			</TabList>

			<TabPanel id="tab1">
				<p>Content for Tab 1</p>
			</TabPanel>
			<TabPanel id="tab2">
				<p>Content for Tab 2</p>
			</TabPanel>
			<TabPanel id="tab3">
				<p>Content for Tab 3</p>
			</TabPanel>
		</Tabs>
	{/snippet}
</Story>

<Story name="With Disabled Tab">
	{#snippet template()}
		<Tabs>
			<TabList>
				<Tab id="enabled1" label="Enabled" />
				<Tab id="disabled" label="Disabled" disabled />
				<Tab id="enabled2" label="Also Enabled" />
			</TabList>

			<TabPanel id="enabled1">
				<p>First enabled tab content</p>
			</TabPanel>
			<TabPanel id="disabled">
				<p>This content won't be shown</p>
			</TabPanel>
			<TabPanel id="enabled2">
				<p>Second enabled tab content</p>
			</TabPanel>
		</Tabs>
	{/snippet}
</Story>

<Story name="Product Details">
	{#snippet template()}
		<Tabs bind:activeTab={productTab}>
			<TabList>
				<Tab id="details" label="Details" />
				<Tab id="inventory" label="Inventory" />
				<Tab id="pricing" label="Pricing" />
				<Tab id="history" label="History" />
			</TabList>

			<TabPanel id="details">
				<Card title="Product Details" padding="md">
					<div style="display: grid; grid-cols-2; gap: 1rem;">
						<div>
							<p style="font-size: 0.875rem; color: #6b7280;">Product Name</p>
							<p style="font-weight: 600;">Wireless Mouse</p>
						</div>
						<div>
							<p style="font-size: 0.875rem; color: #6b7280;">SKU</p>
							<p style="font-weight: 600;">WM-001</p>
						</div>
						<div>
							<p style="font-size: 0.875rem; color: #6b7280;">Category</p>
							<p style="font-weight: 600;">Electronics</p>
						</div>
						<div>
							<p style="font-size: 0.875rem; color: #6b7280;">Brand</p>
							<p style="font-weight: 600;">TechCo</p>
						</div>
					</div>
				</Card>
			</TabPanel>

			<TabPanel id="inventory">
				<Card title="Inventory Status" padding="md">
					<div style="display: flex; flex-direction: column; gap: 1rem;">
						<div>
							<p style="font-size: 0.875rem; color: #6b7280;">Current Stock</p>
							<p style="font-size: 2rem; font-weight: 700;">156</p>
						</div>
						<div>
							<p style="font-size: 0.875rem; color: #6b7280;">Low Stock Threshold</p>
							<p style="font-weight: 600;">20 units</p>
						</div>
						<div>
							<p style="font-size: 0.875rem; color: #6b7280;">Reorder Point</p>
							<p style="font-weight: 600;">50 units</p>
						</div>
					</div>
				</Card>
			</TabPanel>

			<TabPanel id="pricing">
				<Card title="Pricing Information" padding="md">
					<div style="display: grid; grid-cols-3; gap: 1rem;">
						<div>
							<p style="font-size: 0.875rem; color: #6b7280;">Price</p>
							<p style="font-size: 1.5rem; font-weight: 700;">$29.99</p>
						</div>
						<div>
							<p style="font-size: 0.875rem; color: #6b7280;">MSRP</p>
							<p style="font-size: 1.5rem; font-weight: 700;">$39.99</p>
						</div>
						<div>
							<p style="font-size: 0.875rem; color: #6b7280;">Cost</p>
							<p style="font-size: 1.5rem; font-weight: 700;">$15.00</p>
						</div>
					</div>
				</Card>
			</TabPanel>

			<TabPanel id="history">
				<Card title="Activity History" padding="md">
					<div style="display: flex; flex-direction: column; gap: 1rem;">
						<div style="padding-bottom: 1rem; border-bottom: 1px solid #e5e7eb;">
							<p style="font-size: 0.875rem; font-weight: 600;">Stock updated</p>
							<p style="font-size: 0.75rem; color: #6b7280;">2 hours ago - Added 50 units</p>
						</div>
						<div style="padding-bottom: 1rem; border-bottom: 1px solid #e5e7eb;">
							<p style="font-size: 0.875rem; font-weight: 600;">Price changed</p>
							<p style="font-size: 0.75rem; color: #6b7280;">Yesterday - $29.99 → $27.99</p>
						</div>
						<div>
							<p style="font-size: 0.875rem; font-weight: 600;">Product created</p>
							<p style="font-size: 0.75rem; color: #6b7280;">Last week</p>
						</div>
					</div>
				</Card>
			</TabPanel>
		</Tabs>
		<p style="margin-top: 1rem; font-size: 0.875rem;">Active Tab: {productTab}</p>
	{/snippet}
</Story>

<Story name="Settings Page">
	{#snippet template()}
		<Tabs>
			<TabList>
				<Tab id="general" label="General" />
				<Tab id="security" label="Security" />
				<Tab id="notifications" label="Notifications" />
				<Tab id="billing" label="Billing" />
			</TabList>

			<TabPanel id="general">
				<div style="max-width: 600px;">
					<h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem;">General Settings</h3>
					<p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 1.5rem;">
						Manage your account preferences and personal information.
					</p>
					<div style="display: flex; flex-direction: column; gap: 1rem;">
						<div>
							<label for="name" style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.25rem;">Display Name</label>
							<input id="name" type="text" value="John Doe" style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" />
						</div>
						<div>
							<label for="email" style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.25rem;">Email</label>
							<input id="email" type="email" value="john@example.com" style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" />
						</div>
					</div>
				</div>
			</TabPanel>

			<TabPanel id="security">
				<div style="max-width: 600px;">
					<h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem;">Security Settings</h3>
					<p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 1.5rem;">
						Manage your password and security preferences.
					</p>
					<div style="display: flex; flex-direction: column; gap: 1.5rem;">
						<div>
							<h4 style="font-weight: 600; margin-bottom: 0.5rem;">Change Password</h4>
							<button type="button" style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border-radius: 0.375rem; font-size: 0.875rem;">
								Update Password
							</button>
						</div>
						<div>
							<h4 style="font-weight: 600; margin-bottom: 0.5rem;">Two-Factor Authentication</h4>
							<p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem;">Not enabled</p>
							<button type="button" style="padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.875rem;">
								Enable 2FA
							</button>
						</div>
					</div>
				</div>
			</TabPanel>

			<TabPanel id="notifications">
				<div style="max-width: 600px;">
					<h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem;">Notification Preferences</h3>
					<p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 1.5rem;">
						Choose how you want to receive notifications.
					</p>
					<div style="display: flex; flex-direction: column; gap: 1rem;">
						<label style="display: flex; align-items: center; gap: 0.5rem;">
							<input type="checkbox" checked />
							<span style="font-size: 0.875rem;">Email notifications</span>
						</label>
						<label style="display: flex; align-items: center; gap: 0.5rem;">
							<input type="checkbox" />
							<span style="font-size: 0.875rem;">SMS notifications</span>
						</label>
						<label style="display: flex; align-items: center; gap: 0.5rem;">
							<input type="checkbox" checked />
							<span style="font-size: 0.875rem;">Push notifications</span>
						</label>
					</div>
				</div>
			</TabPanel>

			<TabPanel id="billing">
				<div style="max-width: 600px;">
					<h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem;">Billing Information</h3>
					<p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 1.5rem;">
						Manage your subscription and payment methods.
					</p>
					<div style="padding: 1rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
						<p style="font-size: 0.875rem; font-weight: 600;">Current Plan: Pro</p>
						<p style="font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem;">$29/month • Renews on Jan 15, 2025</p>
					</div>
				</div>
			</TabPanel>
		</Tabs>
	{/snippet}
</Story>