/// <reference types="vitest" />

// import fs from 'node:fs'
import path, { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
// import fsExtra from 'fs-extra'
import AutoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import glob from 'fast-glob'
import MagicString from 'magic-string'
import { build } from 'vite'
import vue from '@vitejs/plugin-vue'

interface Manifest {
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  version?: string
}

const __dirname = fileURLToPath(new URL('..', import.meta.url))
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8')) as Manifest
const entryDir = path.resolve(__dirname, 'packages')
// const outputDir = path.resolve(__dirname, 'lib')

const externalPkgs = ['@vue'].concat(
  // Object.keys(pkg.dependencies || {}),
  Object.keys(pkg.peerDependencies || {}),
)
const external = id => externalPkgs.some(p => p === id || id.startsWith(`${p}/`)) || id.includes('element-plus') || id.includes('vitest')

;(async () => {
  let input = await glob('packages/element/**/*.{ts,vue}', {
    cwd: __dirname,
    absolute: true,
    onlyFiles: true,
  })
  input.push(resolve(__dirname, 'index.ts'))
  input = input.filter(path => !path.includes('__tests__'))

  await build({
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
        imports: ['vue', 'vue-router', 'vue/macros'],
        dts: 'auto-imports.d.ts',
        dirs: ['packages/hooks'],
        vueTemplate: true,
      }),
      generate(),
    ],
    esbuild: {
      drop: ['debugger'],
      pure: ['console.log'],
    },
    build: {
      sourcemap: true,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        name: 'ideaz-element',
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
  })
})()

function generate() {
  return {
    name: 'rewrite-path',
    generateBundle(outputOptions, bundle) {
      Object.keys(bundle).forEach((key) => {
        if (bundle[key].fileName?.includes('packages'))
          bundle[key].fileName = bundle[key].fileName.replace('packages/', '')
      })
    },
    renderChunk(code, chunk) {
      if (
        chunk.fileName === 'index.cjs' || chunk.fileName === 'index.mjs'
      ) {
        code = code.replaceAll('./packages', '.')
        return {
          code,
          map: new MagicString(code).generateMap(),
        }
      }
      if (chunk.fileName.includes('packages')) {
        code = code.replaceAll('../node_modules', 'node_modules')
        return {
          code,
          map: new MagicString(code).generateMap(),
        }
      }
    },
  }
}
