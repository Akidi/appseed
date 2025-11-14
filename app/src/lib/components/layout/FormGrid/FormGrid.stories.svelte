<script lang="ts" context="module">
  import type { Meta } from '@storybook/svelte';
  import FormGrid from './FormGrid.svelte';

  export const meta: Meta<typeof FormGrid> = {
    title: 'Layout/FormGrid',
    component: FormGrid,
    tags: ['autodocs']
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
  <FormGrid>
    <div style="padding: 1rem; background: var(--color-surface); border-radius: var(--radius-md);">
      Content
    </div>
  </FormGrid>
</Story>
