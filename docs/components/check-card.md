# CheckCard 多选卡片

集合多种相关联说明信息，并且可被选择的卡片。

## 常规使用

传入`options`，配置选项卡

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = [
  {
    title: '图像分类',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'A',
  },
  {
    title: '物体检测',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'B',
  },
  {
    title: 'OCR自定义',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'C',
  },
  {
    title: 'OCR',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'D',
  },
  {
    title: '视频分类',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'E',
    bordered: false
  },
  {
    title: '关键点检测',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'F',
    disabled: true
  },
]

const handleChange = (val) => {
  console.log(val, 'handleChange')
}

const val = ref('E')
</script>

<template>
  <div :style="{ padding: 24, backgroundColor: '#f7f8fa' }">
    <z-check-card v-model="val" :options="options" :bordered="false" @change="handleChange" />
  </div>
</template>
```

:::

## 多选模式

设置`multiple`为`true`开启多选模式。

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = [
  {
    title: '图像分类',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'A',
  },
  {
    title: '物体检测',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'B',
  },
  {
    title: 'OCR自定义',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'C',
  },
]

const handleChange = (val) => {
  console.log(val, 'handleChange')
}

const val = ref(['A'])
</script>

<template>
  <div :style="{ padding: 24, backgroundColor: '#f7f8fa' }">
    <z-check-card v-model="val" :options="options" :multiple="true" @change="handleChange" />
  </div>
</template>
```

:::

## 字段路径

设置`alias`属性，即可自定义字段路径。

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = [
  {
    data: {
      label: '图像分类',
      key: 'A',
    },
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
  },
  {
    data: {
      label: '物体检测',
      key: 'B',
    },
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
  },
  {
    data: {
      label: 'OCR自定义',
      key: 'C',
    },
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
  },
]

const alias = {
  title: 'data.label',
  value: 'data.key',
}

const val = ref(['A'])
</script>

<template>
  <div :style="{ padding: 24, backgroundColor: '#f7f8fa' }">
    <z-check-card v-model="val" :options="options" :multiple="true" :alias="alias" />
  </div>
</template>
```

:::

## 尺寸

通过配置组件的`size`的属性，统一配置尺寸。也可以配置`option`的`size`，单个定制。

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const size = ref('default')

const sizeOptions = ref([
  { label: 'large', value: 'large', type: 'radio-button' },
  { label: 'default', value: 'default', type: 'radio-button' },
  { label: 'small', value: 'small', type: 'radio-button' }
])

const options = [
  {
    title: '图像分类',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'A',
  },
  {
    title: '物体检测',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'B',
  },
  {
    title: 'OCR自定义',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'C',
  },
]

const val = ref('')
</script>

<template>
  <div class="flex flex-col">
    <z-radio v-model="size" :options="sizeOptions" class="mb-2" />
    <z-check-card v-model="val" :options="options" :size="size" />
  </div>
</template>
```

:::

## 自定义尺寸

也可以通过 `style` 或 `class` 自定义卡片大小。

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = [
  {
    title: '图像分类',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'A',
    style: {
      width: '200px',
      height: '200px'
    }
  },
]

const alias = {
  title: 'data.label',
  value: 'data.key',
}

const val = ref('A')
</script>

<template>
  <div :style="{ padding: 24, backgroundColor: '#f7f8fa' }">
    <z-check-card v-model="val" :options="options" />
  </div>
</template>
```

:::

## 组合样式

头像，标题，描述区域可以自由组合或者单独呈现，组件会为你调整为最合适的对齐方式。

:::demo

```vue
<script lang="ts" setup>
import { defineComponent, ref } from 'vue'

const options = [
  {
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
    value: 'A',
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'B',
  },
  {
    title: 'OCR自定义',
    description: '这是一段关于该算法的说明',
    value: 'C',
  },
  {
    title: 'OCR自定义',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    value: 'D',
  },
  {
    title: 'OCR自定义',
    value: 'E',
  },
  {
    description: '这是一段关于该算法的说明',
    value: 'F',
  },
]

const val = ref('')
</script>

<template>
  <ZCheckCard v-model="val" :options="options" />
</template>
```

:::

## 自定义头像

`avatar` 属性传入自定义`render函数`。

:::demo

```vue
<script lang="ts" setup>
import { h, ref, resolveComponent } from 'vue'

const options = [
  {
    title: '标题',
    avatar: () => h(resolveComponent('el-avatar'), { icon: 'i-user-filled' }),
    value: 'A'
  }
]

const val = ref('')
</script>

<template>
  <z-check-card v-model="val" :options="options" />
</template>
```

:::

## 自定义标题

`title` 属性传入自定义`render函数`。

:::demo

```vue
<script lang="ts" setup>
import { h, ref, resolveComponent } from 'vue'

