<script lang="ts" context="module">
  import type { Meta } from '@storybook/svelte';
  import Container from './Container.svelte';

  export const meta: Meta<typeof Container> = {
    title: 'Layout/Container',
    component: Container,
    tags: ['autodocs']
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
  <Container>
    <div style="padding: 1rem; background: var(--color-surface); border-radius: var(--radius-md);">
      Content
    </div>
  </Container>
</Story>
