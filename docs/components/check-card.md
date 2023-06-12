# CheckCard 多选卡片

集合多种相关联说明信息，并且可被选择的卡片。

## 基础用法

最常用的选项卡示例，包括头像，标题，描述等部分，可被选择。

:::demo

```vue
<script lang="ts" setup>
const handleClick = () => {
  console.log('clicked')
}

const handleChange = (val) => {
  console.log(val, 'change')
}
</script>

<template>
  <z-check-card
    avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
    title="示例一"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
    default-checked
    @click="handleClick"
    @change="handleChange"
  />
</template>
```

:::

## 单选模式

在多个选项存在的情况下可通过 `CheckCardGroup` 分组，默认选项卡组件为单选模式。

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const dataSource = [
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
    <z-check-card-group v-model="val" :options="dataSource" @change="handleChange" />
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

const dataSource = [
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
    <z-check-card-group v-model="val" :options="dataSource" :multiple="true" @change="handleChange" />
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

const dataSource = [
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
    <z-check-card-group v-model="val" :options="dataSource" :multiple="true" :alias="alias" />
  </div>
</template>
```

:::

## 尺寸

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
</script>

<template>
  <div class="flex flex-col">
    <z-radio v-model="size" :options="sizeOptions" class="mb-2" />
    <z-check-card
      title="Card title"
      description="This is the description"
      :size="size"
    />
  </div>
</template>
```

:::

## 自定义尺寸

当然也可以通过 `style` 或 `class` 自定义卡片大小。

:::demo

```vue
<template>
  <z-check-card
    title="Card title"
    description="This is the description"
    :style="{ width: '200px', height: '200px' }"
  />
</template>
```

:::

## 组合样式

头像，标题，描述区域可以自由组合或者单独呈现，组件会为你调整为最合适的对齐方式。

:::demo

```vue
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'RadioDemo',
  setup() {
    const handleChange = (val) => {
      console.log(val, 'handleChange')
    }

    return { handleChange }
  }
})
</script>

<template>
  <h4>只有图片时</h4>
  <ZCheckCard avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg" />

  <h4>只有图片和描述时</h4>
  <ZCheckCard
    avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
  />
  <h4>只有标题和描述时</h4>
  <ZCheckCard
    title="示例"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
  />
  <h4>只有标题和图片</h4>
  <ZCheckCard
    title="示例"
    avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
  />
  <h4>只有标题</h4>
  <ZCheckCard title="示例" />
  <h4>只有描述时</h4>
  <ZCheckCard description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。" />
</template>
```

:::

## 自定义头像

通过 `avatar` 属性自定义头像区域。

:::demo

```vue
<script lang="ts" setup>
import { resolveComponent } from 'vue'

const renderAvatar = (h) => {
  return h(resolveComponent('el-avatar'), { icon: 'i-user-filled' })
}
</script>

<template>
  <z-check-card
    title="示例标题"
    :avatar="renderAvatar"
  />
</template>
```

:::

## 自定义标题

通过 `title` 属性自定义头像区域。

:::demo

```vue
<script lang="ts" setup>
import { resolveComponent } from 'vue'

const renderTitle = (h) => {
  return h(resolveComponent('el-tag'), { }, () => 'Tag 1')
}
</script>

<template>
  <z-check-card
    :title="renderTitle"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念"
  />
  <z-check-card
    title="标题内容过长会自动进行省略，标题内容过长会自动进行省略"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念"
  />
</template>
```

:::

## 自定义描述

描述区域可通过 `description` 自定义。

:::demo

```vue
<script lang="ts" setup>
const renderDescription = (h) => {
  return h(
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
</script>

<template>
  <z-check-card
    avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
    title="默认描述区域不会进行折行"
    :description="renderDescription"
  />
</template>
```

:::

## 操作栏

配置 `extra` 为卡片添加操作栏。

:::demo

```vue
<script lang="ts" setup>
const renderExtra = (h) => {
  return h(
    'div',
    {},
    h('a', { onClick: e => e.stopPropagation() }, '查看详情')
  )
}
</script>

<template>
  <z-check-card
    avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
    title="示例一"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
    :extra="renderExtra"
  />
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
const renderCover = (h) => {
  return h('img', {
    alt: 'example',
    src: 'https://gw.alipayobjects.com/mdn/rms_66ee3f/afts/img/A*FyH5TY53zSwAAAAAAAAAAABkARQnAQ',
  })
}
</script>

<template>
  <z-check-card :cover="renderCover" />
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

const selectedCard = ref('A')
</script>

<template>
  <div>
    <h4>部分不可用</h4>
    <z-check-card
      title="Card title"
      description="This is the description"
      avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
    />
    <z-check-card
      title="Card title"
      description="This is the description"
      disabled
      avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
    />
    <z-check-card
      title="Card title"
      description="This is the description"
      disabled
      default-checked
      avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
    />
  </div>
  <div>
    <h4>整体不可用</h4>
    <z-check-card-group v-model="selectedCard" :options="options" disabled />
  </div>
</template>
```

:::

## z-check-card属性

| 属性名           | 说明                                                         | 类型                 | 默认值    |
| -------------- | ------------------------------------------------------------ | -------------------- | --------- |
| checked        | 指定当前是否选中                                             | `boolean`              | false     |
| bordered       | 是否显示边框                                                 | `boolean`              | true      |
| value          | 选项值                                                       | `string`               | -         |
| defaultChecked | 初始是否选中                                                 | `boolean`              | false     |
| disabled       | 失效状态                                                     | `boolean`              | false     |
| size           | 选择框大小，可选 `large` `small`                             | `string`               | `default` |
| loading        | 当卡片内容还在加载中时，可以用 loading 展示一个占位          | `boolean`              | false     |
| title          | 标题                                                         | `string / VNode`  | -         |
| description    | 描述                                                         | `string / VNode`            | -         |
| avatar         | 选项元素的图片地址                                           | `link / VNode`    | -         |
| extra          | 卡片右上角操作区域                                                     | `string / VNode` | -         |
| cover          | 卡片背景图片, 注意使用该选项后`title`，`description`和`avatar`失效 | `VNode`            | -         |

## z-check-card事件

| 事件名           | 说明                                                         | 回调参数                 |
| -------------- | ------------------------------------------------------------ | -------------------- |
| change        |     变化时回调函数                                         | checked              |

## z-check-card-group属性

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

## z-check-card-group Options项可配置属性

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

## z-check-card-group事件

| 事件名           | 说明                                                         | 回调参数                 |
| -------------- | ------------------------------------------------------------ | -------------------- |
| change        |     变化时回调函数                                         | 选中数据项`value`集合              |
