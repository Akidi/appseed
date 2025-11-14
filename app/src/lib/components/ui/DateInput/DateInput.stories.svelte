<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DateInput from './DateInput.svelte';

	const { Story } = defineMeta({
		component: DateInput,
		title: 'UI/DateInput',
		tags: ['autodocs'],
		args: {
			name: 'date',
			label: 'Select Date'
		}
	});
</script>

<script lang="ts">
	import { Stack } from '$lib/components/layout';
</script>

<Story name="Default" />

<Story name="With Value">
	{#snippet template()}
		<DateInput name="date" label="Birth Date" value="1990-01-01" />
	{/snippet}
</Story>

<Story name="Required">
	{#snippet template()}
		<DateInput name="date" label="Required Date" required />
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template()}
		<DateInput name="date" label="Disabled Date" disabled value="2024-01-01" />
	{/snippet}
</Story>

<Story name="With Min and Max">
	{#snippet template()}
		<DateInput
			name="date"
			label="Select within range"
			min="2024-01-01"
			max="2024-12-31"
			value="2024-06-15"
		/>
	{/snippet}
</Story>

<Story name="Multiple Inputs">
	{#snippet template()}
		<Stack gap="md">
			<DateInput name="start" label="Start Date" />
			<DateInput name="end" label="End Date" />
		</Stack>
	{/snippet}
</Story>
