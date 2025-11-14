<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TextInput from './TextInput.svelte';

	const { Story } = defineMeta({
		component: TextInput,
		title: 'UI/TextInput',
		tags: ['autodocs'],
		argTypes: {
			type: {
				control: 'select',
				options: ['text', 'email', 'password', 'number', 'tel', 'url']
			},
			required: { control: 'boolean' },
			disabled: { control: 'boolean' },
			readonly: { control: 'boolean' }
		},
		args: {
			id: 'input',
			name: 'input',
			label: 'Label',
			type: 'text',
			required: false,
			disabled: false,
			readonly: false
		}
	});
</script>

<Story name="Basic" args={{ id: 'basic', name: 'basic', label: 'Basic Input' }} />

<Story name="With Placeholder" args={{ 
	id: 'placeholder', 
	name: 'placeholder', 
	label: 'With Placeholder',
	placeholder: 'Enter some text...'
}} />

<Story name="Required" args={{ 
	id: 'required', 
	name: 'required', 
	label: 'Required Field',
	required: true
}} />

<Story name="With Help Text" args={{ 
	id: 'help', 
	name: 'help', 
	label: 'Username',
	helpText: 'Choose a unique username'
}} />

<Story name="With Error" args={{ 
	id: 'error', 
	name: 'error', 
	label: 'Email',
	error: 'Please enter a valid email address',
	value: 'invalid'
}} />

<Story name="Email Type" args={{ 
	id: 'email', 
	name: 'email', 
	label: 'Email Address',
	type: 'email',
	inputmode: 'email',
	placeholder: 'you@example.com'
}} />

<Story name="Password" args={{ 
	id: 'password', 
	name: 'password', 
	label: 'Password',
	type: 'password'
}} />

<Story name="Number" args={{ 
	id: 'number', 
	name: 'number', 
	label: 'Age',
	type: 'number',
	inputmode: 'numeric',
	min: 0,
	max: 120
}} />

<Story name="With Pattern" args={{ 
	id: 'pattern', 
	name: 'pattern', 
	label: 'Phone Number',
	pattern: '\\d{3}-\\d{3}-\\d{4}',
	patternError: 'Please use format: 123-456-7890',
	placeholder: '123-456-7890',
}} />

<Story name="With Max Length" args={{ 
	id: 'maxlength', 
	name: 'maxlength', 
	label: 'Username',
	maxlength: 20,
	helpText: 'Maximum 20 characters'
}} />

<Story name="Disabled" args={{ 
	id: 'disabled', 
	name: 'disabled', 
	label: 'Disabled Input',
	disabled: true,
	value: 'Cannot edit this'
}} />

<Story name="Read Only" args={{ 
	id: 'readonly', 
	name: 'readonly', 
	label: 'Read Only',
	readonly: true,
	value: 'Read only value'
}} />