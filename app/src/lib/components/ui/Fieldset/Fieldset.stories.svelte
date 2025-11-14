<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Fieldset from './Fieldset.svelte';

	const { Story } = defineMeta({
		component: Fieldset,
		title: 'UI/Fieldset',
		tags: ['autodocs'],
		args: {
			legend: 'Personal Information'
		}
	});
</script>

<script lang="ts">
	import TextInput from '../TextInput/TextInput.svelte';
	import { Stack } from '$lib/components/layout';
</script>

<Story name="Default">
	{#snippet template()}
		<Fieldset legend="Personal Information">
			<Stack gap="md">
				<TextInput name="firstname" label="First Name" />
				<TextInput name="lastname" label="Last Name" />
			</Stack>
		</Fieldset>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template()}
		<Fieldset legend="Disabled Fieldset" disabled>
			<Stack gap="md">
				<TextInput name="field1" label="Field 1" value="Cannot edit" />
				<TextInput name="field2" label="Field 2" value="Cannot edit" />
			</Stack>
		</Fieldset>
	{/snippet}
</Story>

<Story name="Nested Fieldsets">
	{#snippet template()}
		<Fieldset legend="Account Details">
			<Stack gap="lg">
				<TextInput name="email" label="Email" type="email" />

				<Fieldset legend="Address">
					<Stack gap="md">
						<TextInput name="street" label="Street" />
						<TextInput name="city" label="City" />
					</Stack>
				</Fieldset>
			</Stack>
		</Fieldset>
	{/snippet}
</Story>
