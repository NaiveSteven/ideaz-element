# The Last Naruto

![The Last Naruto Logo](./public/logo.webp)

[中文](https://juejin.cn/post/7122016953593495560)

# Features

- 👍 Support IE11 by [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)

- ⚡️ [Vue 2.7](https://github.com/vuejs/vue), [Vite 4](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [ESBuild](https://github.com/evanw/esbuild) - born with fastness

- 🗂 [File based routing](./src/pages)

- 📦 [Components auto importing](./src/components)

- 🎨 [UnoCSS](https://github.com/antfu/unocss) - The instant on-demand atomic CSS engine.

- 😃 Use icons from any icon sets in [Pure CSS](https://github.com/antfu/unocss/tree/main/packages/preset-icons)
  - IE11([partial support](./src/components/icons/README.md))

- 🔥 Use the [new `<script setup>` style](https://github.com/vuejs/rfcs/pull/227)

- ✅ Use [Vitest](http://vitest.dev/) for unit and components testing

- 🦾 TypeScript, of course

- ☁️ Deploy on Netlify, zero-config

# Pre-packed

### UI Frameworks

- [UnoCSS](https://github.com/antfu/unocss) - The instant on-demand atomic CSS engine.

### Icons

- [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)
  - IE11([partial support](./src/components/icons/README.md))
- [Pure CSS Icons via UnoCSS](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

### Plugins

- [Vue Router@3](https://github.com/vuejs/vue-router)
  - [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) - file system based routing
- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - Directly use Vue Composition API and others without importing
- [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - components auto import
- [VueUse](https://github.com/antfu/vueuse) - collection of useful composition APIs

## Try it now

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/luvletterldl/the-last-naruto/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit luvletterldl/the-last-naruto my-vue2.7
cd my-vue2.7
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

# Acknowledgement

[vitesse-lite](https://github.com/antfu/vitesse-lite)

[ie11CustomProperties](https://github.com/nuxodin/ie11CustomProperties)

<https://github.com/yehuozhili/bigbear-ui>
<https://github.com/Miguel-Bento-Github/vite-vue-ts-storybook/blob/main/.storybook/main.js>
<https://github.com/caoxiemeihao/vite-vue2-tsx-composition-api>

## Develop

1. [Install Deno](https://deno.land/manual/getting_started/installation)
2. Run `npm i -g @cloydlau/scripts`
3. Run `cl i` and choose pnpm
4. Run `cl dev3` / `cl dev2.7` / `cl dev2.6`

## pnpm

因此，如果想给 pkg1 安装一个依赖包，比如 axios，可以进行如下操作：

`pnpm add axios --filter pkg1`

执行 pkg1 下的 scripts 脚本

`pnpm build --filter pkg1`

执行所有 package 下的 build 命令

`pnpm build --filter "./packages/**"`

在 pkg1 中引用 pkg2

`pnpm install pkg2 -r --filter pkg2`
