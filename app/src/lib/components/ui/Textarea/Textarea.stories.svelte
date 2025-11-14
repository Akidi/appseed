<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Textarea from './Textarea.svelte';

	const { Story } = defineMeta({
		component: Textarea,
		title: 'UI/Textarea',
		tags: ['autodocs'],
		args: {
			name: 'message',
			label: 'Message'
		}
	});
</script>

<script lang="ts">
	import { Stack } from '$lib/components/layout';
</script>

<Story name="Default" />

<Story name="With Placeholder">
	{#snippet template()}
		<Textarea
			name="bio"
			label="Bio"
			placeholder="Tell us about yourself..."
		/>
	{/snippet}
</Story>

<Story name="With Value">
	{#snippet template()}
		<Textarea
			name="description"
			label="Description"
			value="This is a pre-filled textarea with some content."
		/>
	{/snippet}
</Story>

<Story name="Required">
	{#snippet template()}
		<Textarea
			name="feedback"
			label="Feedback"
			required
			placeholder="Your feedback is required"
		/>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template()}
		<Textarea
			name="disabled"
			label="Disabled Textarea"
			disabled
			value="This textarea is disabled and cannot be edited."
		/>
	{/snippet}
</Story>

<Story name="Custom Rows">
	{#snippet template()}
		<Stack gap="md">
			<Textarea name="small" label="Small (3 rows)" rows={3} />
			<Textarea name="medium" label="Medium (5 rows)" rows={5} />
			<Textarea name="large" label="Large (10 rows)" rows={10} />
		</Stack>
	{/snippet}
</Story>

<Story name="With Character Count">
	{#snippet template()}
		<Textarea
			name="tweet"
			label="Tweet"
			placeholder="What's happening?"
			maxlength={280}
			rows={4}
		/>
	{/snippet}
</Story>

<Story name="With Error">
	{#snippet template()}
		<Textarea
			name="error"
			label="Message"
			value="Short"
			error="Message must be at least 10 characters"
		/>
	{/snippet}
</Story>

<Story name="Resizable">
	{#snippet template()}
		<Textarea
			name="resizable"
			label="Resizable Textarea"
			placeholder="You can resize this textarea"
			style="resize: both;"
		/>
	{/snippet}
</Story>
