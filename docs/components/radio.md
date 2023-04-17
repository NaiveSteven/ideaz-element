# Radio 单选框

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
    const radio = ref(1)

    return { radio }
  }
})
</script>

<template>
  <z-radio v-model="radio" :options="[{label: '1',value: 1},{label: '2',value: 2}]" />
</template>
```
