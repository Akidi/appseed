<script lang="ts" context="module">
  import type { Meta } from '@storybook/svelte';
  import CardGrid from './CardGrid.svelte';

  export const meta: Meta<typeof CardGrid> = {
    title: 'Layout/CardGrid',
    component: CardGrid,
    tags: ['autodocs']
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
  <CardGrid>
    <div style="padding: 1rem; background: var(--color-surface); border-radius: var(--radius-md);">
      Content
    </div>
  </CardGrid>
</Story>
