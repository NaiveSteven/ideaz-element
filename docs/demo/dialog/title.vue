<script lang="ts" setup>
import { h, ref } from 'vue'

const isShowDialog = ref(false)
const isShowRenderDialog = ref(false)

function renderTitle() {
  return h('span', 'Render title')
}

function handleClick() {
  window.ZDialogTip({
    type: 'danger',
    message: () => h('span', {}, 'custom message'),
    title: () => h('span', {}, 'custom title'),
    onConfirm: ({ done, confirmButtonLoading }) => {
      confirmButtonLoading.value = true
      done()
    },
    onCancel: ({ done, cancelButtonLoading }) => {
      cancelButtonLoading.value = true
      done()
      cancelButtonLoading.value = false
    },
  })
}
</script>

<template>
  <el-button link type="primary" @click="isShowDialog = true">
    Click to open slot dialog
  </el-button>
  <el-button link type="primary" @click="isShowRenderDialog = true">
    Click to open render dialog
  </el-button>
  <el-button link type="primary" @click="handleClick">
    Click to open render dialog
  </el-button>
  <z-dialog
    v-model="isShowDialog"
    @confirm="isShowDialog = false"
  >
    <template #title>
      Slot title
    </template>
    <span>This is a piece of information.</span>
  </z-dialog>
  <z-dialog
    v-model="isShowRenderDialog"
    :title="renderTitle"
    @confirm="isShowRenderDialog = false"
  >
    <span>This is a piece of information.</span>
  </z-dialog>
</template>
