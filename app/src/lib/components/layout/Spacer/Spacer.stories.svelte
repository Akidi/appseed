<script lang="ts" context="module">
  import type { Meta } from '@storybook/svelte';
  import Spacer from './Spacer.svelte';

  export const meta: Meta<typeof Spacer> = {
    title: 'Layout/Spacer',
    component: Spacer,
    tags: ['autodocs']
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
  <Spacer>
    <div style="padding: 1rem; background: var(--color-surface); border-radius: var(--radius-md);">
      Content
    </div>
  </Spacer>
</Story>
