import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import type { ConfigEnv, UserConfigExport } from 'vite';
import { name } from '../../package.json';

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
        // '@/': `${path.resolve(__dirname, 'src')}/`,
        '@ideaz/shared': path.resolve(
          __dirname,
          '../../packages/shared/src/index.ts'
        ),
        '@ideaz/hooks': path.resolve(
          __dirname,
          '../../packages/hooks/src/index.ts'
        ),
        '@ideaz/utils': path.resolve(
          __dirname,
          '../../packages/utils/src/index.ts'
        ),
        '@ideaz/pro-checkbox': path.resolve(
          __dirname,
          '../../packages/checkbox/src/index.tsx'
        ),
      },
    },
    optimizeDeps: {
      exclude: ['vue-demi'],
    },
    plugins: [
      AutoImport({
        // targets to transform
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        dirs: ['packages/hooks/src'],
        // global imports to register
        imports: [
          // presets
          'vue',
        ],
      }),
      vue(),
      vueJsx(),
      {
        name: 'html-transform',
        transformIndexHtml(html: string) {
          return html
            .replace(/\{\{NAME\}\}/, name)
            .replace(/\{\{VUE_VERSION\}\}/g, '3');
        },
      },
    ],
  };
};
