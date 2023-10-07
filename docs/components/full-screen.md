# FullScreen 全屏

全屏组件

:::tip
当元素没有预期显示时，请注意`z-index`。
:::

## 基础用法

:::warning
我们需要设置背景颜色，否则会有大片漆黑。
:::

传入`el`属性，值为`HTMLElement`或函数类型，表示需要全屏的元素，默认为`body`。

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const getElement = () => {
  return document.getElementsByClassName('my-water-mark')[0]
}
</script>

<template>
  <z-full-screen :el="getElement">
    <el-button>点击全屏</el-button>
  </z-full-screen>
  <z-watermark content="水印组件" class="my-water-mark bg-white">
    <div class="h-500px" />
  </z-watermark>
</template>
```

:::

## 插槽

可以使用`enter`和`exit`插槽定制进入和退出时的出入口

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const isFullScreen = ref(false)

const handleChange = (val) => {
  isFullScreen.value = val
}

const getElement = () => {
  return document.getElementsByClassName('my-water-mark')[1]
}
</script>

<template>
  <div class="my-water-mark bg-white">
    <z-full-screen :el="getElement" @change="handleChange">
      <template #enter>
        <el-button class="z-100">
          点击全屏
        </el-button>
      </template>
      <template #exit>
        <el-button>
          退出全屏
        </el-button>
      </template>
    </z-full-screen>
    <z-watermark content="水印组件">
      <div class="h-500px" />
    </z-watermark>
  </div>
</template>
```

:::

## z-full-screen属性

| 属性名                  | 说明                                                         | 类型                   | 默认  |
| :---------------------- | :----------------------------------------------------------- | :--------------------- | :---- |
| el                   | 需要全屏的元素 | `HTMLElement` / `() => HTMLElement`               | 'body'    |
| renderEnter                   | 自定义入口 | `() => VNode`               | ''    |
| renderExit                   | 自定义出口 | `() => VNode`               | ''    |

## z-full-screen插槽

| 插槽名           | 说明                                                   |
| :--------------- | :----------------------------------------------------- |
| —                | FullScreen 的内容                                          |
| enter           | 入口 |
| exit           | 出口                                |

## z-full-screen事件

| 事件名           | 说明                               | Type       |
| :--------------- | :--------------------------------- | :--------- |
| change             | 进入和退出时的回调                  | `(isFullScreen: boolean) => void` |
