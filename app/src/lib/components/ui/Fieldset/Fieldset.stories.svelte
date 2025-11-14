<script lang="ts" context="module">
	import type { Meta } from '@storybook/svelte';
	import Fieldset from './Fieldset.svelte';

	export const meta: Meta<typeof Fieldset> = {
		title: 'UI/Fieldset',
		component: Fieldset,
		tags: ['autodocs']
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import TextInput from '../TextInput/TextInput.svelte';
	import { Stack } from '$lib/components/layout';
</script>

<Story name="Default">
	<Fieldset legend="Personal Information">
		<Stack gap="md">
			<TextInput name="firstname" label="First Name" />
			<TextInput name="lastname" label="Last Name" />
		</Stack>
	</Fieldset>
</Story>

<Story name="Disabled">
	<Fieldset legend="Disabled Fieldset" disabled>
		<Stack gap="md">
			<TextInput name="field1" label="Field 1" value="Cannot edit" />
			<TextInput name="field2" label="Field 2" value="Cannot edit" />
		</Stack>
	</Fieldset>
</Story>

<Story name="Nested Fieldsets">
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
</Story>
