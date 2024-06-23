<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

const isShowDialog = ref(false)

function handleConfirm(done: () => void) {
  console.log(done, 'sdf')
}

async function handleBeforeClose(done: () => void) {
  console.log('handleBeforeClose')
  await delay(200)
  done()
}

function handleOpen() {
  isShowDialog.value = true
}

function openDialog() {
  window.ZDialogTip({
    type: 'warning',
    message: '内容',
    title: '标题',
    beforeClose: (done) => {
      console.log('before close extend')
      done()
    },
    onConfirm: ({ confirmButtonLoading }) => {
      confirmButtonLoading.value = true
    },
    onCancel: ({ done }) => {
      done()
    },
  })
}

function handleClose() {
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
