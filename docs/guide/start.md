# 快速开始
本节将介绍如何在项目中使用 Ideaz Element。

## 用法
### 完整引入
如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```js
// main.ts
import { createApp } from 'vue'
import { installer } from 'ideaz-element'
import 'ideaz-element/dist/theme-chalk/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(installer)
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
在引入 Ideaz Element 时，可以传入一个包含 size 和 locale 属性的全局配置对象。 size 用于设置表单组件的默认尺寸，locale 用于设置默认语言。

完整引入：

```js
import { createApp } from 'vue'
import IdeazElement from 'ideaz-element'
import zhCn from 'ideaz-element/dist/locale/lang/zh-cn'
import App from './App.vue'

const app = createApp(App)
app.use(IdeazElement, { locale: zhCn, size: 'default' })
```
