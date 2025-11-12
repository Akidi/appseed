<script lang="ts">
  function setTheme(theme: string) {
    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>

<main id="main-content" style="max-width: 800px; margin: 0 auto; padding: 2rem;">
	<h1>Theme System Example</h1>

	<section style="margin-bottom: 2rem;">
		<h2>Color Swatches</h2>
		<div
			style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem;"
		>
			<div
				style="background-color: var(--color-primary); color: var(--color-primary-text); padding: 1rem; border-radius: var(--radius-md);"
			>
				Primary
			</div>
			<div
				style="background-color: var(--color-secondary); color: var(--color-secondary-text); padding: 1rem; border-radius: var(--radius-md);"
			>
				Secondary
			</div>
			<div
				style="background-color: var(--color-accent); color: var(--color-accent-text); padding: 1rem; border-radius: var(--radius-md);"
			>
				Accent
			</div>
		</div>

		<div
			style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;"
		>
			<div
				style="background-color: var(--color-success-bg); color: var(--color-success-text); padding: 1rem; border-radius: var(--radius-md); border: 2px solid var(--color-success);"
			>
				Success
			</div>
			<div
				style="background-color: var(--color-warning-bg); color: var(--color-warning-text); padding: 1rem; border-radius: var(--radius-md); border: 2px solid var(--color-warning);"
			>
				Warning
			</div>
			<div
				style="background-color: var(--color-error-bg); color: var(--color-error-text); padding: 1rem; border-radius: var(--radius-md); border: 2px solid var(--color-error);"
			>
				Error
			</div>
			<div
				style="background-color: var(--color-info-bg); color: var(--color-info-text); padding: 1rem; border-radius: var(--radius-md); border: 2px solid var(--color-info);"
			>
				Info
			</div>
		</div>
	</section>

	<section style="margin-bottom: 2rem;">
		<h2>Typography</h2>
		<p>This is a paragraph with <a href="#l1">a link</a> and some <code>inline code</code>.</p>
		<h3>This is a heading 3</h3>
		<h4>This is a heading 4</h4>
		<ul>
			<li>List item one</li>
			<li>List item two</li>
			<li>List item three</li>
		</ul>
	</section>

	<section style="margin-bottom: 2rem;">
		<h2>Theme Switcher</h2>
		<p>Use these buttons to test theme switching:</p>
		<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
			<button
				onclick={() => setTheme('auto')}
				style="background-color: var(--color-primary); color: var(--color-primary-text); padding: 0.5rem 1rem; border-radius: var(--radius-md);"
			>
				Auto (System)
			</button>
			<button
				onclick={() => setTheme('light')}
				style="background-color: var(--color-secondary); color: var(--color-secondary-text); padding: 0.5rem 1rem; border-radius: var(--radius-md);"
			>
				Force Light
			</button>
			<button
				onclick={() => setTheme('dark')}
				style="background-color: var(--color-accent); color: var(--color-accent-text); padding: 0.5rem 1rem; border-radius: var(--radius-md);"
			>
				Force Dark
			</button>
		</div>
	</section>

	<section>
		<h2>Surface Examples</h2>
		<div
			style="background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-md);"
		>
			<h3>Card Surface</h3>
			<p style="color: var(--color-text-muted);">
				This demonstrates a surface with border and shadow.
			</p>
		</div>
	</section>
</main>
