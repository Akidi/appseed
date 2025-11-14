<script lang="ts" context="module">
  import type { Meta } from '@storybook/svelte';
  import Cluster from './Cluster.svelte';

  export const meta: Meta<typeof Cluster> = {
    title: 'Layout/Cluster',
    component: Cluster,
    tags: ['autodocs']
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
  <Cluster>
    <div style="padding: 1rem; background: var(--color-surface); border-radius: var(--radius-md);">
      Content
    </div>
  </Cluster>
</Story>
