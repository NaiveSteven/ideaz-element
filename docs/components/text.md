# Text 文本

常用的操作按钮。

## 基础用法

基础的按钮用法。

:::demo 使用 `type`、`plain`、`round` 和 `circle` 属性来定义 Button 的样式。

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const a = ref('asdf')
</script>

<template>
  <z-text class="mx-1" type="primary">
    asdfsf
  </z-text>
</template>

<style>
.mx-1 {
  margin-left: 4px;
  margin-right: 4px;
}
</style>
```
