<script lang="ts" context="module">
	import type { Meta } from '@storybook/svelte';
	import Form from './Form.svelte';

	export const meta: Meta<typeof Form> = {
		title: 'UI/Form',
		component: Form,
		tags: ['autodocs']
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import TextInput from '../TextInput/TextInput.svelte';
	import Textarea from '../Textarea/Textarea.svelte';
	import Button from '../Button/Button.svelte';
	import { Stack } from '$lib/components/layout';

	let formData = $state({ name: '', email: '', message: '' });

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		console.log('Form submitted:', formData);
	}
</script>

<Story name="Default">
	<Form onsubmit={handleSubmit}>
		<Stack gap="md">
			<TextInput
				name="name"
				label="Name"
				bind:value={formData.name}
				required
			/>
			<TextInput
				name="email"
				label="Email"
				type="email"
				bind:value={formData.email}
				required
			/>
			<Textarea
				name="message"
				label="Message"
				bind:value={formData.message}
				rows={4}
			/>
			<Button type="submit">Submit</Button>
		</Stack>
	</Form>
</Story>

<Story name="With Validation">
	<Form>
		<Stack gap="md">
			<TextInput
				name="username"
				label="Username"
				required
				minlength={3}
				pattern="[a-zA-Z0-9]+"
			/>
			<TextInput
				name="password"
				label="Password"
				type="password"
				required
				minlength={8}
			/>
			<Button type="submit">Register</Button>
		</Stack>
	</Form>
</Story>

<Story name="Disabled Form">
	<Form disabled>
		<Stack gap="md">
			<TextInput name="name" label="Name" value="John Doe" />
			<TextInput name="email" label="Email" value="john@example.com" />
			<Button type="submit">Submit</Button>
		</Stack>
	</Form>
</Story>
