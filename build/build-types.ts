import path, { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

const __dirname = fileURLToPath(new URL('..', import.meta.url))
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))
const externalPkgs = ['@vue'].concat(
  // Object.keys(pkg.dependencies || {}),
  Object.keys(pkg.peerDependencies || {}),
)
const external = id => externalPkgs.some(p => p === id || id.startsWith(`${p}/`)) || id.includes('element-plus') || id.includes('vitest')

;(async () => {
  await build({
    root: path.resolve(__dirname, './'),
    publicDir: false,
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: ['vue', 'vue-router', 'vue/macros', '@vueuse/core'],
        dts: 'auto-imports.d.ts',
        dirs: ['packages/hooks/src'],
        vueTemplate: true,
      }),
      dts({
        include: ['packages', 'auto-imports.d.ts', 'index.ts'],
        beforeWriteFile(filePath, content) {
          filePath = filePath.replace('/packages', '')
          return {
            filePath,
            content,
          }
        },
        exclude: ['node_modules', 'packages/element/**/__tests__/**'],
        outDir: 'dist',
        compilerOptions: {
          sourceMap: false,
          // paths: {
          //   '@/*': ['./*'],
          //   '@vexip-ui/config': ['common/config/src'],
          //   'vexip-ui': ['.'],
          //   'vue-router': ['node_modules/vue-router'],
          //   'csstype': ['node_modules/csstype'],
          // },
        },
        copyDtsFiles: true,
        pathsToAliases: false,
        // aliasesExclude: [/^@vexip-ui\/(bem-helper|utils|hooks|config)/],
      }),
    ],
    build: {
      sourcemap: true,
      rollupOptions: {
        external,
        treeshake: false,
      },
      lib: {
        entry: path.resolve(__dirname, 'index.ts'),
        name: 'index',
        fileName: 'index',
        formats: ['es', 'cjs'],
      },
      outDir: path.resolve(__dirname, 'dist'),
      commonjsOptions: {
        sourceMap: false,
      },
      chunkSizeWarningLimit: 10000,
    },
  })
})()
