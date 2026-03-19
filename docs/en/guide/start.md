# Quick Start
This section will introduce how to use Ideaz Element in your project.

## Installation

### Using Package Manager
We recommend using a package manager (such as `NPM, Yarn or pnpm`) to install Ideaz Element, then you can use bundling tools such as Vite or webpack.

``` sh
npm install ideaz-element --save
```

```sh
yarn add ideaz-element
```

```sh
pnpm install ideaz-element
```

## Usage
### Full Import
If you don't care much about the bundle size, using full import will be more convenient.

```js
// main.ts
import { createApp } from 'vue'
import { install } from 'ideaz-element'
import 'ideaz-element/theme-chalk/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(install)
app.mount('#app')
```

### On-demand Import
Ideaz Element provides out-of-the-box Tree Shaking functionality based on ES modules.

But you need to install [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) and [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) these two plugins.

```sh
npm install -D unplugin-vue-components unplugin-auto-import
```

Then add the code below into your `Vite` config file.

```js
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { IdeazElementResolver } from 'ideaz-element/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [IdeazElementResolver()],
    }),
    Components({
      resolvers: [IdeazElementResolver()],
    }),
  ],
})
```

## Global Configuration

When registering Ideaz Element, you can pass a global configuration object with the `size` and `zIndex` properties to set the default size for form components and the initial z-index value for popup components.

### Full Import
```js
import { createApp } from 'vue'
import { install } from 'ideaz-element'
import App from './App.vue'

const app = createApp(App)
app.use(install, { size: 'small', zIndex: 3000 })
```

### On-demand Import
```js
import { createApp } from 'vue'
import { IdeazConfigProvider } from 'ideaz-element'
import App from './App.vue'

const app = createApp(App)
app.provide(IdeazConfigProvider, { size: 'small', zIndex: 3000 })
```

## Let's Get Started

You can now start using Ideaz Element components in your project. For each component usage, please refer to the individual component documentation.

```vue
<template>
  <z-button>Hello World</z-button>
</template>
```
