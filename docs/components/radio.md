# Radio 单选框

> 单选框封装，和`z-form`组件配合食用，味道更佳。

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

const radioVal = ref(1)
</script>

<template>
  <z-radio v-model="radioVal" :options="options" />
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

const radioVal = ref(1)
</script>

<template>
  <z-radio v-model="radioVal" :options="options" />
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

const radioVal = ref(1)
</script>

<template>
  <z-radio v-model="radioVal" :disabled="true" :options="options" />
</template>
```

:::

## 键值对配置

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { title: '选项一', key: 1 },
  { title: '选项二', key: 2 },
  { title: '选项三', key: 3 }
])

const alias = {
  label: 'title',
  value: 'key'
}

const radioVal = ref(1)
</script>

<template>
  <z-radio v-model="radioVal" :alias="alias" :options="options" />
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
  { label: '选项三', value: 3, type: 'radio-button' }
])

const radioVal = ref(1)
</script>

<template>
  <div class="flex flex-col">
    <z-radio v-model="radioVal" type="radio-button" :options="options" />
    <z-radio v-model="radioVal" :options="options" class="mt-4" />
  </div>
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

const radioVal = ref(1)
</script>

<template>
  <div class="flex flex-col">
    <z-radio v-model="radioVal" :options="options" />
    <z-radio v-model="radioVal" :border="true" :options="options" class="mt-4" />
  </div>
</template>
```

:::

## z-radio 属性

| 属性名                | 说明                                     | 类型                            | 默认值  |
| :-------------------- | :--------------------------------------- | :------------------------------ | :------ |
| model-value / v-model | 绑定值                                   | `string` / `number` / `boolean` | —       |
| options | 可配置项                                   | `array` | —       |
| type | Radio 形式                                   | `string` | radio       |
| alias | 键值对配置                                   | `object` | `{ label: 'label', value: 'value', disabled: 'disabled' }`       |
| border | 是否显示边框                                   | `boolean` | false       |
| size                  | 单选框按钮或边框按钮的大小               | `string`                        | default |
| disabled              | 是否禁用                                 | `boolean`                       | false   |
| text-color            | 按钮形式的 Radio 激活时的文本颜色        | `string`                        | #ffffff |
| fill                  | 按钮形式的 Radio 激活时的填充色和边框色  | `string`                        | #409EFF |
| validate-event        | 输入时是否触发表单的校验                 | `boolean`                       | true    |
| name                  | 原生 `name` 属性                         | `string`                        | —       |
| id                    | 原生 `id` 属性                           | `string`                        | —       |

## z-radio 事件

| 事件名 | 说明                     | 类型       |
| :----- | :----------------------- | :--------- |
| change | 当绑定值变化时触发的事件 | `Function` |

## Options 项可配置属性

| 属性名                | 说明             | 类型                            | 默认值 |
| :-------------------- | :--------------- | :------------------------------ | :----- |
| value                 | 单选框的绑定值       | `string` / `number` / `boolean` | —      |
| label                 | 单选框的文案       | `string` | —      |
| disabled              | 是否禁用单选框   | `boolean`                       | false  |
| border                | 是否显示边框     | `boolean`                       | false  |
| size                  | 单选框的尺寸     | `enum`                          | —      |
| name                  | 原始 `name` 属性 | `string`                        | —      |
| type                  | Radio 形式 | `string`                        | el-radio      |
