# 快速开始
本节将介绍如何在项目中使用 Ideaz Element。

## 安装

### 使用包管理器
我们建议您使用包管理器（如`NPM、Yarn 或 pnpm`）安装 Ideaz Element，然后您就可以使用打包工具，例如 Vite 或 webpack。

``` sh
npm install ideaz-element --save
```

```sh
yarn add ideaz-element
```

```sh
pnpm install ideaz-element
```

## 用法
### 完整引入
如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

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

### 手动导入
Ideaz Element 提供了基于 `ES Module` 的开箱即用的 `Tree Shaking` 功能。

```vue
<script>
import { ZSelect } from 'ideaz-element'
export default {
  components: { ZSelect },
}
</script>

<template>
  <ZSelect value="1" :options="[{ label: '1', value: '1' }, { label: '2', value: '2' }]" />
</template>
```

## 全局配置

Ideaz Element 提供了强大的全局配置功能，允许你为组件设置默认属性。

### 基础配置

在引入 Ideaz Element 时，可以传入一个包含 size 和 locale 属性的全局配置对象：

```js
import { createApp } from 'vue'
import IdeazElement from 'ideaz-element'
import zhCn from 'ideaz-element/es/locale/lang/zh-cn'
import App from './App.vue'

const app = createApp(App)
app.use(IdeazElement, { locale: zhCn, size: 'default' })
```

### 高级全局配置

在 `app.use()` 时直接传入全局配置对象：

```js
import { createApp } from 'vue'
import IdeazElement from 'ideaz-element'
import zhCn from 'ideaz-element/es/locale/lang/zh-cn'
import 'ideaz-element/theme-chalk/index.css'
import App from './App.vue'

const app = createApp(App)

// 使用 app.use 设置全局配置
app.use(IdeazElement, {
  // 基础配置
  locale: zhCn,
  size: 'small',

  // 表格组件默认配置
  table: {
    stripe: true,
    border: true,
  },

  // 表单组件默认配置
  form: {
    labelPosition: 'left',
    labelWidth: '100px',
    colon: true
  },

  // CRUD 组件默认配置
  crud: {
    size: 'small',
    action: true
  }
})

app.mount('#app')
```

设置全局配置后，所有组件都会自动应用这些默认值：

```vue
<template>
  <!-- 表格会自动应用 stripe、border 等全局配置 -->
  <z-table :columns="columns" />

  <!-- 表单会自动应用 labelWidth、colon 等全局配置 -->
  <z-form :columns="formColumns" v-model="formData" />
</template>
```

更多全局配置选项请参考 [全局配置文档](./global-config.md)。

**注意**：使用 `app.use()` 方式配置的全局属性会在组件库初始化时生效，无需额外调用 `setGlobalConfig` 方法。
