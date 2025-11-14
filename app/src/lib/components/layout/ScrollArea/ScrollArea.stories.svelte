<script lang="ts" context="module">
  import type { Meta } from '@storybook/svelte';
  import ScrollArea from './ScrollArea.svelte';

  export const meta: Meta<typeof ScrollArea> = {
    title: 'Layout/ScrollArea',
    component: ScrollArea,
    tags: ['autodocs']
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
  <ScrollArea>
    <div style="padding: 1rem; background: var(--color-surface); border-radius: var(--radius-md);">
      Content
    </div>
  </ScrollArea>
</Story>
