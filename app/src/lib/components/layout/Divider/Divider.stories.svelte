<script lang="ts" context="module">
  import type { Meta } from '@storybook/svelte';
  import Divider from './Divider.svelte';

  export const meta: Meta<typeof Divider> = {
    title: 'Layout/Divider',
    component: Divider,
    tags: ['autodocs']
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
  <Divider>
    <div style="padding: 1rem; background: var(--color-surface); border-radius: var(--radius-md);">
      Content
    </div>
  </Divider>
</Story>
