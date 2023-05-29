import path from 'node:path'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import transformerDirective from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

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
    Unocss({
      transformers: [transformerVariantGroup(), transformerDirective()],
    }),
  ],
})
