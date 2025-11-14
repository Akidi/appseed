<script lang="ts" context="module">
  import type { Meta } from '@storybook/svelte';
  import AspectRatio from './AspectRatio.svelte';

  export const meta: Meta<typeof AspectRatio> = {
    title: 'Layout/AspectRatio',
    component: AspectRatio,
    tags: ['autodocs']
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
  <AspectRatio>
    <div style="padding: 1rem; background: var(--color-surface); border-radius: var(--radius-md);">
      Content
    </div>
  </AspectRatio>
</Story>
