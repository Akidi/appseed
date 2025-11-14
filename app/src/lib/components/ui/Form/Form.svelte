<!--
	@component
	A form wrapper component with SvelteKit progressive enhancement support and submission state management.
	
	@example
	```svelte
	<Form
		action="/api/submit"
		method="post"
		enctype="multipart/form-data"
		enhance={({ formData }) => {
			return async ({ result }) => {
				console.log('Form submitted');
			};
		}}
		novalidate
		target="_blank"
		autocomplete="off"
		onsubmit={(e) => console.log('submitting')}
		onreset={(e) => console.log('reset')}
		class="custom-form"
	>
		Form inputs here
	</Form>
	```
	
	See Storybook for additional examples and visual documentation.
	
	@param {string} [action] - Form action URL (uses SvelteKit routing if not specified)
	@param {'get'|'post'|'dialog'} [method='post'] - HTTP method or dialog
	@param {'application/x-www-form-urlencoded'|'multipart/form-data'|'text/plain'} [enctype] - Form encoding type
	@param {SubmitFunction} [enhance] - SvelteKit progressive enhancement function
	@param {boolean} [novalidate=false] - Disable browser validation
	@param {string} [target] - Form submission target
	@param {'on'|'off'} [autocomplete] - Autocomplete behavior
	@param {string} [class] - Additional CSS classes
	@param {Snippet} children - Form content
	@param {(event: SubmitEvent) => void} [onsubmit] - Submit event handler
	@param {(event: Event) => void} [onreset] - Reset event handler
	
	@note Automatically provides form context to child components for coordinated loading states and validation.
	
	@accessibility
	Uses semantic form element with proper attributes. Provides context for form validation state to child components.
	-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	interface Props {
		action?: string;
		method?: 'get' | 'post' | 'dialog';
		enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
		enhance?: SubmitFunction;
		novalidate?: boolean;
		target?: string;
		autocomplete?: 'on' | 'off';
		class?: string;
		children: Snippet;
		onsubmit?: (event: SubmitEvent & { currentTarget: HTMLFormElement }) => void;
		onreset?: (event: Event & { currentTarget: HTMLFormElement }) => void;
	}

	let {
		action,
		method = 'post',
		enctype,
		enhance: enhanceFunction,
		novalidate = false,
		target,
		autocomplete,
		class: className = '',
		children,
		onsubmit,
		onreset,
		...restProps
	}: Props = $props();
</script>

<form
	{action}
	{method}
	{enctype}
	{novalidate}
	{target}
	{autocomplete}
	class={className}
	use:enhance={enhanceFunction}
	{onsubmit}
	{onreset}
	{...restProps}
>
	{@render children()}
</form>
