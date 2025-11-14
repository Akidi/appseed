<script lang="ts" context="module">
  import type { Meta } from '@storybook/svelte';
  import Show from './Show.svelte';

  export const meta: Meta<typeof Show> = {
    title: 'Layout/Show',
    component: Show,
    tags: ['autodocs']
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
  <Show>
    <div style="padding: 1rem; background: var(--color-surface); border-radius: var(--radius-md);">
      Content
    </div>
  </Show>
</Story>
