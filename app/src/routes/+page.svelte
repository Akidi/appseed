<script lang="ts">
	// Layout Components
	import {
		AspectRatio,
		CardGrid,
		Center,
		Cluster,
		Container,
		Divider,
		Flex,
		Grid,
		ScrollArea,
		Sidebar,
		Spacer,
		Split,
		Stack
	} from '$lib/components/layout';

	// UI Components
	import Alert from '$lib/components/ui/Alert/Alert.svelte';
	import Avatar from '$lib/components/ui/Avatar/Avatar.svelte';
	import Badge from '$lib/components/ui/Badge/Badge.svelte';
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs/Breadcrumbs.svelte';
	import BreadcrumbItem from '$lib/components/ui/Breadcrumbs/BreadcrumbItem.svelte';
	import Button from '$lib/components/ui/Button/Button.svelte';
	import Card from '$lib/components/ui/Card/Card.svelte';
	import Checkbox from '$lib/components/ui/Checkbox/Checkbox.svelte';
	import DateInput from '$lib/components/ui/DateInput/DateInput.svelte';
	import Dropdown from '$lib/components/ui/Dropdown/Dropdown.svelte';
	import DropdownItem from '$lib/components/ui/Dropdown/DropdownItem.svelte';
	import Loading from '$lib/components/ui/Loading/Loading.svelte';
	import Modal from '$lib/components/ui/Modal/Modal.svelte';
	import Navbar from '$lib/components/ui/Navbar/Navbar.svelte';
	import NavLink from '$lib/components/ui/Navbar/NavLink.svelte';
	import NavLogo from '$lib/components/ui/Navbar/NavLogo.svelte';
	import Pagination from '$lib/components/ui/Pagination/Pagination.svelte';
	import RadioGroup from '$lib/components/ui/RadioGroup/RadioGroup.svelte';
	import Select from '$lib/components/ui/Select/Select.svelte';
	import Skeleton from '$lib/components/ui/Skeleton/Skeleton.svelte';
	import Table from '$lib/components/ui/Table/Table.svelte';
	import Tabs from '$lib/components/ui/Tabs/Tabs.svelte';
	import TabList from '$lib/components/ui/Tabs/TabList.svelte';
	import Tab from '$lib/components/ui/Tabs/Tab.svelte';
	import TabPanel from '$lib/components/ui/Tabs/TabPanel.svelte';
	import TextInput from '$lib/components/ui/TextInput/TextInput.svelte';
	import Textarea from '$lib/components/ui/Textarea/Textarea.svelte';
	import Toggle from '$lib/components/ui/Toggle/Toggle.svelte';
	import Tooltip from '$lib/components/ui/Tooltip/Tooltip.svelte';

	let isModalOpen = $state(false);
	let currentPage = $state(1);
	let radioValue = $state('option1');
	let selectValue = $state('');
	let checkboxValue = $state(false);
	let toggleValue = $state(false);

	function setTheme(theme: string) {
		if (theme === 'auto') {
			document.documentElement.removeAttribute('data-theme');
		} else {
			document.documentElement.setAttribute('data-theme', theme);
		}
	}

	const tableData = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
	];
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Navigation -->
<Navbar>
	<NavLogo href="/">Component Showcase</NavLogo>
	<NavLink href="#ui-components">UI Components</NavLink>
	<NavLink href="#layout-components">Layout</NavLink>
	<NavLink href="#theme">Theme</NavLink>
	<div style="margin-left: auto;">
		<Button variant="primary" size="sm">Get Started</Button>
	</div>
</Navbar>

