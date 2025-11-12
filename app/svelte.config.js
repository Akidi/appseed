import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex()],
	kit: {
		adapter: adapter(),
		csrf: {
			trustedOrigins: ['http://localhost:5173']
		},
		csp: {
      directives: {
        'script-src': ['self']
      },
			mode: 'auto',			
      reportOnly: {
        'script-src': ['self'],
        'report-uri': ['/']
      }
    }
	},
	extensions: ['.svelte', '.svx']
};

export default config;
