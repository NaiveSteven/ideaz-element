# 全局配置

Ideaz Element 提供了强大的全局配置功能，允许你为组件设置默认属性，减少重复代码并保持应用的一致性。

## 配置方式

有两种方式设置全局配置（目前支持`ZTable`、`ZForm`、`ZCrud`三个组件设置全局默认配置）：

1. **推荐方式**：在 `app.use()` 时直接传入配置对象（推荐用于应用初始化）
2. **动态方式**：使用 `setGlobalConfig()` 方法（适用于运行时动态更新）

## 基本用法

### 设置全局配置

```js
// main.ts
import { createApp } from 'vue'
import IdeazElement from 'ideaz-element'
import zhCn from 'ideaz-element/es/locale/lang/zh-cn'
import 'ideaz-element/theme-chalk/index.css'
import App from './App.vue'

const app = createApp(App)

// 使用 app.use 设置全局配置
app.use(IdeazElement, {
  // 通用配置
  locale: zhCn,
  size: 'small',

  // 表格组件全局配置
  table: {
    stripe: true,
    border: true,
  },

  // 表单组件全局配置
  form: {
    labelPosition: 'left',
    labelWidth: '100px',
    colon: true
  },

  // CRUD 组件全局配置
  crud: {
    action: true,
    search: true
  }
})

app.mount('#app')
```

### 在组件中使用

设置全局配置后，所有组件都会自动应用这些默认值：

```vue
<template>
  <!-- 表格会自动应用全局配置的 stripe、border、data 等属性 -->
  <z-table :columns="columns" />

  <!-- 表单会自动应用全局配置的 labelWidth、colon 等属性 -->
  <z-form :columns="formColumns" v-model="formData" />

  <!-- CRUD 会自动应用全局配置的 size、action 等属性 -->
  <z-crud :columns="crudColumns" />
</template>

<script setup>
const columns = [
  { prop: 'id', label: 'ID' },
  { prop: 'name', label: '姓名' },
  { prop: 'status', label: '状态' }
]

const formColumns = [
  { prop: 'name', label: '姓名', component: 'input' },
  { prop: 'email', label: '邮箱', component: 'input' }
]

const crudColumns = [
  { prop: 'id', label: 'ID' },
  { prop: 'name', label: '姓名', component: 'input' },
  { prop: 'status', label: '状态', component: 'select' }
]

const formData = ref({})
</script>
```

## 配置优先级

全局配置遵循以下优先级规则：

1. **用户显式传入的属性** - 最高优先级
2. **全局配置的属性** - 中等优先级
3. **组件默认值** - 最低优先级

```vue
<template>
  <!-- 即使全局配置了 stripe: true，这里显式设置为 false 会覆盖全局配置 -->
  <z-table :columns="columns" :stripe="false" />

  <!-- 没有显式传入 stripe，会使用全局配置的 stripe: true -->
  <z-table :columns="columns" />
</template>
```

## 动态更新全局配置

虽然推荐在 `app.use()` 时设置初始配置，但你仍然可以在运行时动态更新全局配置：

```js
import { getGlobalConfig, setGlobalConfig  } from 'ideaz-element'

// 获取当前全局配置
const currentConfig = getGlobalConfig()
console.log(currentConfig)

// 运行时动态更新全局配置
setGlobalConfig({
  table: {
    ...currentConfig.table,
    stripe: false,  // 关闭斑马纹
    pagination: { pageSize: 50 }  // 修改默认分页大小
  }
})

// 也可以只更新部分配置
setGlobalConfig({
  size: 'large'  // 只更新全局尺寸
})
```

**注意**：动态更新的配置会覆盖初始化时通过 `app.use()` 设置的配置。

## 最佳实践

### 1. 在应用入口统一配置

```js
// main.ts
import { createApp } from 'vue'
import IdeazElement from 'ideaz-element'

const app = createApp(App)

// 根据项目需求设置全局默认值
app.use(IdeazElement, {
  size: 'small',
  table: {
    stripe: true,
    border: true,
  },
  form: {
    labelPosition: 'left',
    labelWidth: '120px',
    colon: true
  }
})
```

### 2. 按模块设置不同配置

```js
// 管理后台配置
const adminConfig = {
  size: 'small',
  table: {
    stripe: true,
    toolBar: true
  },
  form: {
    labelPosition: 'left',
    labelWidth: '100px'
  }
}

// 移动端配置
const mobileConfig = {
  size: 'large',
  table: {
    border: false
  },
  form: {
    labelPosition: 'top',
    labelWidth: '80px'
  }
}

// 根据环境应用不同配置
app.use(IdeazElement, isMobile ? mobileConfig : adminConfig)
```

### 3. 合理使用优先级

```vue
<template>
  <!-- 大部分表格使用全局配置 -->
  <z-table :columns="columns" />

  <!-- 特殊表格覆盖全局配置 -->
  <z-table
    :columns="columns"
    :stripe="false"
    :pagination="false"
  />
</template>
```

## 注意事项

1. **响应式更新**：全局配置的更改会自动应用到所有使用该配置的组件
2. **类型安全**：配置项需要符合对应组件的 props 类型定义
3. **性能考虑**：合理设置默认数据，避免设置过大的默认数据集
4. **配置隔离**：不同页面或模块可以设置不同的全局配置

## API 参考

### app.use(IdeazElement, config)

推荐的全局配置方式，在应用初始化时设置。

- **参数**：
  - `IdeazElement`: 组件库实例
  - `config` (GlobalComponentConfig): 全局配置对象

### setGlobalConfig(config)

运行时动态设置全局配置。

- **参数**：
  - `config` (GlobalComponentConfig): 全局配置对象

### getGlobalConfig()

获取当前全局配置。

- **返回值**：GlobalComponentConfig

### 类型定义

```typescript
interface GlobalComponentConfig {
  // 通用配置
  size?: 'small' | 'default' | 'large'
  locale?: string

  // 组件配置
  table?: Partial<ITableProps>
  form?: Partial<FormProps>
  crud?: Partial<CrudProps>
}
```
