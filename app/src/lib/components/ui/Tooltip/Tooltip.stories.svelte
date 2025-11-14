<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tooltip from './Tooltip.svelte';
	import Button from '../Button/Button.svelte';

	/**
	 * Tooltip component for displaying additional information on hover.
	 * Supports multiple positions and customizable delay.
	 */
	const { Story } = defineMeta({
		component: Tooltip,
		title: 'UI/Tooltip',
		tags: ['autodocs'],
		args: {
			content: 'Tooltip content',
			position: 'top',
			delay: 200
		},
		argTypes: {
			position: {
				control: 'select',
				options: ['top', 'bottom', 'left', 'right']
			},
			delay: { control: 'number' }
		}
	});
</script>

<Story name="Top" args={{ content: 'This is a tooltip', position: 'top' }}>
	{#snippet template()}
		<div style="display: flex; justify-content: center; align-items: center; min-height: 200px; padding: 4rem;">
			<Button>Hover me (Top)</Button>
		</div>
	{/snippet}
</Story>

<Story name="Bottom" args={{ content: 'This is a tooltip', position: 'bottom' }}>
	{#snippet template()}
		<div style="display: flex; justify-content: center; align-items: center; min-height: 200px; padding: 4rem;">
			<Button>Hover me (Bottom)</Button>
		</div>
	{/snippet}
</Story>

<Story name="Left" args={{ content: 'This is a tooltip', position: 'left' }}>
	{#snippet template()}
		<div style="display: flex; justify-content: center; align-items: center; min-height: 200px; padding: 4rem;">
			<Button>Hover me (Left)</Button>
		</div>
	{/snippet}
</Story>

<Story name="Right" args={{ content: 'This is a tooltip', position: 'right' }}>
	{#snippet template()}
		<div style="display: flex; justify-content: center; align-items: center; min-height: 200px; padding: 4rem;">
			<Button>Hover me (Right)</Button>
		</div>
	{/snippet}
</Story>

<Story name="All Positions">
	{#snippet template()}
		<div style="display: flex; justify-content: center; align-items: center; gap: 2rem; min-height: 300px; padding: 4rem;">
			<Tooltip content="Top tooltip" position="top">
				<Button>Top</Button>
			</Tooltip>
			<Tooltip content="Bottom tooltip" position="bottom">
				<Button>Bottom</Button>
			</Tooltip>
			<Tooltip content="Left tooltip" position="left">
				<Button>Left</Button>
			</Tooltip>
			<Tooltip content="Right tooltip" position="right">
				<Button>Right</Button>
			</Tooltip>
		</div>
	{/snippet}
</Story>

<Story name="With Icons">
	{#snippet template()}
		<div style="display: flex; gap: 1rem; align-items: center; justify-content: center; padding: 4rem;">
			<Tooltip content="Edit item">
				<button 
					type="button" 
					aria-label="Edit item"
					style="padding: 0.5rem; border-radius: 0.375rem; transition: background 0.2s;" 
					onmouseenter={(e) => e.currentTarget.style.background = '#f3f4f6'} 
					onmouseleave={(e) => e.currentTarget.style.background = 'transparent'}
				>
					<svg style="width: 1.25rem; height: 1.25rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
					</svg>
				</button>
			</Tooltip>
			<Tooltip content="Delete item">
				<button 
					type="button" 
					aria-label="Delete item"
					style="padding: 0.5rem; border-radius: 0.375rem; transition: background 0.2s;" 
					onmouseenter={(e) => e.currentTarget.style.background = '#fef2f2'} 
					onmouseleave={(e) => e.currentTarget.style.background = 'transparent'}
				>
					<svg style="width: 1.25rem; height: 1.25rem; color: #ef4444;" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
					</svg>
				</button>
			</Tooltip>
			<Tooltip content="Share">
				<button 
					type="button" 
					aria-label="Share"
					style="padding: 0.5rem; border-radius: 0.375rem; transition: background 0.2s;" 
					onmouseenter={(e) => e.currentTarget.style.background = '#f3f4f6'} 
					onmouseleave={(e) => e.currentTarget.style.background = 'transparent'}
				>
					<svg style="width: 1.25rem; height: 1.25rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
					</svg>
				</button>
			</Tooltip>
		</div>
	{/snippet}
</Story>

<Story name="Long Content">
	{#snippet template()}
		<div style="display: flex; justify-content: center; padding: 3rem;">
			<Tooltip content="This is a longer tooltip with more information that might wrap">
				<Button>Hover for long tooltip</Button>
			</Tooltip>
		</div>
	{/snippet}
</Story>

<Story name="Custom Delay">
	{#snippet template()}
		<div style="display: flex; gap: 2rem; justify-content: center; padding: 4rem;">
			<Tooltip content="Fast (0ms)" delay={0}>
				<Button size="sm">Instant</Button>
			</Tooltip>
			<Tooltip content="Default (200ms)" delay={200}>
				<Button size="sm">Default</Button>
			</Tooltip>
			<Tooltip content="Slow (1000ms)" delay={1000}>
				<Button size="sm">Slow</Button>
			</Tooltip>
		</div>
	{/snippet}
</Story>

<Story name="Use Cases">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 2rem; padding: 4rem;">
			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">Help Text</h3>
				<div style="display: flex; align-items: center; gap: 0.5rem;">
					<span style="font-size: 0.875rem; font-weight: 500;">Email Address</span>
					<Tooltip content="We'll never share your email with anyone else">
						<button type="button" aria-label="Help information about email">
							<svg style="width: 1rem; height: 1rem; color: #6b7280;" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</button>
					</Tooltip>
				</div>
			</div>

			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">Action Buttons</h3>
				<div style="display: flex; gap: 0.5rem;">
					<Tooltip content="Save changes">
						<Button size="sm" ariaLabel="Save changes">
							<svg style="width: 1rem; height: 1rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
							</svg>
						</Button>
					</Tooltip>
					<Tooltip content="Undo last change">
						<Button size="sm" variant="secondary" ariaLabel="Undo last change">
							<svg style="width: 1rem; height: 1rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
							</svg>
						</Button>
					</Tooltip>
					<Tooltip content="Download report">
						<Button size="sm" variant="secondary" ariaLabel="Download report">
							<svg style="width: 1rem; height: 1rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
							</svg>
						</Button>
					</Tooltip>
				</div>
			</div>

			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">Status Indicators</h3>
				<div style="display: flex; align-items: center; gap: 1rem;">
					<Tooltip content="System is online">
						<div style="display: flex; align-items: center; gap: 0.5rem;">
							<div style="width: 0.5rem; height: 0.5rem; border-radius: 9999px; background: #10b981;" role="status" aria-label="Online"></div>
							<span style="font-size: 0.875rem;">Online</span>
						</div>
					</Tooltip>
					<Tooltip content="Last updated 5 minutes ago">
						<div style="display: flex; align-items: center; gap: 0.5rem;">
							<div style="width: 0.5rem; height: 0.5rem; border-radius: 9999px; background: #f59e0b;" role="status" aria-label="Syncing"></div>
							<span style="font-size: 0.875rem;">Syncing</span>
						</div>
					</Tooltip>
				</div>
			</div>
		</div>
	{/snippet}
</Story>
