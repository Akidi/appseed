<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import { Form } from '../Form';

	const onSubmitFn = fn().mockName('onSubmit');
	const onResetFn = fn().mockName('onReset');

	const { Story } = defineMeta({
		component: Form,
		title: 'UI/Form',
		tags: ['autodocs'],
		argTypes: {
			method: {
				control: 'select',
				options: ['get', 'post', 'dialog']
			},
			enctype: {
				control: 'select',
				options: ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']
			},
			novalidate: { control: 'boolean' },
			autocomplete: {
				control: 'select',
				options: ['on', 'off']
			}
		},
		args: {
			method: 'post'
		}
	});
</script>

<script lang="ts">
	let isSubmitting = $state(false);
	let formResult = $state<string>('');
	let enhancedFormResult = $state<string>('');
	let fileUploadResult = $state<string>('');
	let validationResult = $state<string>('');
	let resetResult = $state<string>('');
	let getMethodResult = $state<string>('');
	let noValidateResult = $state<string>('');
</script>

<Story name="Default" args={{ onsubmit: onSubmitFn }}>
	<div>
		<label for="name" class="block text-sm font-medium text-gray-700 mb-1">
			Name
		</label>
		<input
			type="text"
			id="name"
			name="name"
			class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
		/>
	</div>
	<div>
		<label for="email" class="block text-sm font-medium text-gray-700 mb-1">
			Email
		</label>
		<input
			type="email"
			id="email"
			name="email"
			class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
		/>
	</div>
	<button
		type="submit"
		class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
	>
		Submit
	</button>
	{#if formResult}
		<p class="text-sm text-gray-600">{formResult}</p>
	{/if}
</Story>

<Story name="With Enhanced">
	{#snippet template()}
		<Form
			action="#"
			enhance={() => {
				isSubmitting = true;
				enhancedFormResult = 'Submitting...';
				
				return async () => {
					isSubmitting = false;
					enhancedFormResult = 'Form submitted successfully!';
					setTimeout(() => enhancedFormResult = '', 3000);
				};
			}}
			class="max-w-md space-y-4"
		>
			<div>
				<label for="title" class="block text-sm font-medium text-gray-700 mb-1">
					Title
				</label>
				<input
					type="text"
					id="title"
					name="title"
					disabled={isSubmitting}
					class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
			</div>
			<div>
				<label for="description" class="block text-sm font-medium text-gray-700 mb-1">
					Description
				</label>
				<textarea
					id="description"
					name="description"
					rows="3"
					disabled={isSubmitting}
					class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				></textarea>
			</div>
			<button
				type="submit"
				disabled={isSubmitting}
				class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isSubmitting ? 'Saving...' : 'Save'}
			</button>
			{#if enhancedFormResult}
				<p class="text-sm text-green-600">{enhancedFormResult}</p>
			{/if}
		</Form>
	{/snippet}
</Story>

<Story name="File Upload" args={{ enctype: 'multipart/form-data' }}>
	{#snippet template(args)}
	{args.children}
		<Form 
			enctype={args.enctype}
			onsubmit={(e) => {
				e.preventDefault();
				onSubmitFn(e);
				const formData = new FormData(e.currentTarget as HTMLFormElement);
				const file = formData.get('file') as File;
				fileUploadResult = file ? `File selected: ${file.name} (${file.size} bytes)` : 'No file selected';
			}}
			class="max-w-md space-y-4"
		>
			<div>
				<label for="file" class="block text-sm font-medium text-gray-700 mb-1">
					Choose file
				</label>
				<input
					type="file"
					id="file"
					name="file"
					class="w-full text-sm text-gray-500
						file:mr-4 file:py-2 file:px-4
						file:rounded-md file:border-0
						file:text-sm file:font-semibold
						file:bg-blue-50 file:text-blue-700
						hover:file:bg-blue-100"
				/>
			</div>
			<button
				type="submit"
				class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
			>
				Upload
			</button>
			{#if fileUploadResult}
				<p class="text-sm text-gray-600">{fileUploadResult}</p>
			{/if}
		</Form>
	{/snippet}
</Story>

<Story name="With Validation" args={{ novalidate: false }}>
	{#snippet template(args)}
		<Form 
			novalidate={args.novalidate}
			onsubmit={(e) => {
				e.preventDefault();
				onSubmitFn(e);
				validationResult = 'Validation passed! Form submitted.';
			}}
			class="max-w-md space-y-4"
		>
			<div>
				<label for="username" class="block text-sm font-medium text-gray-700 mb-1">
					Username <span class="text-red-500">*</span>
				</label>
				<input
					type="text"
					id="username"
					name="username"
					required
					minlength="3"
					class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
				<p class="mt-1 text-sm text-gray-500">Minimum 3 characters</p>
			</div>
			<div>
				<label for="password" class="block text-sm font-medium text-gray-700 mb-1">
					Password <span class="text-red-500">*</span>
				</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					minlength="8"
					class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
				<p class="mt-1 text-sm text-gray-500">Minimum 8 characters</p>
			</div>
			<button
				type="submit"
				class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
			>
				Register
			</button>
			{#if validationResult}
				<p class="text-sm text-green-600">{validationResult}</p>
			{/if}
		</Form>
	{/snippet}
</Story>

<Story name="With Reset">
	{#snippet template()}
		<Form
			onsubmit={(e: SubmitEvent) => {
				e.preventDefault();
				onSubmitFn(e);
				resetResult = 'Form submitted!';
			}}
			onreset={(e: Event) => {
				onResetFn(e);
				resetResult = 'Form reset!';
				setTimeout(() => resetResult = '', 2000);
			}}
			class="max-w-md space-y-4"
		>
			<div>
				<label for="message" class="block text-sm font-medium text-gray-700 mb-1">
					Message
				</label>
				<textarea
					id="message"
					name="message"
					rows="4"
					class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				></textarea>
			</div>
			<div class="flex gap-2">
				<button
					type="submit"
					class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
				>
					Submit
				</button>
				<button
					type="reset"
					class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
				>
					Reset
				</button>
			</div>
			{#if resetResult}
				<p class="text-sm text-gray-600">{resetResult}</p>
			{/if}
		</Form>
	{/snippet}
</Story>

<Story name="GET Method" args={{ method: 'get' }}>
	{#snippet template(args)}
		<Form 
			method={args.method}
			action="#"
			onsubmit={(e: SubmitEvent) => {
				e.preventDefault();
				onSubmitFn(e);
				const formData = new FormData(e.currentTarget as HTMLFormElement);
				const params = new URLSearchParams(formData as any);
				getMethodResult = `Would navigate to: ?${params.toString()}`;
			}}
			class="max-w-md space-y-4"
		>
			<div>
				<label for="search" class="block text-sm font-medium text-gray-700 mb-1">
					Search
				</label>
				<input
					type="text"
					id="search"
					name="q"
					placeholder="Enter search term..."
					class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
			</div>
			<div>
				<label for="filter" class="block text-sm font-medium text-gray-700 mb-1">
					Filter
				</label>
				<select
					id="filter"
					name="filter"
					class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				>
					<option value="all">All</option>
					<option value="active">Active</option>
					<option value="inactive">Inactive</option>
				</select>
			</div>
			<button
				type="submit"
				class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
			>
				Search
			</button>
			{#if getMethodResult}
				<p class="text-sm text-gray-600 break-all">{getMethodResult}</p>
			{/if}
		</Form>
	{/snippet}
</Story>

<Story name="No Validation" args={{ novalidate: true }}>
	{#snippet template(args)}
		<Form 
			novalidate={args.novalidate}
			onsubmit={(e) => {
				e.preventDefault();
				onSubmitFn(e);
				noValidateResult = 'Form submitted (validation skipped)';
			}}
			class="max-w-md space-y-4"
		>
			<div>
				<label for="emailNoValidate" class="block text-sm font-medium text-gray-700 mb-1">
					Email (validation disabled)
				</label>
				<input
					type="email"
					id="emailNoValidate"
					name="email"
					required
					class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
				<p class="mt-1 text-sm text-gray-500">Try entering invalid email - form will still submit</p>
			</div>
			<button
				type="submit"
				class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
			>
				Submit
			</button>
			{#if noValidateResult}
				<p class="text-sm text-gray-600">{noValidateResult}</p>
			{/if}
		</Form>
	{/snippet}
</Story>

<Story name="Autocomplete Off" args={{ autocomplete: 'off' }}>
	<div>
		<label for="secret" class="block text-sm font-medium text-gray-700 mb-1">
			Secret Code
		</label>
		<input
			type="text"
			id="secret"
			name="secret"
			class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
		/>
		<p class="mt-1 text-sm text-gray-500">Browser autocomplete is disabled</p>
	</div>
	<button
		type="submit"
		class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
	>
		Submit
	</button>
</Story>