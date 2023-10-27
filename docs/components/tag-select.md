# TagSelect 标签选择

对标签进行筛选，适用于列表页

## 基础用法

传入`options`自动生成选项

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const tagSelect = ref(1)
const options = [
  { label: '标签一', value: 1, },
  { label: '标签二', value: 2 },
  { label: '标签三', value: 3 },
  { label: '标签四', value: 4 }
]
</script>

<template>
  <z-tag-select
    v-model="tagSelect"
    :options="options"
  />
</template>
```

:::

## 标题

传入`title`可配置标题，支持字符串、带`Slot`的字符串插槽和`render函数`

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const tagSelect = ref(1)
const options = [
  { label: '标签一', value: 1 },
  { label: '标签二', value: 2 },
  { label: '标签三', value: 3 },
  { label: '标签四', value: 4 }
]
</script>

<template>
  <z-tag-select
    v-model="tagSelect"
    :options="options"
    title="筛选项："
  />
</template>
```

:::

## 多选

`multiple`设置为`true`，即可实现多选功能
默认添加`全部`标签，`all`设置为`false`可关闭（多选模式下才有全部标签）

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const tagSelect = ref([1])
const allTagSelect = ref([1])
const options = [
  { label: '标签一', value: 1 },
  { label: '标签二', value: 2 },
  { label: '标签三', value: 3 },
  { label: '标签四', value: 4 }
]
</script>

<template>
  <z-tag-select
    v-model="tagSelect"
    :multiple="true"
    :options="options"
    title="筛选项一:"
  />
  <z-tag-select
    v-model="allTagSelect"
    :multiple="true"
    :all="false"
    :options="options"
    title="筛选项二:"
  />
</template>
```

:::

## 展开收起

标签宽度超过父级宽度时，会自动折叠，点击`展开`可展开全部标签

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const tagSelect = ref(1)
const options = [
  { label: '标签一', value: 1 },
  { label: '标签二', value: 2 },
  { label: '标签三', value: 3 },
  { label: '标签四', value: 4 },
  { label: '标签五', value: 5 },
  { label: '标签六', value: 6 },
  { label: '标签七', value: 7 },
  { label: '标签八', value: 8 },
  { label: '标签九', value: 9 },
  { label: '标签十', value: 10 },
  { label: '标签十一', value: 11 },
  { label: '标签十二', value: 12 },
  { label: '标签十三', value: 13 },
  { label: '标签十四', value: 14 },
  { label: '标签十五', value: 15 },
  { label: '标签十六', value: 16 },
  { label: '标签十七', value: 17 },
  { label: '标签十八', value: 17 },
  { label: '标签十九', value: 19 },
  { label: '标签二十', value: 20 },
  { label: '标签二十一', value: 21 },
  { label: '标签二十二', value: 22 },
  { label: '标签二十三', value: 23 },
  { label: '标签二十四', value: 24 },
]
</script>

<template>
  <z-tag-select
    v-model="tagSelect"
    :options="options"
    title="筛选项:"
  />
</template>
```

:::

## 事件

`option`中配置`onClick`和`onClose`可监听标签点击和关闭事件

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const tagSelect = ref([1])
const options = [
  {
    label: '标签一',
    value: 1,
    onClick: (option) => { console.log(option, 'click') },
    closable: true,
    onClose: (option) => { console.log(option, 'close') }
  },
  { label: '标签二', value: 2 },
  { label: '标签三', value: 3 },
  { label: '标签四', value: 4 }
]

const handleChange = (val) => {
  console.log(val, 'change')
}
</script>

<template>
  <z-tag-select
    v-model="tagSelect"
    :options="options"
    :multiple="true"
    @change="handleChange"
  />
</template>
```

:::

## 标签组

`options`项中配置`children`，即可生成标签组
`modelValue`传入对象，`option`配置项中的`field`字段为对象的`key`

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'
const tagSelect = ref({
  aaa: [1],
  bbb: [2]
})

const options = ref([
  {
    title: () => h('span', '标签名：'),
    field: 'aaa',
    children: [
      { label: '标签一', value: 1 },
      { label: '标签二', value: 2 },
      { label: '标签三', value: 3, },
      { label: '标签四', value: 4 },
    ]
  },
  {
    title: 'titleSlot',
    field: 'bbb',
    children: [
      { label: '标', value: 1 },
      { label: '苏州', value: 2 },
      { label: '无锡', value: 3 },
      { label: '连云港', value: 4 },
    ]
  }
])
</script>

<template>
  <z-tag-select
    v-model="tagSelect"
    :options="options"
    :multiple="true"
  >
    <template #titleSlot>
      <span>城市名：</span>
    </template>
  </z-tag-select>
</template>
```

:::

## 字段路径

`option`配置项中的`field`字段可以配置为字段路径

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const tagSelect = ref({
  aaa: {
    aaa: [1]
  },
  bbb: [2]
})

const alias = {
  label: 'title',
  value: 'data.key'
}

