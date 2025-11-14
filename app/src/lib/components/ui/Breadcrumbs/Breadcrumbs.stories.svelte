<script lang="ts" context="module">
	import type { Meta } from '@storybook/svelte';
	import Breadcrumbs from './Breadcrumbs.svelte';

	export const meta: Meta<typeof Breadcrumbs> = {
		title: 'UI/Breadcrumbs',
		component: Breadcrumbs,
		tags: ['autodocs'],
		argTypes: {
			separator: {
				control: 'select',
				options: ['slash', 'chevron', 'arrow']
			}
		}
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import BreadcrumbItem from './BreadcrumbItem.svelte';
	import { Stack } from '$lib/components/layout';
</script>

<Story name="Default">
	<Breadcrumbs>
		<BreadcrumbItem href="/">Home</BreadcrumbItem>
		<BreadcrumbItem href="/products">Products</BreadcrumbItem>
		<BreadcrumbItem current>Detail</BreadcrumbItem>
	</Breadcrumbs>
</Story>

<Story name="Separators">
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
</Story>

<Story name="Long Path">
	<Breadcrumbs>
		<BreadcrumbItem href="/">Home</BreadcrumbItem>
		<BreadcrumbItem href="/category">Category</BreadcrumbItem>
		<BreadcrumbItem href="/category/subcategory">Subcategory</BreadcrumbItem>
		<BreadcrumbItem href="/category/subcategory/products">Products</BreadcrumbItem>
		<BreadcrumbItem current>Product Detail</BreadcrumbItem>
	</Breadcrumbs>
</Story>
