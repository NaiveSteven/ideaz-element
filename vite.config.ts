/// <reference types="vitest" />

import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import AutoImport from 'unplugin-auto-import/vite';
import Unocss from 'unocss/vite';
import transformerDirective from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import vueJsx from '@vitejs/plugin-vue2-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      // '@/': `${path.resolve(__dirname, 'src')}/`,
      '@ideaz/shared': path.resolve(__dirname, 'packages/shared/src/index.ts'),
      '@ideaz/hooks': path.resolve(__dirname, 'packages/hooks/src/index.ts'),
      '@ideaz/utils': path.resolve(__dirname, 'packages/utils/src/index.ts'),
      '@ideaz/pro-checkbox': path.resolve(
        __dirname,
        'packages/checkbox/src/index.tsx'
      ),
    },
  },
  plugins: [
    vue(),
    vueJsx({ compositionAPI: true }),
    // AutoImport({
    //   imports: ['vue', 'vue/macros', 'vue-router', '@vueuse/core'],
    //   dts: true,
    //   dirs: ['./src/composables'],
    //   vueTemplate: true,
    // }),

    // Components({
    //   dts: true,
    // }),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue/macros', '@vueuse/core'],
      dts: 'auto-imports.d.ts',
      dirs: ['packages/hooks/src'],
      vueTemplate: true,
    }),
    Unocss({
      transformers: [transformerVariantGroup(), transformerDirective()],
    }),
  ],
  test: {
    environment: 'jsdom',
  },
});
