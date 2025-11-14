<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import RadioGroup from './RadioGroup.svelte';
	import Fieldset from '../Fieldset/Fieldset.svelte';

	/**
	 * RadioGroup component for mutually exclusive selections.
	 * Should be used within a Fieldset for proper grouping.
	 */
	const { Story } = defineMeta({
		component: Fieldset,
		title: 'UI/RadioGroup',
		tags: ['autodocs'],
		args: {
			legend: 'Choose an option',
			required: false
		},
		argTypes: {
			required: { control: 'boolean' }
		}
	});
</script>

<script>
	let selectedValue = $state('option1');
	let shippingMethod = $state('standard');
	let paymentMethod = $state('credit-card');
</script>

<Story name="Basic">
	{#snippet template()}
		<Fieldset legend="Choose an option">
			<RadioGroup
				id="option1"
				name="basic"
				label="Option 1"
				value="option1"
				checked={selectedValue === 'option1'}
				onchange={() => selectedValue = 'option1'}
			/>
			<RadioGroup
				id="option2"
				name="basic"
				label="Option 2"
				value="option2"
				checked={selectedValue === 'option2'}
				onchange={() => selectedValue = 'option2'}
			/>
			<RadioGroup
				id="option3"
				name="basic"
				label="Option 3"
				value="option3"
				checked={selectedValue === 'option3'}
				onchange={() => selectedValue = 'option3'}
			/>
		</Fieldset>
		<p style="margin-top: 1rem; font-size: 0.875rem;">Selected: {selectedValue}</p>
	{/snippet}
</Story>

<Story name="With Description">
	{#snippet template()}
		<Fieldset 
			legend="Shipping Method" 
			description="Choose how you want your order delivered"
		>
			<RadioGroup
				id="standard"
				name="shipping"
				label="Standard (5-7 days)"
				value="standard"
				checked={shippingMethod === 'standard'}
				onchange={() => shippingMethod = 'standard'}
			/>
			<RadioGroup
				id="express"
				name="shipping"
				label="Express (2-3 days)"
				value="express"
				checked={shippingMethod === 'express'}
				onchange={() => shippingMethod = 'express'}
			/>
			<RadioGroup
				id="overnight"
				name="shipping"
				label="Overnight"
				value="overnight"
				checked={shippingMethod === 'overnight'}
				onchange={() => shippingMethod = 'overnight'}
			/>
		</Fieldset>
	{/snippet}
</Story>

<Story name="Required">
	{#snippet template()}
		<Fieldset 
			legend="Payment Method" 
			required
		>
			<RadioGroup
				id="credit-card"
				name="payment"
				label="Credit Card"
				value="credit-card"
				checked={paymentMethod === 'credit-card'}
				onchange={() => paymentMethod = 'credit-card'}
				required
			/>
			<RadioGroup
				id="paypal"
				name="payment"
				label="PayPal"
				value="paypal"
				checked={paymentMethod === 'paypal'}
				onchange={() => paymentMethod = 'paypal'}
				required
			/>
			<RadioGroup
				id="bank-transfer"
				name="payment"
				label="Bank Transfer"
				value="bank-transfer"
				checked={paymentMethod === 'bank-transfer'}
				onchange={() => paymentMethod = 'bank-transfer'}
				required
			/>
		</Fieldset>
	{/snippet}
</Story>

<Story name="With Error">
	{#snippet template()}
		<Fieldset 
			legend="Subscription Plan" 
			required
			error="Please select a subscription plan to continue"
		>
			<RadioGroup
				id="free"
				name="plan"
				label="Free"
				value="free"
			/>
			<RadioGroup
				id="pro"
				name="plan"
				label="Pro"
				value="pro"
			/>
			<RadioGroup
				id="enterprise"
				name="plan"
				label="Enterprise"
				value="enterprise"
			/>
		</Fieldset>
	{/snippet}
</Story>

<Story name="With Disabled Option">
	{#snippet template()}
		<Fieldset legend="Plan Selection">
			<RadioGroup
				id="basic"
				name="tier"
				label="Basic (Available)"
				value="basic"
			/>
			<RadioGroup
				id="premium"
				name="tier"
				label="Premium (Coming Soon)"
				value="premium"
				disabled
			/>
			<RadioGroup
				id="ultimate"
				name="tier"
				label="Ultimate (Available)"
				value="ultimate"
			/>
		</Fieldset>
	{/snippet}
</Story>

<Story name="Use Cases">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 2rem;">
			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">Shipping Options</h3>
				<Fieldset 
					legend="Delivery Method"
					description="Select your preferred shipping method"
				>
					<RadioGroup
						id="ship-standard"
						name="shipping-method"
						label="Standard Shipping - Free"
						value="standard"
						checked={shippingMethod === 'standard'}
						onchange={() => shippingMethod = 'standard'}
					/>
					<RadioGroup
						id="ship-express"
						name="shipping-method"
						label="Express Shipping - $9.99"
						value="express"
						checked={shippingMethod === 'express'}
						onchange={() => shippingMethod = 'express'}
					/>
					<RadioGroup
						id="ship-overnight"
						name="shipping-method"
						label="Overnight Delivery - $24.99"
						value="overnight"
						checked={shippingMethod === 'overnight'}
						onchange={() => shippingMethod = 'overnight'}
					/>
				</Fieldset>
			</div>

			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">Product Size</h3>
				<Fieldset 
					legend="Select Size"
					required
				>
					<RadioGroup
						id="size-small"
						name="size"
						label="Small"
						value="small"
						required
					/>
					<RadioGroup
						id="size-medium"
						name="size"
						label="Medium"
						value="medium"
						required
					/>
					<RadioGroup
						id="size-large"
						name="size"
						label="Large"
						value="large"
						required
					/>
					<RadioGroup
						id="size-xl"
						name="size"
						label="Extra Large (Out of Stock)"
						value="xl"
						disabled
						required
					/>
				</Fieldset>
			</div>

			<div>
				<h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem;">Notification Preferences</h3>
				<Fieldset 
					legend="How would you like to receive notifications?"
					description="You can change this setting at any time"
				>
					<RadioGroup
						id="notify-email"
						name="notifications"
						label="Email only"
						value="email"
					/>
					<RadioGroup
						id="notify-sms"
						name="notifications"
						label="SMS only"
						value="sms"
					/>
					<RadioGroup
						id="notify-both"
						name="notifications"
						label="Both email and SMS"
						value="both"
					/>
					<RadioGroup
						id="notify-none"
						name="notifications"
						label="No notifications"
						value="none"
					/>
				</Fieldset>
			</div>
		</div>
	{/snippet}
</Story>