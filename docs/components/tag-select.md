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
  <z-tag-select
    v-model="tagSelect"
    :multiple="true"
    size="small"
    :options="[
      { label: '标签一', value: 1, round: true },
      { label: '标签二', value: 2, type: 'success' },
      { label: '标签三', value: 3 },
      { label: '标签四', value: 4 },
      { label: '标签五', value: 5 },
      { label: '标签六', value: 6 },
      { label: '标签七', value: 7 },
      { label: '标签八', value: 8 },
      { label: '标签九', value: 9 },
      { label: '标签十', value: 10 },
    ]"
    title="筛选项一:"
  />
  <div>{{ tagSelect }}</div>
</template>
```
