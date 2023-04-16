import path from 'node:path';
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue/macros'],
      dts: '../auto-imports.d.ts',
      dirs: ['../packages/hooks'],
      vueTemplate: true,
    }),
  ],
});
