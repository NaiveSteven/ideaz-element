# Dialog 弹窗

常用的操作按钮。

## 基础用法

基础的按钮用法。

:::demo

```vue
<script lang="ts" setup>
import { getCurrentInstance, h, ref } from 'vue'

const isShowDialog = ref(false)
const a = getCurrentInstance()

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

const handleOpen = () => {
  // isShowDialog.value = true
  // window.ZDialogTip.warning('sdf', 'title', {
  //   onConfirm: ({ done, confirmBtnLoading }) => {
  //     // done()
  //     confirmBtnLoading.value = true
  //     // console.log(ctx, 'extend onConfirm')
  //   },
  //   onCancel: ({ done, cancelBtnLoading }) => {
  //     cancelBtnLoading.value = true
  //     console.log('cancel onCancel')
  //   }
  // })
  window.ZDialogTip({
    type: 'warning',
    message: () => h('span', {}, 'message renderasdfsf'),
    // title: '标题',
    onConfirm: ({ done, confirmBtnLoading }) => {
      confirmBtnLoading.value = true
    },
    onCancel: ({ done, cancelBtnLoading }) => {
      done()
    }
  })
  // window.ZDialogTip.close()
}

const handleClose = () => {
  console.log('closeff')
}
</script>

<template>
  <el-button link @click="handleOpen">
    点击打开 Dialog
  </el-button>
  <z-dialog
    v-model="isShowDialog"
    type="warning"
    @closed="handleClose"
    @confirm="handleConfirm"
  >
    <template #header>
      <span>slotTitle</span>
    </template>
    <span>这是一段信息</span>
  </z-dialog>
</template>
```
