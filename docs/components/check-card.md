# CheckCard 多选卡片

常用的操作按钮。

## 基础用法

基础的按钮用法。

:::demo 使用 `type`、`plain`、`round` 和 `circle` 属性来定义 Button 的样式。

```vue
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'RadioDemo',
  setup() {
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

    return { dataSource, handleChange }
  }
})
</script>

<template>
  <div :style="{ padding: 24, backgroundColor: '#f7f8fa' }">
    <z-check-card-group :options="dataSource" :multiple="true" @change="handleChange" />
  </div>
</template>
```

:::

:::demo 使用 `type`、`plain`、`round` 和 `circle` 属性来定义 Button 的样式。

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
  <h3>只有图片时</h3>
  <ZCheckCard avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg" />

  <h3>只有图片和描述时</h3>
  <ZCheckCard
    avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
  />
  <h3>只有标题和描述时</h3>
  <ZCheckCard
    title="示例"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
  />
  <h3>只有标题和图片</h3>
  <ZCheckCard
    title="示例"
    avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
  />
  <h3>只有标题</h3>
  <ZCheckCard title="示例" />
  <h3>只有描述时</h3>
  <ZCheckCard description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。" />
</template>
```

:::
