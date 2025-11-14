<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Checkbox from './Checkbox.svelte';

	const { Story } = defineMeta({
		component: Checkbox,
		title: 'UI/Checkbox',
		tags: ['autodocs'],
		argTypes: {
			required: { control: 'boolean' },
			disabled: { control: 'boolean' },
			indeterminate: { control: 'boolean' },
			checked: { control: 'boolean' }
		},
		args: {
			id: 'checkbox',
			name: 'checkbox',
			label: 'Checkbox Label',
			required: false,
			disabled: false,
			indeterminate: false,
			checked: false
		}
	});
</script>

<Story name="Basic" args={{ 
	id: 'basic', 
	name: 'basic', 
	label: 'Accept terms and conditions'
}} />

<Story name="Checked" args={{ 
	id: 'checked', 
	name: 'checked', 
	label: 'Checked by default',
	checked: true
}} />

<Story name="Required" args={{ 
	id: 'required', 
	name: 'required', 
	label: 'I agree to the terms',
	required: true
}} />

<Story name="With Help Text" args={{ 
	id: 'newsletter', 
	name: 'newsletter', 
	label: 'Subscribe to newsletter',
	helpText: "We'll send you updates about new products"
}} />

<Story name="With Error" args={{ 
	id: 'error', 
	name: 'error', 
	label: 'Accept privacy policy',
	required: true,
	error: 'You must accept the privacy policy to continue'
}} />

<Story name="Disabled Unchecked" args={{ 
	id: 'disabled-unchecked', 
	name: 'disabled-unchecked', 
	label: 'Disabled (unchecked)',
	disabled: true,
	checked: false
}} />

<Story name="Disabled Checked" args={{ 
	id: 'disabled-checked', 
	name: 'disabled-checked', 
	label: 'Disabled (checked)',
	disabled: true,
	checked: true
}} />

<Story name="Indeterminate" args={{ 
	id: 'indeterminate', 
	name: 'indeterminate', 
	label: 'Select all items',
	indeterminate: true
}} />

<Story name="Long Label" args={{ 
	id: 'long', 
	name: 'long', 
	label: 'I have read and agree to the Terms of Service, Privacy Policy, and Cookie Policy. I understand that by checking this box, I am providing my consent to the processing of my personal data.'
}} />

<Story name="Multiple Checkboxes">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<Checkbox
				id="email"
				name="notifications"
				label="Email notifications"
				value="email"
			/>
			<Checkbox
				id="sms"
				name="notifications"
				label="SMS notifications"
				value="sms"
			/>
			<Checkbox
				id="push"
				name="notifications"
				label="Push notifications"
				value="push"
			/>
		</div>
	{/snippet}
</Story>