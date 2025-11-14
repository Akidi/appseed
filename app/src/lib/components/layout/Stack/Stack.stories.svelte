<script lang="ts" context="module">
  import type { Meta } from '@storybook/svelte';
  import Stack from './Stack.svelte';

  export const meta: Meta<typeof Stack> = {
    title: 'Layout/Stack',
    component: Stack,
    tags: ['autodocs']
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
  <Stack>
    <div style="padding: 1rem; background: var(--color-surface); border-radius: var(--radius-md);">
      Content
    </div>
  </Stack>
</Story>
