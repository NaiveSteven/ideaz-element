/// <reference types="vitest" />

import path from 'node:path'
import fs from 'node:fs'
// import fsExtra from 'fs-extra'
import AutoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { build, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
// import vueJsx from '@vitejs/plugin-vue2-jsx';

const __dirname = path.resolve()

const entryDir = path.resolve(__dirname, 'packages')
const outputDir = path.resolve(__dirname, 'lib')

const rollupOptions = {
  external: ['vue', 'vuedraggable'],
  output: {
    globals: {
      vue: 'Vue',
      vuedraggable: 'vuedraggable',
    },
  },
}

const spliceStr = (str, startIndex, num) => {
  const arr = str.split('')
  arr.splice(startIndex, num)
  return arr.join('')
}

const buildAll = async () => {
  await build(
    defineConfig({
      configFile: false,
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
          // include: [
          //   'common/config/src',
          //   'components',
          //   'directives',
          //   'index.ts',
          //   'full-lib.ts',
          //   'types.d.ts',
          // ],
          entryRoot: path.resolve(entryDir, 'element/index.ts'),
          exclude: ['node_modules'],
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
          aliasesExclude: [/^@vexip-ui\/(bem-helper|utils|hooks|config)/],
        }),
      ],
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(entryDir, 'element/index.ts'),
          name: 'index',
          fileName: 'index',
          formats: ['es', 'umd'],
        },
        outDir: 'dist',
      },
    }),
  )
}

const buildSingle = async (name, isLast) => {
  const entry = path.resolve(__dirname, 'packages/element')
  await build(
    defineConfig({
      configFile: false,
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
      ],
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(entry, name),
          name: 'index',
          fileName: 'index',
          formats: ['es', 'umd'],
        },
        outDir: path.resolve(__dirname, `lib/element/${name}`),
      },
    }),
  )
}

const buildLib = async () => {
  await buildAll()
  const entry = path.resolve(__dirname, 'packages/element')

  const components = fs.readdirSync(entry).filter((name) => {
    if (!['types'].includes(name)) {
      const componentDir = path.resolve(entry, name)
      const isDir = fs.lstatSync(componentDir).isDirectory()
      return isDir && fs.readdirSync(componentDir).includes('index.ts')
    }
    return false
  })

  for (const [index, name] of components.entries())
    await buildSingle(name, index === components.length - 1)

  // createPackageJson(name)
}

buildLib()
