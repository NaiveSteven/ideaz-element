# Checkbox 多选框

> 多选框封装，和`z-form`组件配合食用，味道更佳。

## 基础用法

传入`options`自动生成选项

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3 }
])

const checkboxVal = ref([1])

const click = () => {
  options.value.push({ label: '选项四', value: 4 })
}
</script>

<template>
  <el-button @click="click">
    点击
  </el-button>
  <z-checkbox v-model="checkboxVal" :options="options" />
</template>
```

:::

## 禁用

`option`中的某项设置`disabled`为`true`

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2, disabled: true },
  { label: '选项三', value: 3 }
])

const checkboxVal = ref([1])
</script>

<template>
  <z-checkbox v-model="checkboxVal" :options="options" />
</template>
```

:::

全部禁用，组件传入`disabled`为`true`

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3 }
])

const checkboxVal = ref([1])
</script>

<template>
  <z-checkbox v-model="checkboxVal" :disabled="true" :options="options" />
</template>
```

:::

## 键值对配置

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { data: { title: '选项一' }, key: 1 },
  { data: { title: '选项二' }, key: 2 },
  { data: { title: '选项三' }, key: 3 }
])

const alias = {
  label: 'data.title',
  value: 'key'
}

const checkboxVal = ref([1])
</script>

<template>
  <z-checkbox v-model="checkboxVal" :alias="alias" :options="options" />
</template>
```

:::

## 按钮样式

给`option`某项设置`type`或者直接组件传入`type`

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3, type: 'checkbox-button' }
])

const checkboxVal = ref([1])
</script>

<template>
  <z-checkbox v-model="checkboxVal" type="checkbox-button" :options="options" />
  <z-checkbox v-model="checkboxVal" :options="options" class="mt-4" />
</template>
```

:::

## 带有边框

`border`属性或者字段可以渲染为带有边框的多选框。

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: '选项一', value: 1, border: true },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3 }
])

const checkboxVal = ref([1])
</script>

<template>
  <z-checkbox v-model="checkboxVal" :options="options" />
  <z-checkbox v-model="checkboxVal" :border="true" :options="options" class="mt-4" />
</template>
```

:::

## z-checkbox 属性

| 属性名                | 说明                               | 类型      | 默认值  |
| :-------------------- | :--------------------------------- | :-------- | :------ |
| model-value / v-model | 绑定值                             | `array`  | []      |
| options | 可配置项                                   | `array` | —       |
| type | checkbox 形式                                   | `string` | el-checkbox       |
| alias | 键值对配置                                   | `object` | `{ label: 'label', value: 'value', disabled: 'disabled' }`       |
| border | 是否显示边框                                   | `boolean` | false       |
| size                  | 多选框组尺寸                       | `enum`    | —       |
| disabled              | 是否禁用                           | `boolean` | false   |
| min                   | 可被勾选的 checkbox 的最小数量     | `number`  | —       |
| max                   | 可被勾选的 checkbox 的最大数量     | `number`  | —       |
| label                 | 为屏幕阅读器准备的标签             | `string`  | —       |
| text-color            | 当按钮为活跃状态时的字体颜色       | `string`  | #ffffff |
| fill                  | 当按钮为活跃状态时的边框和背景颜色 | `string`  | #409EFF |
| tag                   | 复选框组元素标签                   | `string`  | div     |
| validate-event        | 是否触发表单验证                   | `boolean` | true    |

## z-checkbox 事件

| 事件名 | 说明                     | 类型       |
| :----- | :----------------------- | :--------- |
| change | 当绑定值变化时触发的事件 | `Function` |

## Options 项可配置属性

| 属性名                | 说明                                                         | 类型                                       | 默认值 |
| :-------------------- | :----------------------------------------------------------- | :----------------------------------------- | :----- |
| value | 选中项绑定值                                                 | `string` / `number` / `boolean`            | —      |
| label                 | 文案 | `string` | —      |
| trueLabel            | 选中时的值                                                   | `string` / `number`                        | —      |
| falseLabel           | 没有选中时的值                                               | `string` / `number`                        | —      |
| disabled              | 是否禁用                                                     | `boolean`                                  | false  |
| border                | 是否显示边框                                                 | `boolean`                                  | false  |
| size                  | Checkbox 的尺寸                                              | `enum`                                     | —      |
| name                  | 原生 name 属性                                               | `string`                                   | —      |
| id                    | input id                                                     | `string`                                   | —      |
| type                    | Checkbox 形式                                                     | `string`                                   | el-checkbox      |
