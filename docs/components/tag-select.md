# TagSelect 标签选择

常用的操作按钮。

## 基础用法

基础的按钮用法。

:::demo 使用 `type`、`plain`、`round` 和 `circle` 属性来定义 Button 的样式。

```vue
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TagSelectDemo',
  setup() {
    const tagSelect = ref([1])

    return { tagSelect }
  }
})
</script>

<template>
  <z-tag-select v-model="tagSelect" :multiple="true" size="small" :options="[{ label: '标签一', value: 1 }, { label: '标签二', value: 2 }]" title="筛选项一:" />
  <div>{{ tagSelect }}</div>
</template>
```
