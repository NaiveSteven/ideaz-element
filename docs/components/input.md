# Input 输入框

常用的操作按钮。

## 基础用法

基础的按钮用法。

:::demo 使用 `type`、`plain`、`round` 和 `circle` 属性来定义 Button 的样式。

```vue
<script lang="ts" setup>
  import {ref} from 'vue'

  const val = ref('')
</script>

<template>
  <z-input v-model="val" prepend="asdf"  />
</template>
```
