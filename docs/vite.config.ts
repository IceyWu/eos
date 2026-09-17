import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { fumadocsMdx } from 'fumadocs-mdx/vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [fumadocsMdx(), tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      '@eosjs/ui': fileURLToPath(new URL('../packages/ui/src/index.ts', import.meta.url)),
      '@eosjs/utils': fileURLToPath(new URL('../packages/utils/src/index.ts', import.meta.url)),
    },
  },
});
