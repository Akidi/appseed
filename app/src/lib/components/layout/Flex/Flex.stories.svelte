<script lang="ts" context="module">
  import type { Meta } from '@storybook/svelte';
  import Flex from './Flex.svelte';

  export const meta: Meta<typeof Flex> = {
    title: 'Layout/Flex',
    component: Flex,
    tags: ['autodocs']
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
  <Flex>
    <div style="padding: 1rem; background: var(--color-surface); border-radius: var(--radius-md);">
      Content
    </div>
  </Flex>
</Story>
