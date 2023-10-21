import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'

export default defineConfig({
  plugins: [
    VueJsx(),
    Vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue/macros'],
      dts: './auto-imports.d.ts',
      dirs: ['./packages/hooks'],
      vueTemplate: true,
    }),
    // VueMacros({
    //   plugins: {
    //     vue: Vue(),
    //     vueJsx: VueJsx(),
    //   },
    // }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
})
