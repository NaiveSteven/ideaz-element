# Descriptions 描述列表

> 基于数据驱动的描述列表封装

## 基础用法

通过配置`column`、传入`detail`数据即可实现描述列表

:::demo

```vue
<script lang="ts" setup>
const columns = [
  { label: 'Date', prop: 'date' },
  { label: 'Name', prop: 'name' },
  { label: 'Address', prop: 'address' },
]
const detail = {
  date: '2016-05-03',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
</script>

<template>
  <z-descriptions
    :columns="columns"
    :detail="detail"
  />
</template>
```

:::

## 嵌套键值

对具有嵌套结构的对象或数组进行取值，仅需要配置 `prop`

:::demo

```vue
<script lang="ts" setup>
const columns = [
  { label: 'Date', prop: 'date' },
  { label: 'Name', prop: 'people[0].name' },
  { label: 'Address', prop: 'data.address' },
]
const detail = {
  date: '2016-05-03',
  name: 'Tom',
  data: {
    address: 'No. 189, Grove St, Los Angeles',
  },
  people: [{ name: 'Steven' }]
}
</script>

<template>
  <z-descriptions
    :columns="columns"
    :detail="detail"
  />
</template>
```

:::

## 尺寸、边框、布局和对齐方式

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const columns = [
  { label: 'Date', prop: 'date' },
  { label: 'Name', prop: 'name' },
  { label: 'Address', prop: 'address' },
]
const detail = {
  date: '2016-05-03',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}

const sizeOptions = [
  { label: 'large', value: 'large' },
  { label: 'default ', value: 'default' },
  { label: 'small', value: 'small' }
]

const alignOptions = [
  { label: 'left', value: 'left' },
  { label: 'center', value: 'center' },
  { label: 'right', value: 'right' }
]

const directionOptions = [
  { label: 'vertical', value: 'vertical' },
  { label: 'horizontal', value: 'horizontal' }
]

const size = ref('default')
const align = ref('center')
const labelAlign = ref('center')
const border = ref(true)
const direction = ref('horizontal')
</script>

<template>
  <div class="flex flex-col">
    <div class="mb-4 flex items-center">
      <span class="mr-4 w-20 inline-block text-right">边框</span>
      <el-switch v-model="border" />
    </div>
    <div class="mb-4 flex items-center">
      <span class="mr-4 w-20 inline-block text-right">size</span>
      <z-radio v-model="size" :options="sizeOptions" type="radio-button" />
    </div>
    <div class="mb-4 flex items-center">
      <span class="mr-4 w-20 inline-block text-right">align</span>
      <z-radio v-model="align" :options="alignOptions" type="radio-button" />
    </div>
    <div class="mb-4 flex items-center">
      <span class="mr-4 w-20 inline-block text-right">labelAlign</span>
      <z-radio v-model="labelAlign" :options="alignOptions" type="radio-button" />
    </div>
    <div class="mb-4 flex items-center">
      <span class="mr-4 w-20 inline-block text-right">direction</span>
      <z-radio v-model="direction" :options="directionOptions" type="radio-button" />
    </div>
    <z-descriptions
      :columns="columns"
      :detail="detail"
      :border="border"
      :align="align"
      :label-align="labelAlign"
      :size="size"
      :direction="direction"
    />
  </div>
</template>
```

:::

## 插槽

在`columns`项目配置`render`或`renderLabel`，或者在模板中增加带` detail-[prop] `相关的插槽即可使用

:::demo

```vue
<script lang="ts" setup>
const columns = [
  { label: 'Date', prop: 'date' },
  { label: 'Name', prop: 'name' },
  { label: 'Address', prop: 'address' },
]
const detail = {
  date: '2016-05-03',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
</script>

<template>
  <z-descriptions
    :columns="columns"
    :detail="detail"
    border
  >
    <template #title>
      <span>title</span>
    </template>
    <template #extra="{ size }">
      <el-button :size="size">
        extra
      </el-button>
    </template>
    <template #detail-name="{ item, size }">
      <el-tag :size="size">
        {{ item.name }}
      </el-tag>
    </template>
    <template #detail-name-label="{ item }">
      <span>{{ item.label }}:</span>
    </template>
  </z-descriptions>
</template>
```

:::

## z-descriptions 属性

| 属性名    | 说明                            | 类型    | 可选值                  | 默认值     |
| :-------- | :------------------------------ | :------ | :---------------------- | :--------- |
| columns    | 描述列表配置项                    | Array | —                       | —      |
| detail    | 详情数据                    | Object | —                       | —      |
| border    | 是否带有边框                    | boolean | —                       | false      |
| column    | 一行 `Descriptions Item` 的数量 | number  | —                       | 3          |
| direction | 排列的方向                      | string  | vertical / horizontal   | horizontal |
| size      | 列表的尺寸                      | string  | large / default / small | default    |
| title     | 标题文本，显示在左上方          | string  | —                       | —          |
| extra     | 操作区文本，显示在右上方        | string  | —                       | —          |

## column 配置项

| 属性名           | 说明                                                         | 类型            | 可选值                | 默认值 |
| :--------------- | :----------------------------------------------------------- | :-------------- | :-------------------- | :----- |
| prop            | 对应`detail`的字段名                                                     | string          | —                     | —      |
| label            | 标签文本                                                     | string          | —                     | —      |
| span             | 列的数量                                                     | number          | —                     | 1      |
| width            | 列的宽度，不同行相同列的宽度按最大值设定（如无 `border` ，宽度包含标签与内容） | string / number | —                     | —      |
| minWidth        | 列的最小宽度，与 `width` 的区别是 `width` 是固定的，`min-width` 会把剩余宽度按比例分配给设置了 `min-width` 的列（如无 `border`，宽度包含标签与内容） | string / number | —                     | —      |
| align            | 列的内容对齐方式（如无 `border`，对标签和内容均生效）        | string          | left / center / right | left   |
| labelAlign      | 列的标签对齐方式，若不设置该项，则使用内容的对齐方式（如无 `border`，请使用 `align` 参数） | string          | left / center / right | —      |
| className       | 列的内容自定义类名                                           | string          | —                     | —      |
| labelClassName | column label custom class name                               | string          | —                     | —      |
| render | `render`函数                              | string          | —                     | —      |
| renderLabel | `label的render`函数                            | string          | —                     | —      |
