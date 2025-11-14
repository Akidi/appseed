<script lang="ts" context="module">
	import type { Meta } from '@storybook/svelte';
	import Textarea from './Textarea.svelte';

	export const meta: Meta<typeof Textarea> = {
		title: 'UI/Textarea',
		component: Textarea,
		tags: ['autodocs']
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import { Stack } from '$lib/components/layout';
</script>

<Story name="Default">
	<Textarea name="message" label="Message" />
</Story>

<Story name="With Placeholder">
	<Textarea
		name="bio"
		label="Bio"
		placeholder="Tell us about yourself..."
	/>
</Story>

<Story name="With Value">
	<Textarea
		name="description"
		label="Description"
		value="This is a pre-filled textarea with some content."
	/>
</Story>

<Story name="Required">
	<Textarea
		name="feedback"
		label="Feedback"
		required
		placeholder="Your feedback is required"
	/>
</Story>

<Story name="Disabled">
	<Textarea
		name="disabled"
		label="Disabled Textarea"
		disabled
		value="This textarea is disabled and cannot be edited."
	/>
</Story>

<Story name="Custom Rows">
	<Stack gap="md">
		<Textarea name="small" label="Small (3 rows)" rows={3} />
		<Textarea name="medium" label="Medium (5 rows)" rows={5} />
		<Textarea name="large" label="Large (10 rows)" rows={10} />
	</Stack>
</Story>

<Story name="With Character Count">
	<Textarea
		name="tweet"
		label="Tweet"
		placeholder="What's happening?"
		maxlength={280}
		rows={4}
	/>
</Story>

<Story name="With Error">
	<Textarea
		name="error"
		label="Message"
		value="Short"
		error="Message must be at least 10 characters"
	/>
</Story>

<Story name="Resizable">
	<Textarea
		name="resizable"
		label="Resizable Textarea"
		placeholder="You can resize this textarea"
		style="resize: both;"
	/>
</Story>