const options = ref([
  {
    title: '标签名：',
    field: 'aaa.aaa',
    children: [
      { title: '标签一', data: { key: 1 } },
      { title: '标签二', data: { key: 2 } },
      { title: '标签三', data: { key: 3 } },
      { title: '标签四', data: { key: 4 } },
    ]
  },
  {
    title: '城市名：',
    field: 'bbb',
    children: [
      { title: '标', data: { key: 1 } },
      { title: '苏州', data: { key: 2 } },
      { title: '无锡', data: { key: 3 } },
      { title: '连云港', data: { key: 4 } },
    ]
  }
])
</script>

<template>
  <z-tag-select
    v-model="tagSelect"
    :options="options"
    :multiple="true"
    :alias="alias"
  />
</template>
```

:::

## 标题宽度

传入`titleWidth`，即可配置标题宽度

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const tagSelect = ref({
  aaa: [1],
  bbb: [2]
})

const options = ref([
  {
    title: '标签名标签名：',
    field: 'aaa',
    children: [
      { label: '标签一', value: 1 },
      { label: '标签二', value: 2 },
      { label: '标签三', value: 3, },
      { label: '标签四', value: 4 },
    ]
  },
  {
    title: '城市名：',
    field: 'bbb',
    children: [
      { label: '标', value: 1 },
      { label: '苏州', value: 2 },
      { label: '无锡', value: 3 },
      { label: '连云港', value: 4 },
    ]
  }
])
</script>

<template>
  <z-tag-select
    v-model="tagSelect"
    :options="options"
    :multiple="true"
    title-width="115px"
  />
</template>
```

:::

## 标签样式

可以传入`type`、`round`、`effect`等属性，设置标签样式

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const tagSelect = ref({
  aaa: [1],
  bbb: [2]
})

const options = ref([
  {
    title: '标签名：',
    field: 'aaa',
    children: [
      { label: '标签一', value: 1, round: true },
      { label: '标签二', value: 2, type: 'success' },
      { label: '标签三', value: 3, effect: 'light' },
      { label: '标签四', value: 4, effect: 'plain' },
    ]
  },
  {
    title: '城市名：',
    field: 'bbb',
    children: [
      { label: '标', value: 1, round: true },
      { label: '苏州', value: 2, type: 'success' },
      { label: '无锡', value: 3, effect: 'light' },
      { label: '连云港', value: 4, effect: 'plain' },
    ]
  }
])
</script>

<template>
  <z-tag-select
    v-model="tagSelect"
    :options="options"
    :multiple="true"
  />
</template>
```

:::

## z-tag-select 属性

| 属性名              | 说明             | 类型      | 默认  |
| :------------------ | :--------------- | :-------- | :---- |
| modelValue            | 选中项绑定值       | `array` / `string` / `number` | — |
| options            | 可配置项       | `array` | — |
| alias              | 字段路径自定义      | `object`    | `{ label: 'label', value: 'value' }` |
| multiple | 多选 | `boolean` | false |
| all                 | 全部标签（多选模式下才生效）   | `boolean` | true |
| titleWidth               | 标题宽度           | `string` / `number`  |  —    |
| size                | Tag 的尺寸       | `enum`    |  —    |

## z-tag-select 事件

| 事件名         | 说明                                     | 回调参数                           |
| :------------- | :--------------------------------------- | :--------------------------------- |
| change         | 选中值发生变化时触发                     | val，目前的选中值                  |

## z-tag-select Option 项可配置属性

| 属性名              | 说明             | 类型      | 默认  |
| :------------------ | :--------------- | :-------- | :---- |
| title              | 标题      | `string`    | — |
| field                | 绑定数据字段名       | `string`    | —    |
| children            | 可配置项       | `array` | — |
| multiple | 多选 | `boolean` | false |
| all                 | 全部标签（多选模式下才生效）   | `boolean` | true |
| titleWidth               | 标题宽度           | `string` / `number`  |  —    |
| size                | Tag 的尺寸       | `enum`    |  —    |

## z-tag-select children 项可配置属性

| 属性名              | 说明             | 类型      | 默认  |
| :------------------ | :--------------- | :-------- | :---- |
| label                | 标签内容       | `string`    | ''    |
| value                | 标签绑定值       | `string` / `value`    | ''    |
| closable            | 是否可关闭       | `boolean` | false |
| type                | Tag 的类型       | `enum`    | ''    |
| closable            | 是否可关闭       | `boolean` | false |
| disable-transitions | 是否禁用渐变动画 | `boolean` | false |
| hit                 | 是否有边框描边   | `boolean` | false |
| color               | 背景色           | `string`  | ''    |
| size                | Tag 的尺寸       | `enum`    | ''    |
| effect              | Tag 的主题       | `enum`    | light |
| round               | Tag 是否为圆形   | `boolean` | false |
| onClick               | Tag 点击事件   | `(option) => void` | — |
| onClose               | Tag 关闭事件   | `(option) => void` | — |
