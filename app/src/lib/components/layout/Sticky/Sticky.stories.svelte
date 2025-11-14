<script lang="ts" context="module">
  import type { Meta } from '@storybook/svelte';
  import Sticky from './Sticky.svelte';

  export const meta: Meta<typeof Sticky> = {
    title: 'Layout/Sticky',
    component: Sticky,
    tags: ['autodocs']
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
  <Sticky>
    <div style="padding: 1rem; background: var(--color-surface); border-radius: var(--radius-md);">
      Content
    </div>
  </Sticky>
</Story>
