/// <reference types="vitest" />

// import fs from 'node:fs'
import path, { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
// import fsExtra from 'fs-extra'
import AutoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import glob from 'fast-glob'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import dts from 'vite-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'
// import vueJsx from '@vitejs/plugin-vue2-jsx';

// interface Manifest {
//   dependencies?: Record<string, string>,
//   peerDependencies?: Record<string, string>,
//   version?: string
// }

const __dirname = path.resolve()
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))
const entryDir = path.resolve(__dirname, 'packages')
const outputDir = path.resolve(__dirname, 'lib')

const externalPkgs = ['@vue'].concat(
  Object.keys(pkg.dependencies || {}),
  Object.keys(pkg.peerDependencies || {}),
)
const external = id => externalPkgs.some(p => p === id || id.startsWith(`${p}/`))

// const rollupOptions = {
//   external: ['vue', 'vuedraggable'],
//   output: {
//     globals: {
//       vue: 'Vue',
//       vuedraggable: 'vuedraggable',
//     },
//   },
// }

export default defineConfig(async () => {
  const input = await glob('packages/element/**/*.{ts,vue}', {
    cwd: __dirname,
    absolute: true,
    onlyFiles: true,
  })

  input.push(resolve(__dirname, 'packages/element/index.ts'))
  return {
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
      // dts({
      //   // include: [
      //   //   'common/config/src',
      //   //   'components',
      //   //   'directives',
      //   //   'index.ts',
      //   //   'full-lib.ts',
      //   //   'types.d.ts',
      //   // ],
      //   entryRoot: path.resolve(entryDir, 'element/index.ts'),
      //   exclude: ['node_modules'],
      //   outDir: 'dist',
      //   compilerOptions: {
      //     sourceMap: false,
      //     // paths: {
      //     //   '@/*': ['./*'],
      //     //   '@vexip-ui/config': ['common/config/src'],
      //     //   'vexip-ui': ['.'],
      //     //   'vue-router': ['node_modules/vue-router'],
      //     //   'csstype': ['node_modules/csstype'],
      //     // },
      //   },
      //   copyDtsFiles: true,
      //   pathsToAliases: false,
      //   aliasesExclude: [/^@vexip-ui\/(bem-helper|utils|hooks|config)/],
      // }),
      visualizer({
        filename: 'temp/stats-[format].html',
        gzipSize: true,
        brotliSize: true,
      }),
      generate(),
    ],
    build: {
      sourcemap: true,
      lib: {
        entry: path.resolve(entryDir, 'element/index.ts'),
        name: 'ideaz-element',
        // fileName: 'index',
        // formats: ['es', 'umd'],
      },
      rollupOptions: {
        input,
        external,
        output: [
          {
            format: 'cjs',
            preserveModules: true,
            preserveModulesRoot: __dirname,
            dir: 'lib',
            entryFileNames: '[name].cjs',
          },
          {
            format: 'es',
            preserveModules: true,
            preserveModulesRoot: __dirname,
            dir: 'es',
            entryFileNames: '[name].mjs',
          },
        ],
        treeshake: false,
      },
      commonjsOptions: {
        sourceMap: false,
      },
      chunkSizeWarningLimit: 10000,

    },
  }
})

function generate() {
  return {
    name: 'rewrite-path',
    generateBundle(outputOptions, bundle) {
      Object.keys(bundle).forEach((key) => {
        if (bundle[key].fileName?.includes('packages'))
          bundle[key].fileName = bundle[key].fileName.replace('packages/', '')
      })
    },
  }
}

// const buildSingle = async (name, isLast) => {
//   const entry = path.resolve(__dirname, 'packages/element')
//   await build(
//     defineConfig({
//       configFile: false,
//       publicDir: false,
//       resolve: {
//         alias: {
//           '~/': `${path.resolve(__dirname, 'src')}/`,
//         },
//       },
//       plugins: [
//         vue(),
//         vueJsx(),
//         AutoImport({
//           imports: ['vue', 'vue-router', 'vue/macros', '@vueuse/core'],
//           dts: 'auto-imports.d.ts',
//           dirs: ['packages/hooks/src'],
//           vueTemplate: true,
//         }),
//       ],
//       build: {
//         rollupOptions,
//         lib: {
//           entry: path.resolve(entry, name),
//           name: 'index',
//           fileName: 'index',
//           formats: ['es', 'umd'],
//         },
//         outDir: path.resolve(__dirname, `lib/element/${name}`),
//       },
//     }),
//   )
// }

// const buildLib = async () => {
//   await buildAll()
//   const entry = path.resolve(__dirname, 'packages/element')

//   // const components = fs.readdirSync(entry).filter((name) => {
//   //   if (!['types'].includes(name)) {
//   //     const componentDir = path.resolve(entry, name)
//   //     const isDir = fs.lstatSync(componentDir).isDirectory()
//   //     return isDir && fs.readdirSync(componentDir).includes('index.ts')
//   //   }
//   //   return false
//   // })

//   // for (const [index, name] of components.entries())
//   //   await buildSingle(name, index === components.length - 1)

//   // createPackageJson(name)
// }

// buildLib()
