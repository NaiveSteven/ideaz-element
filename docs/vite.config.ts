import path from 'node:path'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import { SearchPlugin } from 'vitepress-plugin-search'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  server: {
    port: 5174,
  },
  plugins: [
    vueJsx(),
    SearchPlugin(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue/macros'],
      dts: '../auto-imports.d.ts',
      dirs: ['../packages/hooks'],
      vueTemplate: true,
    }),
    Unocss(),
  ],
})
