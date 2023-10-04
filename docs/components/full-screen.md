# FullScreen 全屏

> 全屏组件

## 基础用法

传入`options`自动生成选项

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const isFullScreen = ref(false)

const handleChange = (val) => {
  isFullScreen.value = val
}

const getElement = () => {
  return document.getElementsByClassName('my-water-mark')[0]
}
</script>

<template>
  <z-full-screen :teleported="true" :get-element="getElement" @change="handleChange">
    <el-button>点击全屏</el-button>
  </z-full-screen>
  <z-watermark content="水印组件" class="my-water-mark">
    <div class="h-500px" />
  </z-watermark>
</template>
```

:::