const options = [
  {
    title: () => h(resolveComponent('el-tag'), { }, () => 'Tag 1'),
    description: '选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念',
    value: 'A'
  },
  {
    title: '标题内容过长会自动进行省略，标题内容过长会自动进行省略',
    description: '选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念',
    value: 'B'
  }
]

const val = ref('')
</script>

<template>
  <z-check-card v-model="val" :options="options" />
</template>
```

:::

## 自定义描述

描述区域可通过 `description` 自定义。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const options = [
  {
    title: '默认描述区域不会进行折行',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
    value: 'A',
    description: () => h(
      'div',
      {},
      h(
        'span',
        {},
        '选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。',
        h('a', { onClick: e => e.stopPropagation() }, '查看详情')
      )
    )
  }
]

const val = ref('')
</script>

<template>
  <z-check-card v-model="val" :options="options" />
</template>
```

:::

## 操作栏

配置 `extra` 为卡片添加操作栏。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const options = [
  {
    title: '示例',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
    description: '选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。',
    value: 'A',
    extra: () => h(
      'div',
      {},
      h('a', { onClick: e => console.log('查看详情') }, '查看详情')
    )
  }
]

const val = ref('')
</script>

<template>
  <z-check-card v-model="val" :options="options" />
</template>
```

:::

## 组件 Loading

通过配置 loading 属性为 true 来配置内容在加载中。

:::demo

```vue
<template>
  <z-check-card loading />
</template>
```

:::

## 纯图片选项

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const options = [
  {
    value: '1',
    cover: () => h('img', {
      alt: 'example',
      src: 'https://gw.alipayobjects.com/mdn/rms_66ee3f/afts/img/A*FyH5TY53zSwAAAAAAAAAAABkARQnAQ',
    })
  }
]

const val = ref('')
</script>

<template>
  <z-check-card v-model="val" :options="options" />
</template>
```

:::

## 选项不可用

通过配置 `disabled` 属性配置选项不可用。
:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  {
    title: 'Card A',
    description: '选项一',
    value: 'A'
  },
  {
    title: 'Card B',
    description: '选项二',
    value: 'B'
  }
])

const dataSource = [
  {
    title: '图像分类',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    disabled: true,
    value: 'A',
  },
  {
    title: '物体检测',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'B',
  },
  {
    title: 'OCR自定义',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'C',
  },
]

const selectedCard = ref('A')
const val = ref('')
</script>

<template>
  <div>
    <h4>部分不可用</h4>
    <z-check-card v-model="val" :options="dataSource" />
  </div>
  <div>
    <h4>整体不可用</h4>
    <z-check-card v-model="selectedCard" :options="options" disabled />
  </div>
</template>
```

:::

## z-check-card属性

| 属性名         | 说明                                                  | 类型                                                         | 默认值    |
| ------------ | ----------------------------------------------------- | ------------------------------------------------------------ | --------- |
| modelValue | 双向绑定                                        | `string / string[]`                                           | -         |
| alias | 键值对配置                                   | `object` | `{ label: 'label', value: 'value', disabled: 'disabled' }`       |
| multiple     | 多选                                                  | `boolean`                                                      | false     |
| bordered     | 是否显示边框                                          | `boolean`                                                      | true      |
| disabled     | 整组失效                                              | `boolean`                                                      | false     |
| loading      | 当卡片组内容还在加载中时，可以用 loading 展示一个占位 | `boolean`                                                      | false     |
| options      | 指定可选项                                            | `array` | []        |
| size         | 选择框大小，可选 `large` `small` `default`                      | `string`                                                       | `default` |
| onChange     | 变化时回调函数                                        | `Function(checkedValue)`                                       | -         |

## z-check-card Options项可配置属性

| 属性名           | 说明                                                         | 类型                 | 默认值    |
| -------------- | ------------------------------------------------------------ | -------------------- | --------- |
| title          | 标题                                                         | `string / VNode`  | -         |
| value          | 选项值                                                       | `string`               | -         |
| bordered       | 是否显示边框                                                 | `boolean`              | true      |
| disabled       | 失效状态                                                     | `boolean`              | false     |
| size           | 选择框大小，可选 `large` `small`                             | `string`               | `default` |
| description    | 描述                                                         | `string / VNode`            | -         |
| avatar         | 选项元素的图片地址                                           | `link / VNode`    | -         |
| extra          | 卡片右上角操作区域                                                     | `string / VNode` | -         |
| cover          | 卡片背景图片, 注意使用该选项后`title`，`description`和`avatar`失效 | `VNode`            | -         |

## z-check-card事件

| 事件名           | 说明                                                         | 回调参数                 |
| -------------- | ------------------------------------------------------------ | -------------------- |
| change        |     变化时回调函数                                         | checked              |
