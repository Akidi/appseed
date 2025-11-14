<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Breadcrumbs from './Breadcrumbs.svelte';

	const { Story } = defineMeta({
		component: Breadcrumbs,
		title: 'UI/Breadcrumbs',
		tags: ['autodocs'],
		args: {
			separator: 'chevron'
		},
		argTypes: {
			separator: {
				control: 'select',
				options: ['slash', 'chevron', 'arrow']
			}
		}
	});
</script>

<script lang="ts">
	import BreadcrumbItem from './BreadcrumbItem.svelte';
	import { Stack } from '$lib/components/layout';
</script>

<Story name="Default">
	{#snippet template()}
		<Breadcrumbs>
			<BreadcrumbItem href="/">Home</BreadcrumbItem>
			<BreadcrumbItem href="/products">Products</BreadcrumbItem>
			<BreadcrumbItem current>Detail</BreadcrumbItem>
		</Breadcrumbs>
	{/snippet}
</Story>

<Story name="Separators">
	{#snippet template()}
		<Stack gap="lg">
			<div>
				<h4>Chevron (default)</h4>
				<Breadcrumbs separator="chevron">
					<BreadcrumbItem href="/">Home</BreadcrumbItem>
					<BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
					<BreadcrumbItem current>Components</BreadcrumbItem>
				</Breadcrumbs>
			</div>
			<div>
				<h4>Slash</h4>
				<Breadcrumbs separator="slash">
					<BreadcrumbItem href="/">Home</BreadcrumbItem>
					<BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
					<BreadcrumbItem current>Components</BreadcrumbItem>
				</Breadcrumbs>
			</div>
			<div>
				<h4>Arrow</h4>
				<Breadcrumbs separator="arrow">
					<BreadcrumbItem href="/">Home</BreadcrumbItem>
					<BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
					<BreadcrumbItem current>Components</BreadcrumbItem>
				</Breadcrumbs>
			</div>
		</Stack>
	{/snippet}
</Story>

<Story name="Long Path">
	{#snippet template()}
		<Breadcrumbs>
			<BreadcrumbItem href="/">Home</BreadcrumbItem>
			<BreadcrumbItem href="/category">Category</BreadcrumbItem>
			<BreadcrumbItem href="/category/subcategory">Subcategory</BreadcrumbItem>
			<BreadcrumbItem href="/category/subcategory/products">Products</BreadcrumbItem>
			<BreadcrumbItem current>Product Detail</BreadcrumbItem>
		</Breadcrumbs>
	{/snippet}
</Story>
