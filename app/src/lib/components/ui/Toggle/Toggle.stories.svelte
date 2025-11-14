<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Toggle from './Toggle.svelte';

	const onChangeFn = fn().mockName('onChange');

	/**
	 * Toggle (Switch) component for boolean settings.
	 * Fully accessible alternative to checkboxes for on/off states.
	 */
	const { Story } = defineMeta({
		component: Toggle,
		title: 'UI/Toggle',
		tags: ['autodocs'],
		args: {
			id: 'toggle',
			label: 'Toggle Label',
			checked: false,
			disabled: false,
			size: 'md'
		},
		argTypes: {
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg']
			},
			checked: { control: 'boolean' },
			disabled: { control: 'boolean' }
		}
	});
</script>

<script>
	let enabled = $state(false);
	let notifications = $state(true);
	let darkMode = $state(false);
</script>

<Story name="Basic" args={{ id: 'basic', label: 'Enable feature' }} />

<Story name="Checked" args={{ id: 'checked', label: 'Enable feature', checked: true }} />

<Story name="Disabled" args={{ id: 'disabled', label: 'Disabled toggle', disabled: true }} />

<Story name="Disabled Checked" args={{ id: 'disabled-checked', label: 'Disabled toggle', checked: true, disabled: true }} />

<Story name="Small" args={{ id: 'small', label: 'Small toggle', size: 'sm' }} />

<Story name="Medium" args={{ id: 'medium', label: 'Medium toggle', size: 'md' }} />

<Story name="Large" args={{ id: 'large', label: 'Large toggle', size: 'lg' }} />

<Story name="All Sizes">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<Toggle id="size-sm" label="Small" size="sm" />
			<Toggle id="size-md" label="Medium" size="md" />
			<Toggle id="size-lg" label="Large" size="lg" />
		</div>
	{/snippet}
</Story>

<Story name="Interactive">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<Toggle 
				id="interactive-1" 
				label="Enable notifications" 
				bind:checked={notifications}
				onchange={onChangeFn}
			/>
			<Toggle 
				id="interactive-2" 
				label="Dark mode" 
				bind:checked={darkMode}
				onchange={onChangeFn}
			/>
			<Toggle 
				id="interactive-3" 
				label="Auto-save" 
				bind:checked={enabled}
				onchange={onChangeFn}
			/>
		</div>
		<div style="margin-top: 1rem; padding: 1rem; background: #f9fafb; border-radius: 0.5rem;">
			<p style="font-size: 0.875rem;"><strong>Notifications:</strong> {notifications ? 'On' : 'Off'}</p>
			<p style="font-size: 0.875rem;"><strong>Dark Mode:</strong> {darkMode ? 'On' : 'Off'}</p>
			<p style="font-size: 0.875rem;"><strong>Auto-save:</strong> {enabled ? 'On' : 'Off'}</p>
		</div>
	{/snippet}
</Story>

<Story name="Settings Panel">
	{#snippet template()}
		<div style="max-width: 600px; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
			<h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem;">Preferences</h3>
			
			<div style="display: flex; flex-direction: column; gap: 1.5rem;">
				<div>
					<Toggle id="email-notif" label="Email notifications" bind:checked={notifications} />
					<p style="margin-left: 3.25rem; margin-top: 0.25rem; font-size: 0.75rem; color: #6b7280;">
						Receive email updates about your account
					</p>
				</div>

				<div>
					<Toggle id="dark-mode" label="Dark mode" bind:checked={darkMode} />
					<p style="margin-left: 3.25rem; margin-top: 0.25rem; font-size: 0.75rem; color: #6b7280;">
						Use dark theme throughout the application
					</p>
				</div>

				<div>
					<Toggle id="auto-save" label="Auto-save" bind:checked={enabled} />
					<p style="margin-left: 3.25rem; margin-top: 0.25rem; font-size: 0.75rem; color: #6b7280;">
						Automatically save your changes
					</p>
				</div>

				<div>
					<Toggle id="analytics" label="Analytics" checked={false} disabled />
					<p style="margin-left: 3.25rem; margin-top: 0.25rem; font-size: 0.75rem; color: #6b7280;">
						Share anonymous usage data (Coming soon)
					</p>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Use Cases">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 2rem;">
			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">Feature Flags</h3>
				<div style="display: flex; flex-direction: column; gap: 1rem;">
					<Toggle id="feature-1" label="Enable new dashboard" />
					<Toggle id="feature-2" label="Beta features" />
					<Toggle id="feature-3" label="Experimental mode" />
				</div>
			</div>

			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">Privacy Settings</h3>
				<div style="display: flex; flex-direction: column; gap: 1rem;">
					<Toggle id="privacy-1" label="Profile visibility" checked />
					<Toggle id="privacy-2" label="Show online status" checked />
					<Toggle id="privacy-3" label="Allow search indexing" />
				</div>
			</div>

			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">Product Settings</h3>
				<div style="display: flex; flex-direction: column; gap: 1rem;">
					<Toggle id="product-1" label="Publish to e-commerce" checked />
					<Toggle id="product-2" label="Track inventory" checked />
					<Toggle id="product-3" label="Allow backorders" />
				</div>
			</div>
		</div>
	{/snippet}
</Story>