<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Alert from './Alert.svelte';

	const onDismissFn = fn().mockName('onDismiss');

	/**
	 * Alert component for displaying important messages and notifications.
	 * Supports different types, optional titles, icons, and dismissal.
	 */
	const { Story } = defineMeta({
		component: Alert,
		title: 'UI/Alert',
		tags: ['autodocs'],
		args: {
			type: 'info',
			dismissible: false,
			icon: true
		},
		argTypes: {
			type: {
				control: 'select',
				options: ['success', 'error', 'warning', 'info']
			},
			dismissible: { control: 'boolean' },
			icon: { control: 'boolean' }
		}
	});
</script>

<Story name="Info" args={{ type: 'info' }}>
	This is an informational alert. It provides helpful context or tips.
</Story>

<Story name="Success" args={{ type: 'success' }}>
	Your changes have been saved successfully!
</Story>

<Story name="Warning" args={{ type: 'warning' }}>
	Please review your changes before continuing.
</Story>

<Story name="Error" args={{ type: 'error' }}>
	There was an error processing your request. Please try again.
</Story>

<Story name="With Title" args={{ type: 'info', title: 'Did you know?' }}>
	You can customize your profile settings in the account menu.
</Story>

<Story name="Without Icon" args={{ type: 'success', icon: false }}>
	Product added to cart successfully!
</Story>

<Story name="Dismissible" args={{ type: 'warning', dismissible: true, onDismiss: onDismissFn }}>
	This alert can be dismissed by clicking the X button.
</Story>

<Story name="All Types">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<Alert type="info">
				This is an informational message.
			</Alert>
			<Alert type="success">
				Operation completed successfully!
			</Alert>
			<Alert type="warning">
				Please proceed with caution.
			</Alert>
			<Alert type="error">
				An error occurred. Please try again.
			</Alert>
		</div>
	{/snippet}
</Story>

<Story name="With Titles">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<Alert type="info" title="Information">
				Here's some helpful information you should know.
			</Alert>
			<Alert type="success" title="Success!">
				Your profile has been updated successfully.
			</Alert>
			<Alert type="warning" title="Warning">
				Your session will expire in 5 minutes.
			</Alert>
			<Alert type="error" title="Error">
				Failed to connect to the server.
			</Alert>
		</div>
	{/snippet}
</Story>

<Story name="Dismissible Alerts">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<Alert type="info" title="Tip" dismissible onDismiss={onDismissFn}>
				You can dismiss this alert when you're done reading.
			</Alert>
			<Alert type="success" dismissible onDismiss={onDismissFn}>
				File uploaded successfully. This message will auto-hide.
			</Alert>
			<Alert type="warning" title="Heads up!" dismissible onDismiss={onDismissFn}>
				Changes you make will affect all users.
			</Alert>
		</div>
	{/snippet}
</Story>

<Story name="Long Content">
	{#snippet template()}
		<Alert type="info" title="Privacy Policy Update">
			<p style="margin-bottom: 0.5rem;">
				We've updated our privacy policy to provide you with more transparency about how we collect, use, and share your data.
			</p>
			<p>
				Please review the changes and contact us if you have any questions or concerns about your privacy.
			</p>
		</Alert>
	{/snippet}
</Story>

<Story name="With Links">
	{#snippet template()}
		<Alert type="warning" title="Action Required">
			<p>
				Your payment method will expire soon. 
				<a href="#payment" style="font-weight: 600; text-decoration: underline;">Update payment method</a>
			</p>
		</Alert>
	{/snippet}
</Story>

<Story name="Use Cases">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 1.5rem;">
			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Form Validation</h3>
				<Alert type="error" title="Form Errors">
					<ul style="list-style: disc; margin-left: 1.25rem; margin-top: 0.25rem;">
						<li>Email address is required</li>
						<li>Password must be at least 8 characters</li>
					</ul>
				</Alert>
			</div>
			
			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Success Messages</h3>
				<Alert type="success" dismissible onDismiss={onDismissFn}>
					Product "Wireless Mouse" has been added to your inventory.
				</Alert>
			</div>
			
			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">System Notifications</h3>
				<Alert type="info" title="Scheduled Maintenance" dismissible onDismiss={onDismissFn}>
					The system will be down for maintenance on Saturday from 2:00 AM to 4:00 AM EST.
				</Alert>
			</div>

			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Warnings</h3>
				<Alert type="warning" title="Low Stock Alert">
					Several products in your inventory are running low. Consider restocking soon.
				</Alert>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Without Icons">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<Alert type="info" icon={false}>
				Minimal info alert without an icon.
			</Alert>
			<Alert type="success" icon={false} title="Success">
				Clean success message.
			</Alert>
		</div>
	{/snippet}
</Story>