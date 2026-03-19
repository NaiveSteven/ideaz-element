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
    message: 'Content message',
    title: 'Dialog Title',
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
    Click to open Dialog
  </el-button>
  <el-button link type="primary" @click="openDialog">
    Click to open Dialog
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
    <span>This is a piece of information.</span>
  </z-dialog>
</template>
