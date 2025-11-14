<script lang="ts" context="module">
	import type { Meta } from '@storybook/svelte';
	import DateInput from './DateInput.svelte';

	export const meta: Meta<typeof DateInput> = {
		title: 'UI/DateInput',
		component: DateInput,
		tags: ['autodocs']
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import { Stack } from '$lib/components/layout';
</script>

<Story name="Default">
	<DateInput name="date" label="Select Date" />
</Story>

<Story name="With Value">
	<DateInput name="date" label="Birth Date" value="1990-01-01" />
</Story>

<Story name="Required">
	<DateInput name="date" label="Required Date" required />
</Story>

<Story name="Disabled">
	<DateInput name="date" label="Disabled Date" disabled value="2024-01-01" />
</Story>

<Story name="With Min and Max">
	<DateInput
		name="date"
		label="Select within range"
		min="2024-01-01"
		max="2024-12-31"
		value="2024-06-15"
	/>
</Story>

<Story name="Multiple Inputs">
	<Stack gap="md">
		<DateInput name="start" label="Start Date" />
		<DateInput name="end" label="End Date" />
	</Stack>
</Story>
