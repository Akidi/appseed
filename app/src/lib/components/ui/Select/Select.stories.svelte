<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Select from './Select.svelte';

	const { Story } = defineMeta({
		component: Select,
		title: 'UI/Select',
		tags: ['autodocs'],
		argTypes: {
			required: { control: 'boolean' },
			disabled: { control: 'boolean' }
		},
		args: {
			id: 'select',
			name: 'select',
			label: 'Label',
			required: false,
			disabled: false
		}
	});
</script>

<Story name="Basic" args={{ id: 'basic', name: 'basic', label: 'Choose an option' }}>
	<option value="option1">Option 1</option>
	<option value="option2">Option 2</option>
	<option value="option3">Option 3</option>
</Story>

<Story name="With Placeholder" args={{ 
	id: 'placeholder', 
	name: 'placeholder', 
	label: 'Country',
	placeholder: 'Select a country...'
}}>
	<option value="us">United States</option>
	<option value="uk">United Kingdom</option>
	<option value="ca">Canada</option>
	<option value="au">Australia</option>
</Story>

<Story name="Required" args={{ 
	id: 'required', 
	name: 'required', 
	label: 'Required Field',
	required: true
}}>
	<option value="1">Option 1</option>
	<option value="2">Option 2</option>
</Story>

<Story name="With Help Text" args={{ 
	id: 'help', 
	name: 'help', 
	label: 'Category',
	helpText: 'Choose the primary category'
}}>
	<option value="electronics">Electronics</option>
	<option value="clothing">Clothing</option>
	<option value="food">Food</option>
</Story>

<Story name="With Error" args={{ 
	id: 'error', 
	name: 'error', 
	label: 'Store',
	error: 'Please select a store'
}}>
	<option value="store1">Store 1</option>
	<option value="store2">Store 2</option>
</Story>

<Story name="Disabled" args={{ 
	id: 'disabled', 
	name: 'disabled', 
	label: 'Disabled Select',
	disabled: true,
	value: 'option1'
}}>
	<option value="option1">Option 1</option>
	<option value="option2">Option 2</option>
</Story>

<Story name="With Grouped Options" args={{ 
	id: 'grouped', 
	name: 'grouped', 
	label: 'Product'
}}>
	<optgroup label="Electronics">
		<option value="laptop">Laptop</option>
		<option value="phone">Phone</option>
		<option value="tablet">Tablet</option>
	</optgroup>
	<optgroup label="Clothing">
		<option value="shirt">Shirt</option>
		<option value="pants">Pants</option>
		<option value="shoes">Shoes</option>
	</optgroup>
</Story>