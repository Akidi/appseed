<script lang="ts" context="module">
  import type { Meta } from '@storybook/svelte';
  import Split from './Split.svelte';

  export const meta: Meta<typeof Split> = {
    title: 'Layout/Split',
    component: Split,
    tags: ['autodocs']
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
  <Split>
    <div style="padding: 1rem; background: var(--color-surface); border-radius: var(--radius-md);">
      Content
    </div>
  </Split>
</Story>
