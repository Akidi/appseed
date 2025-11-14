<script lang="ts" context="module">
  import type { Meta } from '@storybook/svelte';
  import Center from './Center.svelte';

  export const meta: Meta<typeof Center> = {
    title: 'Layout/Center',
    component: Center,
    tags: ['autodocs']
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
  <Center>
    <div style="padding: 1rem; background: var(--color-surface); border-radius: var(--radius-md);">
      Content
    </div>
  </Center>
</Story>
