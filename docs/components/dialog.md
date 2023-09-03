# Dialog 弹窗

常用的操作按钮。

## 基础用法

基础的按钮用法。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const isShowDialog = ref(false)

const handleConfirm = (done) => {
  // this.$message.success('成功')
  // isShowDialog.value = false
  console.log(done, 'sdf')
}
const handleBeforeClose = () => {

}

const renderTitle = () => {
  return h('span', {}, 'title')
}
</script>

<template>
  <el-button link @click="isShowDialog = true">
    点击打开 Dialog
  </el-button>
  <z-dialog
    v-model="isShowDialog"
    :close-on-click-modal="true"
    @confirm="handleConfirm"
  >
    <template #header>
      <span>slotTitle</span>
    </template>
    <span>这是一段信息</span>
  </z-dialog>
</template>
```
