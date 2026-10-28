import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit({
      extensions: ['.svelte', '.svx'],
      preprocess: [mdsvex({ extensions: ['.svx'], layout: { runbook: new URL('./src/lib/layouts/runbook.svelte', import.meta.url).pathname } })],
      adapter: adapter(),
      alias: { '#lib': 'src/lib' },
      prerender: { entries: ['*'], handleHttpError: 'warn' },
      inlineStyleThreshold: Infinity,
    }),
  ],
});
