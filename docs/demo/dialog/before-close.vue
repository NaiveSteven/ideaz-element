<script lang="ts" setup>
import { h, ref } from 'vue'
import { ZDialogTip } from '@ideaz/element'

const isShowDialog = ref(false)

const handleConfirm = (done) => {
  console.log(done, 'sdf')
}

const handleBeforeClose = async (done) => {
  console.log('handleBeforeClose')
  // await delay(200)
  // done()
}

const renderTitle = () => {
  return h('span', {}, 'title')
}

const handleOpen = () => {
  isShowDialog.value = true
}

const openDialog = () => {
  ZDialogTip({
    type: 'warning',
    message: '内容',
    title: '标题',
    beforeClose: (done) => {
      console.log('before close extend')
      done()
    },
    onConfirm: ({ done, confirmButtonLoading }) => {
      confirmButtonLoading.value = true
    },
    onCancel: ({ done, cancelButtonLoading }) => {
      done()
    },
  })
}

const handleClose = () => {
  console.log('handleClose')
}

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
</script>

<template>
  <el-button link type="primary" @click="handleOpen">
    点击打开 Dialog
  </el-button>
  <el-button link type="primary" @click="openDialog">
    点击打开 Dialog
  </el-button>
  <z-dialog
    v-model="isShowDialog"
    type="warning"
    :before-close="handleBeforeClose"
    @closed="handleClose"
    @confirm="handleConfirm"
  >
    <template #header>
      <span>slotTitle</span>
    </template>
    <span>这是一段信息</span>
  </z-dialog>
</template>