<main id="main-content">
	<Container>
		<Stack gap="2xl">
			<!-- Hero Section -->
			<section>
				<Stack gap="lg">
					<Center>
						<Stack gap="md" style="text-align: center; max-width: 800px;">
							<h1 style="font-size: 3rem; margin: 0;">UI Component Library</h1>
							<p style="font-size: 1.25rem; color: var(--color-text-muted);">
								A comprehensive collection of layout and UI components built with Svelte 5 and
								TypeScript
							</p>
							<Cluster gap="md" style="justify-content: center;">
								<Button variant="primary" size="lg">Explore Components</Button>
								<Button variant="secondary" size="lg">View Docs</Button>
							</Cluster>
						</Stack>
					</Center>
				</Stack>
			</section>

			<Divider />

			<!-- Breadcrumbs Example -->
			<section>
				<Breadcrumbs>
					<BreadcrumbItem href="/">Home</BreadcrumbItem>
					<BreadcrumbItem href="/components">Components</BreadcrumbItem>
					<BreadcrumbItem current>Showcase</BreadcrumbItem>
				</Breadcrumbs>
			</section>

			<!-- UI Components Section -->
			<section id="ui-components">
				<Stack gap="xl">
					<h2>UI Components</h2>

					<!-- Alerts -->
					<div>
						<h3>Alerts</h3>
						<Stack gap="md">
							<Alert variant="info">This is an informational alert</Alert>
							<Alert variant="success">Operation completed successfully!</Alert>
							<Alert variant="warning">Please review this warning</Alert>
							<Alert variant="error">An error has occurred</Alert>
						</Stack>
					</div>

					<Divider />

					<!-- Avatars & Badges -->
					<div>
						<h3>Avatars & Badges</h3>
						<Split gap="lg">
							<div>
								<h4>Avatars</h4>
								<Cluster gap="md">
									<Avatar fallback="AB" size="sm" />
									<Avatar fallback="CD" size="md" status="online" />
									<Avatar fallback="EF" size="lg" shape="rounded" status="busy" />
									<Avatar
										src="https://i.pravatar.cc/150?img=1"
										alt="User"
										size="xl"
										status="online"
									/>
								</Cluster>
							</div>
							<div>
								<h4>Badges</h4>
								<Cluster gap="sm">
									<Badge variant="default">Default</Badge>
									<Badge variant="primary">Primary</Badge>
									<Badge variant="success">Success</Badge>
									<Badge variant="warning">Warning</Badge>
									<Badge variant="error">Error</Badge>
								</Cluster>
							</div>
						</Split>
					</div>

					<Divider />

					<!-- Buttons -->
					<div>
						<h3>Buttons</h3>
						<Stack gap="md">
							<div>
								<h4>Variants</h4>
								<Cluster gap="sm">
									<Button variant="primary">Primary</Button>
									<Button variant="secondary">Secondary</Button>
									<Button variant="accent">Accent</Button>
									<Button variant="outline">Outline</Button>
									<Button variant="ghost">Ghost</Button>
								</Cluster>
							</div>
							<div>
								<h4>Sizes</h4>
								<Cluster gap="sm">
									<Button size="sm">Small</Button>
									<Button size="md">Medium</Button>
									<Button size="lg">Large</Button>
								</Cluster>
							</div>
							<div>
								<h4>States</h4>
								<Cluster gap="sm">
									<Button loading>Loading</Button>
									<Button disabled>Disabled</Button>
									<Button fullWidth>Full Width Button</Button>
								</Cluster>
							</div>
						</Stack>
					</div>

					<Divider />

					<!-- Cards -->
					<div>
						<h3>Cards</h3>
						<CardGrid>
							<Card>
								<Stack gap="md">
									<h4>Card Title</h4>
									<p>This is a basic card component with some content inside.</p>
									<Button variant="primary" size="sm">Action</Button>
								</Stack>
							</Card>
							<Card>
								<Stack gap="md">
									<Cluster gap="sm">
										<Avatar fallback="JD" />
										<Stack gap="xs">
											<h4 style="margin: 0;">John Doe</h4>
											<p style="margin: 0; color: var(--color-text-muted); font-size: 0.875rem;">
												Software Engineer
											</p>
										</Stack>
									</Cluster>
									<p>Building amazing things with Svelte.</p>
								</Stack>
							</Card>
							<Card elevated>
								<Stack gap="md">
									<Badge variant="primary">Featured</Badge>
									<h4>Elevated Card</h4>
									<p>This card has elevation for emphasis.</p>
								</Stack>
							</Card>
						</CardGrid>
					</div>

					<Divider />

					<!-- Form Inputs -->
					<div>
						<h3>Form Inputs</h3>
						<Grid columns={2} gap="lg">
							<Stack gap="md">
								<TextInput name="name" label="Name" placeholder="Enter your name" />
								<TextInput
									name="email"
									label="Email"
									type="email"
									placeholder="email@example.com"
								/>
								<DateInput name="date" label="Date of Birth" />
								<Select
									name="country"
									label="Country"
									bind:value={selectValue}
									options={[
										{ value: 'us', label: 'United States' },
										{ value: 'uk', label: 'United Kingdom' },
										{ value: 'ca', label: 'Canada' }
									]}
								/>
							</Stack>
							<Stack gap="md">
								<Textarea
									name="message"
									label="Message"
									placeholder="Tell us more..."
									rows={4}
								/>
								<Checkbox
									name="terms"
									label="I agree to the terms and conditions"
									bind:checked={checkboxValue}
								/>
								<RadioGroup
									name="plan"
									label="Select a plan"
									bind:value={radioValue}
									options={[
										{ value: 'option1', label: 'Basic Plan' },
										{ value: 'option2', label: 'Pro Plan' },
										{ value: 'option3', label: 'Enterprise Plan' }
									]}
								/>
								<Toggle name="notifications" label="Enable notifications" bind:checked={toggleValue} />
							</Stack>
						</Grid>
					</div>

					<Divider />

					<!-- Dropdown -->
					<div>
						<h3>Dropdown</h3>
						<Dropdown label="Actions">
							<DropdownItem>Edit</DropdownItem>
							<DropdownItem>Duplicate</DropdownItem>
							<DropdownItem>Delete</DropdownItem>
						</Dropdown>
					</div>

					<Divider />

					<!-- Loading States -->
					<div>
						<h3>Loading & Skeleton</h3>
						<Split gap="lg">
							<div>
								<h4>Loading Spinners</h4>
								<Cluster gap="lg">
									<Loading size="sm" />
									<Loading size="md" />
									<Loading size="lg" />
								</Cluster>
							</div>
							<div>
								<h4>Skeleton Loaders</h4>
								<Stack gap="sm">
									<Cluster gap="md">
										<Skeleton variant="circular" width="3rem" height="3rem" />
										<Stack gap="xs" style="flex: 1;">
											<Skeleton variant="text" width="60%" />
											<Skeleton variant="text" width="40%" />
										</Stack>
									</Cluster>
									<Skeleton variant="rectangular" width="100%" height="100px" />
								</Stack>
							</div>
						</Split>
					</div>

					<Divider />

					<!-- Modal -->
					<div>
						<h3>Modal</h3>
						<Button onclick={() => (isModalOpen = true)}>Open Modal</Button>
						<Modal bind:open={isModalOpen} title="Example Modal">
							<Stack gap="md">
								<p>This is a modal dialog with some content.</p>
								<p>You can close it by clicking outside or pressing Escape.</p>
								<Cluster gap="sm" style="justify-content: flex-end;">
									<Button variant="secondary" onclick={() => (isModalOpen = false)}>Cancel</Button>
									<Button variant="primary" onclick={() => (isModalOpen = false)}>Confirm</Button>
								</Cluster>
							</Stack>
						</Modal>
					</div>

					<Divider />

					<!-- Pagination -->
					<div>
						<h3>Pagination</h3>
						<Center>
							<Pagination bind:currentPage totalPages={10} />
						</Center>
					</div>

					<Divider />

					<!-- Table -->
					<div>
						<h3>Table</h3>
						<Table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Email</th>
									<th>Role</th>
								</tr>
							</thead>
							<tbody>
								{#each tableData as row}
									<tr>
										<td>{row.id}</td>
										<td>{row.name}</td>
										<td>{row.email}</td>
										<td>
											<Badge variant={row.role === 'Admin' ? 'primary' : 'default'}>
												{row.role}
											</Badge>
										</td>
									</tr>
								{/each}
							</tbody>
						</Table>
					</div>

					<Divider />

					<!-- Tabs -->
					<div>
						<h3>Tabs</h3>
						<Tabs>
							<TabList>
								<Tab>Overview</Tab>
								<Tab>Features</Tab>
								<Tab>Pricing</Tab>
							</TabList>
							<TabPanel>
								<Stack gap="md">
									<h4>Overview</h4>
									<p>Get started with our comprehensive component library.</p>
								</Stack>
							</TabPanel>
							<TabPanel>
								<Stack gap="md">
									<h4>Features</h4>
									<ul>
										<li>Built with Svelte 5 Runes</li>
										<li>TypeScript support</li>
										<li>Accessible components</li>
										<li>Dark mode ready</li>
									</ul>
								</Stack>
							</TabPanel>
							<TabPanel>
								<Stack gap="md">
									<h4>Pricing</h4>
									<p>Free and open source!</p>
								</Stack>
							</TabPanel>
						</Tabs>
					</div>

					<Divider />

					<!-- Tooltip -->
					<div>
						<h3>Tooltip</h3>
						<Cluster gap="md">
							<Tooltip content="This is a tooltip">
								<Button>Hover me</Button>
							</Tooltip>
							<Tooltip content="Top position" position="top">
								<Button variant="secondary">Top</Button>
							</Tooltip>
							<Tooltip content="Right position" position="right">
								<Button variant="accent">Right</Button>
							</Tooltip>
						</Cluster>
					</div>
				</Stack>
			</section>

			<Divider />

			<!-- Layout Components Section -->
			<section id="layout-components">
				<Stack gap="xl">
					<h2>Layout Components</h2>

					<!-- Stack -->
					<div>
						<h3>Stack (Vertical Layout)</h3>
						<Card>
							<Stack gap="md">
								<div style="padding: 1rem; background: var(--color-primary); color: white; border-radius: var(--radius-sm);">
									Item 1
								</div>
								<div style="padding: 1rem; background: var(--color-secondary); color: white; border-radius: var(--radius-sm);">
									Item 2
								</div>
								<div style="padding: 1rem; background: var(--color-accent); color: white; border-radius: var(--radius-sm);">
									Item 3
								</div>
							</Stack>
						</Card>
					</div>

					<Divider />

					<!-- Cluster -->
					<div>
						<h3>Cluster (Horizontal Layout)</h3>
						<Card>
							<Cluster gap="md">
								<Badge variant="primary">Badge 1</Badge>
								<Badge variant="secondary">Badge 2</Badge>
								<Badge variant="success">Badge 3</Badge>
								<Badge variant="warning">Badge 4</Badge>
								<Badge variant="error">Badge 5</Badge>
							</Cluster>
						</Card>
					</div>

					<Divider />

					<!-- Grid -->
					<div>
						<h3>Grid</h3>
						<Grid columns={3} gap="md">
							{#each Array(6) as _, i}
								<Card>
									<Center>
										<h4>Grid Item {i + 1}</h4>
									</Center>
								</Card>
							{/each}
						</Grid>
					</div>

					<Divider />

					<!-- Flex -->
					<div>
						<h3>Flex</h3>
						<Card>
							<Flex justify="space-between" align="center">
								<div>
									<h4>Flexible Layout</h4>
									<p style="color: var(--color-text-muted);">Items distributed with space-between</p>
								</div>
								<Button>Action</Button>
							</Flex>
						</Card>
					</div>

					<Divider />

					<!-- Split -->
					<div>
						<h3>Split Layout</h3>
						<Split gap="lg">
							<Card>
								<h4>Left Side</h4>
								<p>Content on the left</p>
							</Card>
							<Card>
								<h4>Right Side</h4>
								<p>Content on the right</p>
							</Card>
						</Split>
					</div>

					<Divider />

					<!-- Center -->
					<div>
						<h3>Center</h3>
						<Card>
							<Center>
								<Stack gap="md" style="text-align: center;">
									<Avatar fallback="CT" size="xl" />
									<h4>Centered Content</h4>
									<p>Everything is centered</p>
								</Stack>
							</Center>
						</Card>
					</div>

					<Divider />

					<!-- AspectRatio -->
					<div>
						<h3>Aspect Ratio</h3>
						<Grid columns={3} gap="md">
							<AspectRatio ratio="16/9">
								<div style="background: linear-gradient(135deg, var(--color-primary), var(--color-accent)); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: white;">
									16:9
								</div>
							</AspectRatio>
							<AspectRatio ratio="4/3">
								<div style="background: linear-gradient(135deg, var(--color-secondary), var(--color-primary)); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: white;">
									4:3
								</div>
							</AspectRatio>
							<AspectRatio ratio="1/1">
								<div style="background: linear-gradient(135deg, var(--color-accent), var(--color-secondary)); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: white;">
									1:1
								</div>
							</AspectRatio>
						</Grid>
					</div>
				</Stack>
			</section>

			<Divider />

			<!-- Theme Section -->
			<section id="theme">
				<Stack gap="lg">
					<h2>Theme System</h2>

					<div>
						<h3>Color Palette</h3>
						<Grid columns={3} gap="md">
							<Card>
								<Center>
									<div style="padding: 2rem; background: var(--color-primary); color: var(--color-primary-text); border-radius: var(--radius-md); width: 100%;">
										Primary
									</div>
								</Center>
							</Card>
							<Card>
								<Center>
									<div style="padding: 2rem; background: var(--color-secondary); color: var(--color-secondary-text); border-radius: var(--radius-md); width: 100%;">
										Secondary
									</div>
								</Center>
							</Card>
							<Card>
								<Center>
									<div style="padding: 2rem; background: var(--color-accent); color: var(--color-accent-text); border-radius: var(--radius-md); width: 100%;">
										Accent
									</div>
								</Center>
							</Card>
						</Grid>
					</div>

					<div>
						<h3>Theme Switcher</h3>
						<Cluster gap="sm">
							<Button onclick={() => setTheme('auto')}>Auto</Button>
							<Button variant="secondary" onclick={() => setTheme('light')}>Light</Button>
							<Button variant="accent" onclick={() => setTheme('dark')}>Dark</Button>
						</Cluster>
					</div>
				</Stack>
			</section>

			<!-- Footer -->
			<Divider />
			<Center>
				<Stack gap="sm" style="text-align: center; padding: 2rem 0;">
					<p style="color: var(--color-text-muted);">
						Built with Svelte 5 • TypeScript • SvelteKit
					</p>
					<Cluster gap="md" style="justify-content: center;">
						<a href="/docs" style="color: var(--color-link);">Documentation</a>
						<a href="/storybook" style="color: var(--color-link);">Storybook</a>
						<a href="https://github.com" style="color: var(--color-link);">GitHub</a>
					</Cluster>
				</Stack>
			</Center>
		</Stack>
	</Container>
</main>

<style>
	main {
		padding: 2rem 0;
	}

	h2 {
		font-size: 2rem;
		margin: 0;
	}

	h3 {
		font-size: 1.5rem;
		margin: 0 0 1rem 0;
	}

	h4 {
		font-size: 1.125rem;
		margin: 0;
	}

	p {
		margin: 0;
		line-height: 1.6;
	}

	a {
		text-decoration: none;
		transition: opacity var(--transition-fast);
	}

	a:hover {
		opacity: 0.8;
	}
</style>
